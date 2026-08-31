import { Response } from "express";
import { AuthRequest } from "../middlewares/auth.js";
import { Restaurant } from "../models/Restaurant.js";
import { Booking } from "../models/Bookings.js";

// Create a new booking
// post /api/bookings
// @access private
export const createBooking = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const { restaurantId, date, time, guests, occasion, specialRequests } =
      req.body;

    if (!restaurantId || !date || !time || !guests) {
      res
        .status(400)
        .json({ message: "please provide all required reservation details!" });
      return;
    }

    // check if restaurant Exists or not
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      res.status(404).json({ message: "restaurant not found!" });
      return;
    }

    // verify restaurant is approved
    if (restaurant.status != "approved") {
      res
        .status(400)
        .json({
          message: "reservations are not open for this restaurant yet!",
        });
      return;
    }

    // if restaurant approved then check for seat Availability
    const requestedGuests = Number(guests);

    const ExistingBookings = await Booking.find({
      restaurant: restaurantId,
      date: new Date(date),
      time,
      status: "confirmed",
    });

    const bookedSeats = ExistingBookings.reduce((sum, b) => sum + b.guests, 0);

    const totalSeats = restaurant.totalSeats || 20;

    const availableSeats = totalSeats - bookedSeats;

    if (requestedGuests > availableSeats) {
      res.status(400).json({
        message: `unable to reserve. only ${availableSeats} seats are available for this time slot!`,
      });
    }

    const booking = await Booking.create({
      user: req.user?._id,
      restaurant: restaurantId,
      date: new Date(date),
      time,
      guests: Number(guests),
      occasion,
      specialRequests,
      status: "confirmed",
    });

    // populate restaurant info before returning
    const populatedBooking = await booking.populate(
      "restaurant",
      "name location image address",
    );
    res.status(201).json(populatedBooking);
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

// Get logged in user bookings
// GET /api/bookings/my
// @access private
export const getMyBookings = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const bookings = await Booking.find({ user: req.user?._id }).populate(
      "restaurant",
      "name location image address slug",
    ).sort({date: -1, time: -1});
    res.json(bookings);

  } catch (error: any) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

// Cancel a booking
// PUT /api/bookings/:id/cancel
// @access private
export const cancelBooking = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {

    const booking = await Booking.findById(req.params.id);

    if(!booking){
        res.status(404).json({message: "Booking not found!"});
        return;
    }

    // verify user owns the booking
    if(booking.user.toString() !== req.user?._id.toString()){
        res.status(401).json({message: "Not Authorized to cancel the booking!"})
        return;
    }

    booking.status = "cancelled";
    await booking.save();

    // booking has been cancelled so we need to update the restaurant data
    // such that this restaurant is available
    const populatedBooking = await booking.populate("restaurant", "name location image address");
    res.json(populatedBooking);
    
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

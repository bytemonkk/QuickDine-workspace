import { Router } from "express";
import { getFeaturedRestaurants, getRestaurantAvailability, getRestaurantBySlug, getRestaurants } from "../controllers/restaurantController.js";

const restaurantRouter = Router();

//router.get(path,controller)
restaurantRouter.get("/", getRestaurants);
restaurantRouter.get("/featured", getFeaturedRestaurants);
restaurantRouter.get("/:slug", getRestaurantBySlug);
restaurantRouter.get("/:id/availability", getRestaurantAvailability);

export default restaurantRouter;

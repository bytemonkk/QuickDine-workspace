# QuickDine

QuickDine is a full-stack restaurant discovery and table reservation platform built using the MERN stack. It connects diners, restaurant owners, and administrators through a centralized platform for restaurant discovery, reservations, restaurant management, and booking administration.

## Overview

QuickDine provides a complete restaurant booking ecosystem with role-based access for users, restaurant owners, and administrators.

Users can discover restaurants, search and filter listings, check table availability, and make reservations. Restaurant owners can register and manage their restaurants, upload restaurant images, manage availability, and handle customer bookings. Administrators can review restaurants and manage the overall platform.

## Features

### User

- User registration and authentication
- JWT-based authentication
- Secure password hashing using bcrypt
- Restaurant discovery
- Restaurant search
- Search by restaurant name, tags, and location
- Filter by price range
- Filter by rating
- Restaurant sorting
- Featured and exclusive restaurant listings
- Restaurant details
- Real-time table availability calculation
- Table reservations
- Guest count selection
- Occasion and special request support
- Booking management
- Booking cancellation
- User profile management

### Restaurant Owner

- Owner authentication
- Restaurant registration
- Restaurant profile management
- Restaurant image upload
- Cloudinary image storage
- Restaurant approval workflow
- Restaurant information updates
- Available time-slot management
- Restaurant seating capacity management
- Customer booking management
- Booking confirmation
- Booking cancellation
- Booking completion

### Administrator

- Administrator authentication
- Restaurant management
- Restaurant approval
- Restaurant rejection and management
- User management
- Owner management
- Booking management
- Platform administration

## Technology Stack

### Frontend

- React
- TypeScript
- Vite
- React Router
- Axios
- Tailwind CSS
- React Hot Toast

### Backend

- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- bcrypt
- Multer

### External Services

- MongoDB Atlas
- Cloudinary

## System Architecture

```text
                    QuickDine
                        |
          +-------------+-------------+
          |             |             |
        User          Owner         Admin
          |             |             |
          +-------------+-------------+
                        |
                 React Frontend
                        |
                      Axios
                        |
                 Express REST API
                        |
          +-------------+-------------+
          |             |             |
     Authentication  MongoDB       Cloudinary
        JWT          Database      Image Storage

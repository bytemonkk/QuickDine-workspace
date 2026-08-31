import { Router } from "express";
import { getMe, loginUser, registerUser } from "../controllers/authController.js";
import { protect } from "../middlewares/auth.js";

const authRouter = Router();

//register Endpoint
//route to controllers/authController.js if user tries to open register page..!
authRouter.post("/register", registerUser);


//login Endpoint
//route to controllers/authController.js if user tries to open login page..!
authRouter.post("/login", loginUser);


//getMe Endpoint
//route to controllers/authController.js if user tries to open getMe page..!
authRouter.get("/me",protect, getMe);

export default authRouter;
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import bcrypt from "bcrypt";
import { AuthRequest } from "../middlewares/auth.js";

// Helper to generate JWT token
const generateToken = (id: string) => {
    return jwt.sign({id}, process.env.JWT_SECRET!, {expiresIn: "30d"})
}

// Register a new user
// post /api/auth/register

export const registerUser = async (req: Request,res: Response): Promise<void> => {
    try {
        // new user
        const {name, email, password, phone, role} = req.body; //user input
        if(!name || !email || !password) {
            res.status(400).json({message: "please Enter All required Fields!"});
            return;
        }

        // check if user Exists
        const userExists = await User.findOne({email});
        if(userExists) {
            res.status(400).json({message: "user Already Exists"});
            return;
        }

        // hash password -primary thing dobby..! give someone can hack our DB
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user i mean Add user to database..!
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            phone,
            role,
        })

        // Add user
        if(user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role,
                token: generateToken(user._id.toString())
            })
        }else {
            res.status(400).json({message: "Invalid user data!"})
        }

    } catch (error: any) {
        console.error("Error", error);
        res.status(400).json({message: error.message});
        
    }

}

// Authenticate a user & get token
// post /api/auth/login

export const loginUser = async (req: Request,res: Response): Promise<void> => {
    try {
        
        const {email, password} = req.body; //user input
        if(!email || !password) {
            res.status(400).json({message: "please provide email and password!"});
            return;
        }

        // check for user
        const user = await User.findOne({email});
        if(!user) {
            res.status(401).json({message: "Invalid username or password!"});
            return;
        }

        // if user Available then check credentials dobby..!
        // check if password matches
        const isMatch = await bcrypt.compare(password, user.password || "");
        if(!isMatch) {
            res.status(401).json({message: "Invalid username or password!"});
            return;
        }

        res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role,
                token: generateToken(user._id.toString())
            })

        
    } catch (error: any) {
        console.error("Error", error);
        res.status(400).json({message: error.message});
    }
    
}


// Get user profile
// GET /api/auth/me
// @access private

export const getMe = async (req: AuthRequest,res: Response): Promise<void> => {
    try {
        if(!req.user){
            res.status(401).json({message: "Not Authorized!"});
            return;
        }
        res.json(req.user);
        
    } catch (error: any) {
        console.error(error);
        res.status(400).json({message: error.message});
    }

}
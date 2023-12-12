import { Request, Response } from 'express';
import User from '../models/user.model';
import ApiResponse from '../utils/response/ApiResponse';


export const signUp = async (req: Request, res: Response) => {
    const { username, email, password } = req.body;
    try {
        const user = new User({
            username,
            email,
            password
        });
        await user.save()
        const token = user.generateToken();
        res.status(201).json(new ApiResponse(true, "user created successfully", { user, token }));
    } catch (error: any) {
        res.status(400).json(new ApiResponse(false, error.message, null));
    }


};


export const signin = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await User.findByCredentials(email, password);
        const token = await user.generateToken();
        res.status(200).json(new ApiResponse(true, "successfully signin", { user, token }));
    } catch (error: any) {
        res.status(401).json({ message: error.message });
    }
};


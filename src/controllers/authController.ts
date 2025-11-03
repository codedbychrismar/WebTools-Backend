import { Request, Response } from "express";
import { signUpServices, signInServices, refreshAccessTokenService, signOutService } from "../services/authService";

export const authController = {
    signup: async (req: Request, res: Response) => {
        const { username, password } = req.body;

        try{
            const newUser = await signUpServices(username, password);
            res.status(201).json({
                success: true,
                message: "User signed up successfully.",
                data: newUser,
            });
        }catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: "Failed to sign up." });
        }
    },

    signin: async (req: Request, res: Response) => {
        const { username, password } = req.body;

        try{
            const { accessToken, refreshToken, user } = await signInServices(username, password);
    
            res.cookie("refresh_token", refreshToken, {
            httpOnly: true,
            secure: true, // set true in production
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            });

            res.json({ accessToken, user: { id: user.user_id, username: user.username } });
        }catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: "Failed to sign in." });
        }
    },
     
    refreshToken: async (req: Request, res: Response) => {
        const token = req.cookies.refresh_token;
        if (!token) return res.status(401).json({ message: "Missing refresh token" });

        try {
            const { accessToken, refreshToken } = await refreshAccessTokenService(token);

            // Rotate cookie
            res.cookie("refresh_token", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
            });

            res.json({ accessToken });
        } catch (err) {
            res.status(401).json({ message: (err as Error).message });
        }
    },

    signout: async (req: Request, res: Response) => {
        const token = req.cookies.refresh_token;
        if (!token) return res.status(400).json({ message: "No refresh token found" });

        await signOutService(token);
        res.clearCookie("refresh_token");
        res.json({ message: "Logged out successfully" });
    }
}
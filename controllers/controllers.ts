
import {Otps} from '../models/model';
import {sendEmail} from '../utils/sendEmails';
import randomstring from 'randomstring';
import { Request, Response, NextFunction } from 'express'

// Generate OTP
function generateOTP() {
    return randomstring.generate({
        length: 6,
        charset: 'numeric'
    });
}

// Send OTP to the provided email
export const sendOTP = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // console.log(req.body);
        const { email } = req.body;
        // console.log(email);
        const otp = generateOTP();
        // console.log(otp);
        const newOTP = new Otps({ email, otp });
        await newOTP.save();

        // Send OTP via email
        await sendEmail({
            to: email,
            subject: 'Your OTP from Kushal"s System',
            message: `<p>Your OTP is: <strong>${otp}</strong></p>`,
        });

        res.status(200).json({ success: true, message: 'OTP sent successfully' });
    } catch (error) {
        console.error('Error sending OTP:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
};

export const verifyOTP = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, otp } = req.body;
        const existingOTP = await Otps.findOneAndDelete({ email, otp });
        // console.log(existingOTP);
        if (existingOTP) {
            // OTP is valid
            res.status(200).json({ success: true, message: 'OTP verification successful' });
        } else {
            // OTP is invalid
            res.status(400).json({ success: false, error: 'Invalid OTP' });
        }
    } catch (error) {
        console.error('Error verifying OTP:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
};


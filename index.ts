import express, { Application, Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from 'mongoose';
import otpRoutes from './routes/routes';
import dotenv from "dotenv";

dotenv.config();

const app: Application = express();
const PORT: number | string = process.env.PORT || 3000;

mongoose
    .connect(
        `mongodb+srv://kushal:kushal123@backenddb.yac2nn2.mongodb.net/Email_OTP`,
       
    )
    .then(() => {
        console.log("Connected to database!");
    })
    .catch((error) => {
        console.error("Connection failed!", error); // Log the error for better debugging
    });

app.use(
    cors({
        origin: "*",
    })
);
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(express.json());

app.use('/api', otpRoutes);

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

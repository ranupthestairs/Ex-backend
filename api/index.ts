import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { app } from '../src/config/express';

dotenv.config();
const port = process.env.PORT || '3000';
const mongooseURL = process.env.MONGODB_URL;

mongoose
    .connect(mongooseURL)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(port, () => {
            console.log(`Listening to ${port}`);
        });
    })
    .catch((err) => console.log('MongoDB error : ', err));

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import { routes } from '../routes';

const allowedOrigins = ['http://localhost:3000', 'https://app.tahreef.com'];

const corsOptions = {
    origin: (origin, callback) => {
        console.log('debug origin', origin)
        // Allow requests with no origin, like mobile apps or CURL requests
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
};

const app = express();
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan('tiny'));
app.use('/', routes);
app.disable('x-powered-by');

export { app };

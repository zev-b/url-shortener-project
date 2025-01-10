import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import urlRoutes from './routes/urls.js';
import rateLimit from 'express-rate-limit';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
// const BASE_URL = process.env.BASE_URL || `http://localhost:${PORT}`;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Apply rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests, please try again later.',
});

app.use(limiter);

app.use('/', urlRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

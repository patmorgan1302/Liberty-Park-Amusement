import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
const port = process.env.PORT || 5000;

connectDB(); 

const app = express();

// Body Parser Middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie Parser Middleware
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('Api is running...');
});

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes)

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running on Port ${port}`);
});





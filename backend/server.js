import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import taskRoutes from './routes/taskRoutes.js';

dotenv.config();

const app = express();

// --- Serverless-safe MongoDB connection ---
let isConnected = false;
const connectDB = async () => {
    if (isConnected) return;
    await mongoose.connect(process.env.MONGODB_URI);
    isConnected = true;
};

// CORS config - dynamically accept all origins (needed for credentials: true)
const corsOptions = {
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        // or reflect the exact origin of the incoming request
        callback(null, true);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

// Handle preflight OPTIONS requests explicitly (required for Vercel serverless)
app.options('*', cors(corsOptions));
app.use(cors(corsOptions));
app.use(express.json());

// Connect to DB before every request (cached — only connects once)
app.use(async (_req, _res, next) => {
    try {
        await connectDB();
        next();
    } catch (err) {
        next(err);
    }
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// Local development only
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 5000;
    mongoose.connect(process.env.MONGODB_URI)
        .then(() => {
            console.log('Connected to MongoDB');
            app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
        })
        .catch((err) => console.error('MongoDB connection error:', err));
}

// Vercel serverless export
export default app;

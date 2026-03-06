import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from './models/User.js';
import Task from './models/Task.js';

dotenv.config();

const seedDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // Clear existing data
        await User.deleteMany();
        await Task.deleteMany();

        const salt = await bcrypt.genSalt(10);
        const hashedAdminPassword = await bcrypt.hash('admin123', salt);
        const hashedEmployeePassword = await bcrypt.hash('emp123', salt);

        // Create Admin
        const admin = await User.create({
            name: 'Admin User',
            email: 'admin@test.com',
            password: hashedAdminPassword,
            role: 'Admin'
        });

        // Create Employee
        const employee = await User.create({
            name: 'Employee One',
            email: 'employee@test.com',
            password: hashedEmployeePassword,
            role: 'Employee'
        });

        console.log('Database seeded successfully!');
        console.log(`Admin ID: ${admin._id}`);
        console.log(`Employee ID: ${employee._id}`);

        process.exit();
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();

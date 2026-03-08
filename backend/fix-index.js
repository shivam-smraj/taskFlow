import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

mongoose.connect(process.env.MONGODB_URI).then(async () => {
    console.log('Connected to MongoDB');
    const db = mongoose.connection.db;
    const collection = db.collection('users');
    const indexes = await collection.indexes();
    console.log('Current indexes:', indexes.map(i => i.name));
    try {
        await collection.dropIndex('googleId_1');
        console.log('✅ Dropped googleId_1 index');
    } catch (e) {
        console.log('Index not found or already removed:', e.message);
    }
    await mongoose.disconnect();
    process.exit(0);
}).catch(err => { console.error(err); process.exit(1); });

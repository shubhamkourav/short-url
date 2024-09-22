const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        if (!process.env.MONGODB_URL) {
            console.error("No MongoDB URI provided");
            process.exit(1);
        }
        await mongoose.connect(process.env.MONGODB_URL, {});
        console.log("MongoDB connected");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
};

module.exports = connectDB;
import mongoose from "mongoose";

interface ConnectionType {
  isConnected?: number;
}

const connection: ConnectionType = {};

export async function connectDB(): Promise<void> {
  if (connection.isConnected) {
    console.log("DB is already connected");
    return;
  }

  try {
    const dbConnect = await mongoose.connect(process.env.MONGO_URI || "");
    connection.isConnected = dbConnect.connections[0].readyState;
    console.log("Database Connected Successfully");
  } catch (error) {
    console.log("Database connection error:", error);
    process.exit(1);
  }
}

export default connectDB;

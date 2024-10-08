import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

async function dbConnect(): Promise<void> {
  if (connection.isConnected) {
    // console.log("Database is connected already");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI || "");
    connection.isConnected = db.connections[0].readyState;

    console.log("Connection Successful to database");
  } catch (error) {
    console.log("Cannot connect to the database", error);
    process.exit();
  }
}

export default dbConnect;

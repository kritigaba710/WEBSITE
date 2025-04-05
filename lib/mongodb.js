import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGO;

if (!MONGODB_URL) {
  throw new Error("Please define the MONGO environment variable");
}

async function connectToDatabase() {
  if (mongoose.connection.readyState === 1) {
    return mongoose;
  }

  const opts = {
    bufferCommands: false
  };

  await mongoose.connect(MONGODB_URL, opts);
  console.log("connected to database")
  return mongoose;
}

export default connectToDatabase;

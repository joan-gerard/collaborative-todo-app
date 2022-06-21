import mongoose from "mongoose";

export const connectDB = async () => {
  const URI: string = `mongodb+srv://joan2545:${process.env.MONGO_PASSWORD}@cluster0.6xuj9.mongodb.net/todo?retryWrites=true&w=majority`;
  const conn = await mongoose.connect(URI);

  console.log(`MongoDB Connected: ${conn.connection.host}`);
};
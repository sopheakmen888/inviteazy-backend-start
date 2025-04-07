import mongoose from "mongoose";

export const connectMongoDB = async () => {
  try {
    const URI = "mongodb+srv://sreymeynai:v4l3GEd8srHlKhkV@cluster0.2pgog05.mongodb.net/";
    const connOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as mongoose.ConnectOptions;
    const conn = await mongoose.connect(URI, connOptions);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error: ${error.message}`);
    } else {
      console.error(`Unknown Error: ${error}`);
    }
    process.exit(1);
  }
};

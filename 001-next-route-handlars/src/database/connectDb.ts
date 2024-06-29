import * as mongoose from "mongoose";

export const dbConnect = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      // process.env.MONGOBD_URL as string
      "mongodb://0.0.0.0:27017/credaintail"
    );
    // const connectionInstance = await mongoose.connect("mongodb://0.0.0.0:27017/docter")
    console.log(
      `\nMongoDB connected !! DB HOST: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("MONGODB connection FAILED ", error);
    process.exit(1);
  }
};

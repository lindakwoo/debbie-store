import mogoose from "mongoose";

const connectToDatabase = async () => {
  try {
    mogoose.set("strictQuery", false);
    const connect = await mogoose.connect(process.env.MONGO_URI);
    console.log(`MongoDb connected:${connect.connection.host}`);
  } catch (error) {
    console.log(`error: ${error.message}`);
  }
};

export default connectToDatabase;

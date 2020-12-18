const mongoose = require("mongoose");
const MONGO_URI =
  "mongodb+srv://vinh123:vinh123@cluster0-jgn6k.gcp.mongodb.net/shoes?retryWrites=true&w=majority";
const connectDB = async () => {
  const conn = await mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });
  console.log(`MongoDB Connected: ${conn.connection.host}`);
};
module.exports = connectDB;
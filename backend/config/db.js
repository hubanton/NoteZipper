const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });

    console.log(`MongoDB Connected Successfully: ${conn.connection.host}`);
  } catch (err) {
    console.log(`Connection to MongoDB failed ${err}`);
    process.exit();
  }
};

module.exports = connectDB;

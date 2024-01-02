const mongoose = require('mongoose');

const connectDb = async () => {

  try {
    const con = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDb connected: ${con.connection.name}`);
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

module.exports = connectDb;
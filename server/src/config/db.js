const mongoose = require("mongoose");

async function connectDB(uri) {
  console.log("uri",uri);
  
  if (!uri) throw new Error("MONGODB_URI is required");
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
}

module.exports = {
  connectDB
};

const mongoose = require("mongoose");
const initData = require("./data.js");  // Changed from "./data.js"
const Listing = require("../models/listing.js");  // Changed from "./models/listing.js"

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("Connected to MongoDB");
    initDB();
  })
  .catch(err => {
    console.error("Error connecting to MongoDB:", err);
  });

async function main() {
  await mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
}

const initDB = async () => {
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj)=>({...obj,owner:"68515b147a7ab3fad64dd962"}));
  await Listing.insertMany(initData.data);
  console.log("Data was initialized");
};


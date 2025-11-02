require("dotenv").config();
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const Trial = require("../models/Trails.js");
const { connectDB } = require("../config/db.js");
const { normalizeTrial } = require("../utils/normalizeInput.js");

const seedTrials = async () => {
  try {
    await connectDB(process.env.MONGODB_URI);

const filePath = path.join(__dirname, "trialsData.json");
    const rawData = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    console.log(`Found ${rawData.length} raw records`);

    const normalized = rawData.map(normalizeTrial).filter(Boolean);

    await Trial.deleteMany({});
    await Trial.insertMany(normalized);

    console.log(`Inserted ${normalized.length} trials successfully!`);
    process.exit(0);
  } catch (err) {
    console.error("Error seeding data:", err);
    process.exit(1);
  }
};

seedTrials();

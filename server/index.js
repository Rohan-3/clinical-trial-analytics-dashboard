require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connectDB } = require("../server/src/config/db");

const analyticsRoutes = require("../server/src/routes/analyticsRoutes");
const Trial = require("../server/src/models/Trails");
const { normalizeTrial } = require("../server/src/utils/normalizeInput");

const app = express();
const PORT = process.env.PORT || 4000;
const MONGODB_URI = process.env.MONGODB_URI;

app.use(cors());
app.use(express.json({ limit: "2mb" }));

app.get("/health", (req, res) => res.json({ ok: true, time: new Date() }));

app.use("/api/analytics", analyticsRoutes);

// To insert all trials into MongoDB
app.post("/import-trials", async (req, res, next) => {
  try {
    if (!Array.isArray(req.body)) return res.status(400).json({ error: "Expecting array of trials" });
    const docs = req.body.map(raw => normalizeTrial(raw)).filter(Boolean);
    const inserted = await Trial.insertMany(docs);
    res.json({ inserted: inserted.length });
  } catch (err) {
    next(err);
  }
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: err.message || "Internal Server Error" });
});

(async function start() {
  try {
    await connectDB(MONGODB_URI);
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
})();
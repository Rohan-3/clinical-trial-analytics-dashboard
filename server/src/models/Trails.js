const mongoose = require("mongoose");

const LocationSchema = new mongoose.Schema(
  {
    facility: { type: String, trim: true },
    city: { type: String, trim: true },
    state: { type: String, trim: true },
    zip: { type: String, trim: true },
    country: { type: String, trim: true },
  },
  { _id: false }
);

const EligibilitySchema = new mongoose.Schema(
  {
    sex: { type: String, trim: true },
    minimumAge: { type: String },
    maximumAge: { type: String },
  },
  { _id: false }
);

const TrialSchema = new mongoose.Schema(
  {
    raw: { type: Object, default: {} },
    protocolSection: { type: Object, default: {} },
    locations: { type: [LocationSchema], default: [] },
    eligibility: { type: EligibilitySchema, default: {} },
    startDate: { type: Date },
  },
  { timestamps: true }
);

/**
 * Indexes to speed up aggregations and filtering
 */
TrialSchema.index({ "locations.country": 1 });
TrialSchema.index({ "locations.city": 1 });
TrialSchema.index({ "eligibility.sex": 1 });
TrialSchema.index({ startDate: 1 });

module.exports = mongoose.model("Trial", TrialSchema);

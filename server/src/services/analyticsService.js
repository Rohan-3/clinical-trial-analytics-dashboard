const mongoose = require("mongoose");
const Trial = require("../models/Trails");

/**
 * As Trail data is not having the startDate I added this function so perform the filter ffeature.
 * Helper to add an optional startDate filter to the pipeline.
 */
function addStartAfterMatch(pipeline, startAfterYear) {
  if (!startAfterYear) return pipeline;
  const yearNum = Number(startAfterYear);
  if (Number.isNaN(yearNum)) return pipeline;
  const date = new Date(yearNum, 0, 1);
  pipeline.push({ $match: { startDate: { $gte: date } } });
  return pipeline;
}

//Location
async function getLocationsPerCountry({ startAfterYear } = {}) {
  const pipeline = [];

  addStartAfterMatch(pipeline, startAfterYear);

  pipeline.push({ $unwind: "$locations" });

  pipeline.push({
    $match: { "locations.country": { $exists: true, $ne: null } },
  });

  // group by country + facility to deduplicate facility names per country
  pipeline.push({
    $group: {
      _id: {
        country: "$locations.country",
        facility: "$locations.facility",
      },
      count: { $sum: 1 },
    },
  });

  pipeline.push({
    $group: {
      _id: "$_id.country",
      facilitiesCount: { $sum: 1 },
    },
  });

  pipeline.push({ $sort: { facilitiesCount: -1 } });

  const rows = await Trial.aggregate(pipeline).allowDiskUse(true);
  return rows.map((r) => ({ country: r._id, count: r.facilitiesCount }));
}

//Demographics
async function getDemographics({ startAfterYear } = {}) {
  const pipeline = [];
  addStartAfterMatch(pipeline, startAfterYear);

  pipeline.push({
    $project: {
      sex: { $ifNull: ["$eligibility.sex", "UNKNOWN"] },
      minAgeStr: "$eligibility.minimumAge",
    },
  });

  pipeline.push({
    $addFields: {
      minAgeNum: {
        $cond: [
          {
            $and: [
              { $isArray: { $split: ["$minAgeStr", " "] } },
              {
                $ne: [
                  { $arrayElemAt: [{ $split: ["$minAgeStr", " "] }, 0] },
                  "",
                ],
              },
            ],
          },
          { $toInt: { $arrayElemAt: [{ $split: ["$minAgeStr", " "] }, 0] } },
          null,
        ],
      },
    },
  });

  // 1) sex distribution
  const sexGroupStage = [
    { $group: { _id: "$sex", count: { $sum: 1 } } },
    { $project: { sex: "$_id", count: 1, _id: 0 } },
  ];

  // 2) age buckets using $bucket (fallback minAgeNum null goes to "Unknown")
  const ageBucketStage = [
    {
      $bucket: {
        groupBy: "$minAgeNum",
        boundaries: [0, 18, 30, 45, 60, 9999],
        default: "Unknown",
        output: { count: { $sum: 1 } },
      },
    },
  ];

  const sexPipeline = [...pipeline, ...sexGroupStage];
  const sexRows = await Trial.aggregate(sexPipeline).allowDiskUse(true);

  const ageRows = await Trial.aggregate(
    pipeline.concat(ageBucketStage)
  ).allowDiskUse(true);

  const formattedAgeBuckets = ageRows.map((item) => {
    const key = item._id;
    if (key === "Unknown") return { bucket: "Unknown", count: item.count };
    let label = "";
    if (key === 0) label = "0-17";
    else if (key === 18) label = "18-29";
    else if (key === 30) label = "30-44";
    else if (key === 45) label = "45-59";
    else if (key === 60) label = "60+";
    else label = `${key}`;
    return { bucket: label, count: item.count };
  });

  return {
    sexDistribution: sexRows.map((r) => ({ sex: r.sex, count: r.count })),
    ageBuckets: formattedAgeBuckets,
  };
}

//Trials per city (top 10)
async function getTrialsPerCity({ startAfterYear, limit = 10 } = {}) {
  const pipeline = [];
  addStartAfterMatch(pipeline, startAfterYear);

  pipeline.push({ $unwind: "$locations" });
  pipeline.push({ $match: { "locations.city": { $exists: true, $ne: null } } });

  // dedupe facility by city+country+facility
  pipeline.push({
    $group: {
      _id: {
        city: "$locations.city",
        country: "$locations.country",
        facility: "$locations.facility",
      },
    },
  });

  // group by city (and country) to count unique facilities
  pipeline.push({
    $group: {
      _id: { city: "$_id.city", country: "$_id.country" },
      facilitiesCount: { $sum: 1 },
    },
  });

  pipeline.push({ $sort: { facilitiesCount: -1 } });
  pipeline.push({ $limit: Number(limit) });

  const rows = await Trial.aggregate(pipeline).allowDiskUse(true);

  return rows.map((r) => ({
    city: r._id.city,
    country: r._id.country,
    count: r.facilitiesCount,
  }));
}

async function getOfficials() {
  const trials = await Trial.find(
    {
      "protocolSection.contactsLocationsModule.overallOfficials": {
        $exists: true,
      },
    },
    { "protocolSection.contactsLocationsModule.overallOfficials": 1 }
  ).lean();

  const allOfficials = trials.flatMap(
    (trial) =>
      trial?.protocolSection?.contactsLocationsModule?.overallOfficials?.map(
        (o) => ({
          name: o?.name || "Unknown",
          affiliation: o?.affiliation || "N/A",
        })
      ) || []
  );

  return allOfficials;
}

module.exports = {
  getLocationsPerCountry,
  getDemographics,
  getTrialsPerCity,
  getOfficials,
};

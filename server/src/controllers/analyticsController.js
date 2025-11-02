const analyticsService = require("../services/analyticsService");

async function locationsHandler(req, res, next) {
  try {
    const { startAfter } = req.query;
    const data = await analyticsService.getLocationsPerCountry({ startAfterYear: startAfter });
    res.json({ data, meta: { generatedAt: new Date() } });
  } catch (err) {
    next(err);
  }
}

/**
 * GET /api/analytics/demographics
 * Query params: startAfter (year)
 */
async function demographicsHandler(req, res, next) {
  try {
    const { startAfter } = req.query;
    const data = await analyticsService.getDemographics({ startAfterYear: startAfter });
    res.json({ data, meta: { generatedAt: new Date() } });
  } catch (err) {
    next(err);
  }
}

/**
 * GET /api/analytics/trials-per-city
 * Query params: startAfter (year), limit
 */
async function trialsPerCityHandler(req, res, next) {
  try {
    const { startAfter, limit } = req.query;
    const data = await analyticsService.getTrialsPerCity({ startAfterYear: startAfter, limit: limit || 10 });
    res.json({ data, meta: { generatedAt: new Date() } });
  } catch (err) {
    next(err);
  }
}

/**
 * GET /api/analytics/officials
 * Query params: page, limit
 */
async function officialsHandler(req, res, next) {
  try {
    const data = await analyticsService.getOfficials();
    res.json(data);
  } catch (err) {
    console.error("Error in officialsHandler:", err);
    next(err);
  }
}



module.exports = {
  locationsHandler,
  demographicsHandler,
  trialsPerCityHandler,
  officialsHandler,
};

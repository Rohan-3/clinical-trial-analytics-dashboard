const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/analyticsController");

router.get("/locations", ctrl.locationsHandler);
router.get("/demographics", ctrl.demographicsHandler);
router.get("/trials-per-city", ctrl.trialsPerCityHandler);
router.get("/officials", ctrl.officialsHandler);

module.exports = router;

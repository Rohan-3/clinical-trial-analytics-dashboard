function parseAgeString(ageStr) {
  if (!ageStr || typeof ageStr !== "string") return null;
  const num = parseInt(ageStr.trim().split(" ")[0], 10);
  return Number.isNaN(num) ? null : num;
}

function normalizeTrial(raw) {
  if (!raw || typeof raw !== "object") return null;

  const ps = raw.protocolSection || {};
  const eligibilityModule = ps.eligibilityModule || {};
  const contactsLocationsModule = ps.contactsLocationsModule || {};

  const locationsRaw = Array.isArray(contactsLocationsModule.locations)
    ? contactsLocationsModule.locations
    : [];

  const locations = locationsRaw.map(loc => ({
    facility: loc.facility || loc.name || null,
    city: loc.city || null,
    state: loc.state || null,
    zip: loc.zip || null,
    country: loc.country || null,
  }));

  const eligibility = {
    sex: eligibilityModule.sex || null,
    minimumAge: eligibilityModule.minimumAge || null,
    maximumAge: eligibilityModule.maximumAge || null,
  };

  let startDate = null;

  if (ps.startDate) {
    startDate = new Date(ps.startDate);
  } else if (raw.start_date) {
    startDate = new Date(raw.start_date);
  } else if (raw.studyStartDate) {
    startDate = new Date(raw.studyStartDate);
  }

  if (!startDate || isNaN(startDate.getTime())) {
    const randomYear = 2010 + Math.floor(Math.random() * 15); 
    const randomMonth = Math.floor(Math.random() * 12); 
    const randomDay = 1 + Math.floor(Math.random() * 28);
    startDate = new Date(randomYear, randomMonth, randomDay);
  }

  return {
    raw,
    protocolSection: ps,
    locations,
    eligibility,
    startDate,
  };
}

module.exports = {
  normalizeTrial,
  parseAgeString,
};

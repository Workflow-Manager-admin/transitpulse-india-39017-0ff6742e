//
// GTFS Data Service for TransitPulse India
// ----------------------------------------
// Provides async functions to fetch/parse transit data (routes, stops, schedules).
// - Initial implementation uses mocked data and placeholder GTFS fetch logic.
// - Designed for future expansion: real-data fetch, parsing, normalization, offline cache.
// - Every function includes error handling and clear documentation.
//
// For reference GTFS format see: https://developers.google.com/transit/gtfs/reference
//

// SAMPLE GTFS FEED for initial fetching (Delhi’s DTC: public demo — change to production source later)
const SAMPLE_GTFS_ZIP_URL =
  "https://www.gstatic.com/transit/gtfs/examples/sample-feed.zip";

// --- Mock datasets (development stubs; replace with real data/GTFS parsing) ---
const mockRoutes = [
  {
    route_id: "DT10",
    route_short_name: "10A",
    route_long_name: "Connaught Place - Lajpat Nagar",
    route_type: 3, // bus
    agency_id: "DTC",
    color: "#1976D2"
  },
  {
    route_id: "DM_line5",
    route_short_name: "Yellow",
    route_long_name: "Samaypur Badli - HUDA City Centre",
    route_type: 1, // metro
    agency_id: "DMRC",
    color: "#FFC107"
  }
];

const mockStops = [
  {
    stop_id: "STP1001",
    stop_name: "Connaught Place",
    stop_lat: 28.6315,
    stop_lon: 77.2167,
    stop_code: "CNDT",
    zone_id: "DL"
  },
  {
    stop_id: "STP1002",
    stop_name: "Lajpat Nagar",
    stop_lat: 28.5732,
    stop_lon: 77.2436,
    stop_code: "LJPG",
    zone_id: "DL"
  },
  {
    stop_id: "DM5001",
    stop_name: "HUDA City Centre",
    stop_lat: 28.4514,
    stop_lon: 77.0723,
    stop_code: "HUDC",
    zone_id: "DL"
  }
];

const mockSchedules = [
  {
    trip_id: "T10001",
    route_id: "DT10",
    stop_times: [
      { stop_id: "STP1001", arrival_time: "08:40:00", departure_time: "08:42:00" },
      { stop_id: "STP1002", arrival_time: "09:00:00", departure_time: "09:05:00" }
    ],
    service_days: [1, 2, 3, 4, 5, 6] // Mon-Sat
  },
  {
    trip_id: "T50001",
    route_id: "DM_line5",
    stop_times: [
      { stop_id: "DM5001", arrival_time: "09:30:00", departure_time: "09:32:00" }
    ],
    service_days: [0, 1, 2, 3, 4, 5, 6] // all days
  }
];

// --- Internal: Normalization helpers (stubs, expand for real GTFS data) ---
function normalizeRoutes(gtfsRoutes) {
  // Transform GTFS “routes.txt” array to app shape (see mockRoutes for target shape)
  // TODO: implement when using real GTFS downloads
  return mockRoutes;
}
function normalizeStops(gtfsStops) {
  // Transform GTFS “stops.txt” array to app shape
  return mockStops;
}
function normalizeSchedules(gtfsStopTimes, gtfsTrips, gtfsCalendar) {
  // Transform GTFS stop_times/trips/calendar data to shape as in mockSchedules
  return mockSchedules;
}

// --- Fetch logic (stub: returns local mock data; prepare for real GTFS parsing) ---

// PUBLIC_INTERFACE
/**
 * Fetch all available transit routes.
 * Returns a promise that resolves to an array of route objects.
 */
export async function fetchRoutes(/*city, options*/) {
  // In a real version, we’d download & parse routes.txt from GTFS zip
  // For now, always resolve mockRoutes. Add artificial latency.
  try {
    await latency(100); // simulate network
    return normalizeRoutes([]);
  } catch (error) {
    console.error("Error fetching routes:", error);
    throw new Error("Could not fetch routes");
  }
}

// PUBLIC_INTERFACE
/**
 * Fetch all stops available in the transit network.
 * Returns a promise that resolves to an array of stop objects.
 */
export async function fetchStops(/*city, options*/) {
  try {
    await latency(120);
    return normalizeStops([]);
  } catch (error) {
    console.error("Error fetching stops:", error);
    throw new Error("Could not fetch stops");
  }
}

// PUBLIC_INTERFACE
/**
 * Fetch schedules for given route (or all routes if routeId is not specified).
 * Returns a promise resolving to an array of schedule objects (trips and times).
 * @param {string} [routeId] - Optional route id to filter schedule.
 */
export async function fetchSchedules(routeId /*, city, options*/) {
  try {
    await latency(150);
    // Filter for specific route, else return all
    const allSchedules = normalizeSchedules([], [], []);
    if (routeId) {
      return allSchedules.filter(s => s.route_id === routeId);
    }
    return allSchedules;
  } catch (error) {
    console.error("Error fetching schedules:", error);
    throw new Error("Could not fetch schedules");
  }
}

// --- Advanced: Future offline fallback (stub for later) ---
/** Placeholder: In a real impl, checks offline cache before going to network */
async function getGTFSDataOfflineFirst(type) {
  // TODO: implement offline/IndexedDB/localForage logic
  // For now, always fetch online (stub)
  console.log(`Offline-first fetch requested for: ${type} (stubbed)`);
  // e.g. return from cache if present/valid, else call fetchRoutes/fetchStops etc.
  return null;
}

// --- Utility: fetch GTFS zip, extract, parse (for GTFS direct integration, not yet implemented) ---
async function fetchAndParseGTFSZip(url = SAMPLE_GTFS_ZIP_URL) {
  // TODO: download GTFS zip, unzip, parse .txts (using JSZip and PapaParse, if adopted)
  throw new Error("GTFS parsing not yet implemented (future feature)"); // placeholder
}

// Utility to simulate network latency for stub/mock functions
function latency(ms) {
  return new Promise(res => setTimeout(res, ms));
}

/*
  How to extend to real GTFS feeds:
    1. Replace mock fetch logic with fetchAndParseGTFSZip().
    2. Parse routes.txt, stops.txt, trips.txt, stop_times.txt, calendar.txt using CSV parser or similar.
    3. Normalize records using normalizeRoutes(), normalizeStops(), etc., for consistent app-wide use.
    4. Implement getGTFSDataOfflineFirst() using local cache for offline fallback.
    5. Add city filtering, real GTFS URLs, and error fallback/refresh.

  External Dependencies (when enabling real parsing):
    - JSZip: For .zip extraction in-browser.
    - PapaParse or similar: For parsing CSV content.
    - localForage or IndexedDB: For offline GTFS caching.
*/

// --- Export for use in app: (named exports above) ---

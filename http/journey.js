import { buildUrl } from "../utils/utils";
import { ServerUrlConstants } from "../models/constants";
import { get } from "./requests";

// getJourneyRequest makes the call to the API endpoints for getting the journey request
// between a start and end location using latitude and longitude
export async function getJourneyLatLonRequest(startLocation, endLocation) {
  // build the query from the base and journey url
  const url = buildUrl(
    ServerUrlConstants.ServerBaseUrl,
    ServerUrlConstants.JourneyLonLatUrl,
    `from_lat=${startLocation.lat}&from_lon=${startLocation.lon}&to_lat=${endLocation.lat}&to_lon=${endLocation.lon}`
  );

  // get the journey from over http
  return await get(url);
}

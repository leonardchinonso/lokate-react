import { ErrorConstants } from "../models/errors";
import { HttpStatusCodes } from "../models/constants";
import { getJourneyLatLonRequest } from "../http/journey";
import { getHoursAndMinutes } from "../utils/utils";

export const transportModeConversionMap = {
  foot: "walking",
  bus: "bus",
  train: "train",
  tube: "tube",
};

// getJourney gets a journey and its routes from the server
export async function getJourney(startLocation, endLocation) {
  const result = {
    journeyResults: null,
    error: "",
    status: 0,
    message: "",
  };

  // get journey results from the server
  const response = await getJourneyLatLonRequest(startLocation, endLocation);

  // if the server returns an unexpected error
  if (response.serverError) {
    result.error = ErrorConstants.ServerErrMsg;
    return result;
  }

  // if a response is returned, good or bad
  if (response.data) {
    switch (response.data.status) {
      case HttpStatusCodes.StatusBadRequest: // if the request is invalid
        result.status = HttpStatusCodes.StatusBadRequest;
        result.message = response.data.message;
        return result;
      case HttpStatusCodes.StatusOk: // if the request is successful
        result.status = HttpStatusCodes.StatusOk;
        result.journeyResults = response.data.data;
        return result;
      default: // return an error on any other outcome
        result.error = ErrorConstants.ServerErrMsg;
        return result;
    }
  }
}

export function modifyRouteInfo(routes) {
  for (let route of routes) {
    route.journeyTime = getHoursAndMinutes(route.duration);
    route.transportModes = [];
    for (let route_part of route.route_parts) {
      route.transportModes.push(transportModeConversionMap[route_part.mode]);
    }
  }

  return routes;
}

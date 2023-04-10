import { requestSavedPlaces } from "../http/Place";
import { ErrorConstants } from "../models/errors";
import { HttpStatusCodes } from "../models/constants";

// getSavedPlaces calls the url handler to get saved places resource
export async function getSavedPlaces(tokenString) {
  const result = {
    savedPlaces: [],
    error: "",
    status: 0,
    message: "",
  };

  // get saved places from the backend
  const response = await requestSavedPlaces(tokenString);

  // if the server returns an unexpected error
  if (response.serverError) {
    result.error = ErrorConstants.ServerErrMsg;
    return result;
  }

  // if a response is returned, good or bad
  if (response.data) {
    switch (response.data.status) {
      // if the request came back unauthorized
      case HttpStatusCodes.StatusUnauthorized:
        result.status = HttpStatusCodes.StatusUnauthorized;
        return result;
      case HttpStatusCodes.StatusBadRequest: // if the request is invalid
        result.status = HttpStatusCodes.StatusBadRequest;
        result.message = response.data.message;
        return result;
      case HttpStatusCodes.StatusOk: // if the request is successful
        result.status = HttpStatusCodes.StatusOk;
        result.savedPlaces = response.data.data;
        return result;
      default: // return an error on any other outcome
        result.error = ErrorConstants.ServerErrMsg;
        return result;
    }
  }
}

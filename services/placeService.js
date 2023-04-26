import {
  editSavedPlaceRequest,
  getSavedPlacesRequest,
  getLastVisitedPlacesRequest,
  savePlaceRequest,
  searchPlacesRequest,
  deleteSavedPlaceRequest,
} from "../http/place";
import { ErrorConstants } from "../models/errors";
import { HttpStatusCodes } from "../models/constants";

// savePlace calls the url handler to save a place
export async function savePlace(token, name, alias, placeId) {
  const result = {
    savedPlace: null,
    error: "",
    status: 0,
    message: "",
  };

  // get saved places from the backend
  const response = await savePlaceRequest(token, name, alias, placeId);

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
        result.savedPlace = response.data.data;
        return result;
      default: // return an error on any other outcome
        result.error = ErrorConstants.ServerErrMsg;
        return result;
    }
  }
}

// editSavedPlace calls the url handler to edit a saved place
export async function editSavedPlace(token, name, alias, placeId) {
  const result = {
    savedPlace: null,
    error: "",
    status: 0,
    message: "",
  };

  // get saved places from the backend
  const response = await editSavedPlaceRequest(token, name, alias, placeId);

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
        result.savedPlace = response.data.data;
        return result;
      default: // return an error on any other outcome
        result.error = ErrorConstants.ServerErrMsg;
        return result;
    }
  }
}

// deleteSavedPlace calls the url handler to delete a saved place
export async function deleteSavedPlace(token, savedPlaceId) {
  const result = {
    error: "",
    status: 0,
    message: "",
  };

  // get saved places from the backend
  const response = await deleteSavedPlaceRequest(token, savedPlaceId);

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
        return result;
      default: // return an error on any other outcome
        result.error = ErrorConstants.ServerErrMsg;
        return result;
    }
  }
}

// getSavedPlaces calls the url handler to get saved places resource
export async function getSavedPlaces(tokenString) {
  const result = {
    savedPlaces: [],
    error: "",
    status: 0,
    message: "",
  };

  // get saved places from the backend
  const response = await getSavedPlacesRequest(tokenString);

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
        result.savedPlaces =
          response.data.data === null ? [] : response.data.data;
        return result;
      default: // return an error on any other outcome
        result.error = ErrorConstants.ServerErrMsg;
        return result;
    }
  }
}

// getLastVisitedPlaces calls the url handler to get last visited places
export async function getLastVisitedPlaces(tokenString, numberOfPlaces) {
  const result = {
    lastVisitedPlaces: [],
    error: "",
    status: 0,
    message: "",
  };

  // get saved places from the backend
  const response = await getLastVisitedPlacesRequest(
    tokenString,
    numberOfPlaces
  );

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
        result.lastVisitedPlaces = response.data.data;
        return result;
      default: // return an error on any other outcome
        result.error = ErrorConstants.ServerErrMsg;
        return result;
    }
  }
}

// searchPlaces calls the url handler to search places
export async function searchPlaces(queryString) {
  const result = {
    searchedPlaces: [],
    error: "",
    status: 0,
    message: "",
  };

  // get saved places from the backend
  const response = await searchPlacesRequest(queryString);

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
        result.searchedPlaces =
          response.data.data === null ? [] : response.data.data;
        return result;
      default: // return an error on any other outcome
        result.error = ErrorConstants.ServerErrMsg;
        return result;
    }
  }
}

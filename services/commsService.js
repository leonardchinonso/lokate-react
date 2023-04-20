import { ErrorConstants } from "../models/errors";
import { HttpStatusCodes } from "../models/constants";
import { aboutRequest, contactUsRequest } from "../http/comms";

// contactUs calls the url handler for contactUs API
export async function contactUs(token, subject, message) {
  const result = {
    error: "",
    status: 0,
    message: "",
  };

  // make a request to the API to send the email to the organization
  const response = await contactUsRequest(token, subject, message);

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

// about calls the url handler for about API
export async function about() {
  const result = {
    details: "",
    error: "",
    status: 0,
    message: "",
  };

  // make a request to the API to get about information
  const response = await aboutRequest();

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
        result.details = response.data.data.details;
        return result;
      default: // return an error on any other outcome
        result.error = ErrorConstants.ServerErrMsg;
        return result;
    }
  }
}

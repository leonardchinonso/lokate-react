import { isValidEmail } from "../utils/utils";
import { ErrorConstants } from "../models/errors";
import { HttpStatusCodes } from "../models/constants";
import { editProfileRequest } from "../http/user";

// editProfile calls the url handler to edit a user's profile
export async function editProfile(
  token,
  firstName,
  lastName,
  email,
  phoneNumber
) {
  const result = {
    error: "",
    emailError: "",
    status: 0,
    message: "",
  };

  // check that the email is valid
  const emailIsValid = isValidEmail(email);

  // if the email is invalid, return an error
  if (!emailIsValid) {
    result.emailError = "email format is invalid";
    return result;
  }

  // make the request to the editProfile endpoint
  const response = await editProfileRequest(
    token,
    firstName,
    lastName,
    email,
    phoneNumber
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
      case HttpStatusCodes.StatusOk: // if the request is successful
        result.status = HttpStatusCodes.StatusOk;
        return result;
      case HttpStatusCodes.StatusBadRequest:
        result.status = HttpStatusCodes.StatusBadRequest;
        result.message = response.data.message;
        return result;
      default: // return an error on any other outcome
        result.error = ErrorConstants.ServerErrMsg;
        return result;
    }
  }

  console.log("Leaving: ", response);
}

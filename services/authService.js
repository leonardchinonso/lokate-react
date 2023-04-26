import { ErrorConstants } from "../models/errors";
import { HttpStatusCodes } from "../models/constants";
import { isValidEmail, isValidPassword } from "../utils/utils";
import { loginRequest, signupRequest } from "../http/authentication";

// login calls the url handler to log a user in
export async function login(email, password) {
  const result = {
    userId: "",
    userFirstName: "",
    userLastName: "",
    userEmail: "",
    userDisplayName: "",
    userPhoneNumber: "",
    accessToken: "",
    refreshToken: "",
    error: "",
    emailError: "",
    passwordError: "",
    status: 0,
    message: "",
  };

  // check that the email and password are valid
  const emailIsValid = isValidEmail(email);
  const passwordIsValid = isValidPassword(password);

  // if the email or password are invalid, return the error
  if (!emailIsValid || !passwordIsValid) {
    result.emailError = emailIsValid ? "" : "email format is invalid";
    result.passwordError = passwordIsValid
      ? ""
      : "password must not be less than 6 characters";
    return result;
  }

  // make the request to the login endpoint
  const response = await loginRequest(email, password);

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
        result.userId = response.data.data.user.id;
        result.userEmail = response.data.data.user.email;
        result.userFirstName = response.data.data.user.first_name;
        result.userLastName = response.data.data.user.last_name;
        result.userDisplayName =
          response.data.data.user.first_name +
          " " +
          response.data.data.user.last_name;
        result.userPhoneNumber = response.data.data.user.phone_number;
        result.accessToken = response.data.data.access_token;
        result.refreshToken = response.data.data.refresh_token;
        return result;
      default: // return an error on any other outcome
        result.error = ErrorConstants.ServerErrMsg;
        return result;
    }
  }
}

// signup calls the url handler to log a user in
export async function signup(
  firstName,
  lastName,
  email,
  password,
  confirmPassword
) {
  const result = {
    userId: "",
    userFirstName: "",
    userLastName: "",
    userEmail: "",
    userDisplayName: "",
    accessToken: "",
    refreshToken: "",
    error: "",
    emailError: "",
    passwordError: "",
    status: 0,
    message: "",
  };

  // check that the email and password are valid
  const emailIsValid = isValidEmail(email);
  const passwordIsValid = isValidPassword(password);

  // check that the password and confirmed password are the same
  const samePasswordError =
    password !== confirmPassword
      ? "password is not the same as confirmed password"
      : "";

  // set the password error text if there is an invalid password
  let passwordErrText = !passwordIsValid
    ? "password must not be less than 6 characters"
    : samePasswordError !== ""
    ? samePasswordError
    : "";

  // if the email or password are invalid, return the error
  if (!emailIsValid || !passwordIsValid || samePasswordError) {
    result.emailError = emailIsValid ? "" : "email format is invalid";
    result.passwordError = passwordErrText;
    return result;
  }

  // make the request to the login endpoint
  const response = await signupRequest(
    firstName,
    lastName,
    email,
    password,
    confirmPassword
  );

  // if the server returns an unexpected error
  if (response.serverError) {
    result.error = ErrorConstants.ServerErrMsg;
    return result;
  }

  // if a response is returned, good or bad
  if (response.data) {
    switch (response.data.status) {
      case HttpStatusCodes.StatusOk: // if the request is successful
        result.status = HttpStatusCodes.StatusOk;
        result.userId = response.data.data.user.id;
        result.userEmail = response.data.data.user.email;
        result.userFirstName = response.data.data.user.first_name;
        result.userLastName = response.data.data.user.last_name;
        result.userDisplayName =
          response.data.data.user.first_name +
          " " +
          response.data.data.user.last_name;
        result.accessToken = response.data.data.access_token;
        result.refreshToken = response.data.data.refresh_token;
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
}

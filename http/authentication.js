import { ServerUrlConstants } from "../models/constants";
import { buildUrl } from "../utils/utils";
import { post } from "./requests";

// loginRequest calls the server endpoint to log the user in
export async function loginRequest(email, password) {
  // build the url from the base url and login url
  const url = buildUrl(
    ServerUrlConstants.ServerBaseUrl,
    ServerUrlConstants.LoginUrl
  );

  // build the body from the email and password
  const body = {
    email,
    password,
  };

  // make a post request to log the user in
  return await post(url, null, body);
}

// signupRequest calls the server endpoint to sign the user up
export async function signupRequest(
  firstName,
  lastName,
  email,
  password,
  confirmPassword
) {
  // build the url from the base url and signup url
  const url = buildUrl(
    ServerUrlConstants.ServerBaseUrl,
    ServerUrlConstants.SignUpUrl
  );

  // build the body
  const body = {
    first_name: firstName,
    last_name: lastName,
    email,
    password,
    confirm_password: confirmPassword,
  };

  // make a post request to sign the user up
  return await post(url, null, body);
}

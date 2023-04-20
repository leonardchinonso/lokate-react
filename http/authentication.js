import { ServerUrlConstants } from "../models/constants";
import { buildUrl } from "../utils/utils";
import { post } from "./requests";

// loginRequest calls the server endpoint to log the user in
export async function loginRequest(email, password) {
  const url = buildUrl(
    ServerUrlConstants.ServerBaseUrl,
    ServerUrlConstants.LoginUrl
  );

  const body = {
    email,
    password,
  };

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
  const url = buildUrl(
    ServerUrlConstants.ServerBaseUrl,
    ServerUrlConstants.SignUpUrl
  );

  const body = {
    first_name: firstName,
    last_name: lastName,
    email,
    password,
    confirm_password: confirmPassword,
  };

  return await post(url, null, body);
}

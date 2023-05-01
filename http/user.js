import { buildUrl } from "../utils/utils";
import { ServerUrlConstants } from "../models/constants";
import { put } from "./requests";

// editProfileRequest sends a http request to the edit profile endpoint
export async function editProfileRequest(
  token,
  firstName,
  lastName,
  email,
  phoneNumber
) {
  // build response
  const url = buildUrl(
    ServerUrlConstants.ServerBaseUrl,
    ServerUrlConstants.EditProfileUrl
  );

  // store the token in the headers object
  const headers = {
    token: `Bearer ${token}`,
  };

  // build the body from the edit profile details
  const body = {
    first_name: firstName,
    last_name: lastName,
    email,
    phone_number: phoneNumber,
  };

  // make a request to edit the profile
  return await put(url, headers, body);
}

// editProfileRequest sends a http request to the edit profile endpoint
import { buildUrl } from "../utils/utils";
import { ServerUrlConstants } from "../models/constants";
import { put } from "./requests";

export async function editProfileRequest(
  token,
  firstName,
  lastName,
  email,
  phoneNumber
) {
  const url = buildUrl(
    ServerUrlConstants.ServerBaseUrl,
    ServerUrlConstants.EditProfileUrl
  );

  const headers = {
    token: `Bearer ${token}`,
  };

  const body = {
    first_name: firstName,
    last_name: lastName,
    email,
    phone_number: phoneNumber,
  };

  return await put(url, headers, body);
}

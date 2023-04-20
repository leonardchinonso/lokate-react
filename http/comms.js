import { buildUrl } from "../utils/utils";
import { ServerUrlConstants } from "../models/constants";
import { get, post } from "./requests";

// contactUsRequest makes a http request to contact the organization
export async function contactUsRequest(token, subject, message) {
  const url = buildUrl(
    ServerUrlConstants.ServerBaseUrl,
    ServerUrlConstants.ContactUsUrl
  );

  const headers = {
    token: `Bearer ${token}`,
  };

  const body = {
    subject,
    message,
  };

  return await post(url, headers, body);
}

// aboutRequest makes a http request to get information about the organization
export async function aboutRequest() {
  const url = buildUrl(
    ServerUrlConstants.ServerBaseUrl,
    ServerUrlConstants.AboutUrl
  );

  return await get(url, null, null);
}

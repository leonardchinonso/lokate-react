import { buildUrl } from "../utils/utils";
import { ServerUrlConstants } from "../models/constants";
import { get, post } from "./requests";

// contactUsRequest makes a http request to contact the organization
export async function contactUsRequest(token, subject, message) {
  // build the url for the contact us request
  const url = buildUrl(
    ServerUrlConstants.ServerBaseUrl,
    ServerUrlConstants.ContactUsUrl
  );

  // build the header using the authorization token
  const headers = {
    token: `Bearer ${token}`,
  };

  // build the body using the subject and message
  const body = {
    subject,
    message,
  };

  // make the request for contactUs
  return await post(url, headers, body);
}

// aboutRequest makes a http request to get information about the organization
export async function aboutRequest() {
  // build the url from the base and about url
  const url = buildUrl(
    ServerUrlConstants.ServerBaseUrl,
    ServerUrlConstants.AboutUrl
  );

  // get the about details over http
  return await get(url, null, null);
}

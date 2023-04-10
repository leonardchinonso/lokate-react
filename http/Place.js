import axios from "axios";
import { ServerUrlConstants } from "../models/constants";
import { BuildUrl } from "../utils/utils";
import { catchErr } from "../utils/errors";
export async function EditPlace(token, name, alias, placeId) {
  const url = BuildUrl(
    ServerUrlConstants.ServerBaseUrl,
    ServerUrlConstants.SavedPlacesUrl,
    `/${placeId}`
  );

  const headers = {
    token: `Bearer ${token}`,
  };

  const body = {
    name,
    alias,
  };

  return await put(url, headers, body);
}

export async function requestSavedPlaces(token) {
  const url = BuildUrl(
    ServerUrlConstants.ServerBaseUrl,
    ServerUrlConstants.SavedPlacesUrl
  );

  const headers = {
    token: `Bearer ${token}`,
  };

  return await get(url, headers);
}

export async function SavePlace(token, name, alias, placeId) {
  const url = BuildUrl(
    ServerUrlConstants.ServerBaseUrl,
    ServerUrlConstants.SavedPlacesUrl,
    `/${placeId}`
  );

  const headers = {
    token: `Bearer ${token}`,
  };

  return await post(url, headers);
}

export async function EditSavedPlace(token, name, alias, placeId) {
  const url = BuildUrl(
    ServerUrlConstants.ServerBaseUrl,
    ServerUrlConstants.SavedPlacesUrl,
    `/${placeId}`
  );

  const headers = {
    token: `Bearer ${token}`,
  };

  const body = {
    name,
    place_alias: alias,
  };

  return await put(url, headers, body);
}

// get makes a get request to the given url
async function get(url, headers) {
  const response = {
    data: null,
    serverError: null,
  };

  let [err, resp] = await catchErr(
    axios.get(url, {
      validateStatus: function (status) {
        return status < 500;
      },
      headers,
    })
  );

  if (err) {
    console.log("Error fetching request with url: ", url, ". Error: ", err);
    response.serverError = err;
    return response;
  }

  console.log("Request hit server successfully");
  response.data = resp.data;
  return response;
}

// post makes a POST request to the given url
async function post(url, headers, body) {
  console.log(
    `Making a POST request to url: ${url} with headers: ${headers} and body: ${body}`
  );
  const response = {
    data: null,
    serverError: null,
  };

  let [err, resp] = await catchErr(
    axios.post(url, body, {
      validateStatus: function (status) {
        return status < 500;
      },
      headers,
    })
  );

  if (err) {
    console.log("Error fetching request with url: ", url, ". Error: ", err);
    response.serverError = err;
    return response;
  }

  console.log("Request hit server successfully");
  response.data = resp.data;
  return response;
}

// put makes a PUT request to the given url
async function put(url, headers, body) {
  console.log(
    `Making a PUT request to url: ${url} with headers: ${headers} and body: ${body}`
  );
  const response = {
    data: null,
    serverError: null,
  };

  let [err, resp] = await catchErr(
    axios.put(url, body, {
      validateStatus: function (status) {
        return status < 500;
      },
      headers,
    })
  );

  if (err) {
    console.log("Error fetching request with url: ", url, ". Error: ", err);
    response.serverError = err;
    return response;
  }

  console.log("Request hit server successfully");
  response.data = resp.data;
  return response;
}

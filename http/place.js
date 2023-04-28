import { ServerUrlConstants } from "../models/constants";
import { buildUrl } from "../utils/utils";
import { del, get, post, put } from "./requests";

// getSavedPlacesRequest makes a http request to get saved places
export async function getSavedPlacesRequest(token) {
  // buildUrl builds the url from the base url and saved places url
  const url = buildUrl(
    ServerUrlConstants.ServerBaseUrl,
    ServerUrlConstants.SavedPlacesUrl
  );

  // save the token in the header object
  const headers = {
    token: `Bearer ${token}`,
  };

  // make request to get the saved places
  return await get(url, headers);
}

// savePlaceRequest makes a http request to save a place
export async function savePlaceRequest(token, name, alias, placeId) {
  // buildUrl builds the url from the base url and saved places url
  const url = buildUrl(
    ServerUrlConstants.ServerBaseUrl,
    ServerUrlConstants.SavedPlacesUrl,
    `${placeId}`
  );

  // save the token in the header object
  const headers = {
    token: `Bearer ${token}`,
  };

  const body = {
    name,
    place_alias: alias,
  };

  // make request to save a place
  return await post(url, headers, body);
}

// editSavedPlaceRequest calls the server endpoint to edit the saved place
export async function editSavedPlaceRequest(token, name, alias, placeId) {
  // buildUrl builds the url from the server base url and saved places url
  const url = buildUrl(
    ServerUrlConstants.ServerBaseUrl,
    ServerUrlConstants.SavedPlacesUrl,
    `${placeId}`
  );

  // save the token in the header object
  const headers = {
    token: `Bearer ${token}`,
  };

  // build the body using the name and place alias
  const body = {
    name,
    place_alias: alias,
  };

  // make request to edit a saved place
  return await put(url, headers, body);
}

// deleteSavedPlaceRequest calls the server endpoint to delete the saved place
export async function deleteSavedPlaceRequest(token, savedPlaceId) {
  // buildUrl builds the url from the server base url and saved places url
  const url = buildUrl(
    ServerUrlConstants.ServerBaseUrl,
    ServerUrlConstants.SavedPlacesUrl,
    `${savedPlaceId}`
  );

  // save the token in the header object
  const headers = {
    token: `Bearer ${token}`,
  };

  // make request to delete a saved place
  return await del(url, headers);
}

// getLastVisitedPlacesRequest calls the server endpoint to get the last visited places
export async function getLastVisitedPlacesRequest(token, numberOfResults) {
  // buildUrl builds the url from the server
  // base url and saved places url and number of results
  const url = buildUrl(
    ServerUrlConstants.ServerBaseUrl,
    ServerUrlConstants.LastVisitedPlacesUrl,
    `${numberOfResults}`
  );

  // save the token in the header object
  const headers = {
    token: `Bearer ${token}`,
  };

  // make get request to get the last visited places
  return await get(url, headers);
}

// searchPlacesRequest calls the server endpoint to search places
export async function searchPlacesRequest(query) {
  // buildUrl builds the url from the server
  // base url and saved places url and search query
  const url = buildUrl(
    ServerUrlConstants.ServerBaseUrl,
    ServerUrlConstants.SearchPlacesUrl,
    `${encodeURIComponent(query)}`
  );

  // make request over http
  return await get(url);
}

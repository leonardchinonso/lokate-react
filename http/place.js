import { ServerUrlConstants } from "../models/constants";
import { buildUrl } from "../utils/utils";
import { del, get, post, put } from "./requests";

// getSavedPlacesRequest makes a http request to get saved places
export async function getSavedPlacesRequest(token) {
  const url = buildUrl(
    ServerUrlConstants.ServerBaseUrl,
    ServerUrlConstants.SavedPlacesUrl
  );

  const headers = {
    token: `Bearer ${token}`,
  };

  return await get(url, headers);
}

export async function savePlaceRequest(token, name, alias, placeId) {
  const url = buildUrl(
    ServerUrlConstants.ServerBaseUrl,
    ServerUrlConstants.SavedPlacesUrl,
    `${placeId}`
  );

  const headers = {
    token: `Bearer ${token}`,
  };

  const body = {
    name,
    place_alias: alias,
  };

  return await post(url, headers, body);
}

// editSavedPlaceRequest calls the server endpoint to edit the saved place
export async function editSavedPlaceRequest(token, name, alias, placeId) {
  const url = buildUrl(
    ServerUrlConstants.ServerBaseUrl,
    ServerUrlConstants.SavedPlacesUrl,
    `${placeId}`
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

// deleteSavedPlaceRequest calls the server endpoint to delete the saved place
export async function deleteSavedPlaceRequest(token, savedPlaceId) {
  const url = buildUrl(
    ServerUrlConstants.ServerBaseUrl,
    ServerUrlConstants.SavedPlacesUrl,
    `${savedPlaceId}`
  );

  const headers = {
    token: `Bearer ${token}`,
  };

  return await del(url, headers);
}

// getLastVisitedPlacesRequest calls the server endpoint to get the last visited places
export async function getLastVisitedPlacesRequest(token, numberOfResults) {
  const url = buildUrl(
    ServerUrlConstants.ServerBaseUrl,
    ServerUrlConstants.LastVisitedPlacesUrl,
    `${numberOfResults}`
  );

  const headers = {
    token: `Bearer ${token}`,
  };

  return await get(url, headers);
}

// searchPlacesRequest calls the server endpoint to search places
export async function searchPlacesRequest(query) {
  const url = buildUrl(
    ServerUrlConstants.ServerBaseUrl,
    ServerUrlConstants.SearchPlacesUrl,
    `${encodeURIComponent(query)}`
  );

  return await get(url);
}

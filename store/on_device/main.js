/**
 * This file holds interface methods for communicating with the on-device storage APIs.
 * It hides the implementation of the particular choice of on-device storage from the rest
 * of the application.
 * */

import { ConfigConstants } from "../../models/constants";
import {
  getItemsFromMongoStorage,
  setAppearanceDataInMongoStorage,
  setAuthItemInMongoStorage,
  setPrecisionDataInMongoStorage,
  unsetAuthItemInMongoStorage,
} from "./mongo_storage";
import {
  getItemsFromAsyncStorage,
  setAppearanceDataInAsyncStorage,
  setAuthItemInAsyncStorage,
  setPrecisionDataInAsyncStorage,
  unsetAuthItemInAsyncStorage,
} from "./async_storage";

// getItemsFromStorage retrieves all the on-device data from the storage of choice
export async function getItemsFromStorage(storage) {
  if (storage === ConfigConstants.MongoStorage) {
    return await getItemsFromMongoStorage();
  } else if (storage === ConfigConstants.AsyncStorage) {
    return await getItemsFromAsyncStorage();
  }
}

// setAuthDataInStorage sets the user authentication data in the storage of choice
export function setAuthDataInStorage(data, storage) {
  if (storage === ConfigConstants.MongoStorage) {
    setAuthItemInMongoStorage(data).then();
  } else if (storage === ConfigConstants.AsyncStorage) {
    setAuthItemInAsyncStorage(data).then();
  }
}

// unsetAuthDataInStorage unsets the user authentication data in the storage of choice
export function unsetAuthDataInStorage(storage) {
  if (storage === ConfigConstants.MongoStorage) {
    unsetAuthItemInMongoStorage().then();
  } else if (storage === ConfigConstants.AsyncStorage) {
    unsetAuthItemInAsyncStorage().then();
  }
}

// setAppearanceDataInStorage sets the user appearance data in the storage of choice
export function setAppearanceDataInStorage(appearance, storage) {
  if (storage === ConfigConstants.MongoStorage) {
    setAppearanceDataInMongoStorage(appearance).then();
  } else if (storage === ConfigConstants.AsyncStorage) {
    setAppearanceDataInAsyncStorage(appearance).then();
  }
}

// setPrecisionDataInStorage sets the user precision data in the storage of choice
export function setPrecisionDataInStorage(precision, storage) {
  if (storage === ConfigConstants.MongoStorage) {
    setPrecisionDataInMongoStorage(precision).then();
  } else if (storage === ConfigConstants.AsyncStorage) {
    setPrecisionDataInAsyncStorage(precision).then();
  }
}

import AsyncStorage from "@react-native-async-storage/async-storage";
import { ConfigConstants } from "../../models/constants";

// getItemFromAsyncStorage gets all data in the async storage
export async function getItemsFromAsyncStorage() {
  const [
    userId,
    firstName,
    lastName,
    email,
    displayName,
    phoneNumber,
    accessToken,
    refreshToken,
    appAppearance,
    appPrecision,
  ] = await Promise.all([
    AsyncStorage.getItem(ConfigConstants.StorageUserId),
    AsyncStorage.getItem(ConfigConstants.StorageUserFirstName),
    AsyncStorage.getItem(ConfigConstants.StorageUserLastName),
    AsyncStorage.getItem(ConfigConstants.StorageUserEmail),
    AsyncStorage.getItem(ConfigConstants.StorageUserDisplayName),
    AsyncStorage.getItem(ConfigConstants.StorageUserPhoneNumber),
    AsyncStorage.getItem(ConfigConstants.StorageAccessToken),
    AsyncStorage.getItem(ConfigConstants.StorageRefreshToken),
    AsyncStorage.getItem(ConfigConstants.StorageAppAppearance),
    AsyncStorage.getItem(ConfigConstants.StorageAppPrecision),
  ]);

  return {
    userId,
    firstName,
    lastName,
    email,
    displayName,
    phoneNumber,
    accessToken,
    refreshToken,
    appAppearance,
    appPrecision,
  };
}

// setAuthItemInAsyncStorage sets the user authentication data in the async storage
export async function setAuthItemInAsyncStorage(authItem) {
  await Promise.all([
    AsyncStorage.setItem(ConfigConstants.StorageUserId, authItem.userId),
    AsyncStorage.setItem(
      ConfigConstants.StorageUserFirstName,
      authItem.firstName
    ),
    AsyncStorage.setItem(
      ConfigConstants.StorageUserLastName,
      authItem.lastName
    ),
    AsyncStorage.setItem(ConfigConstants.StorageUserEmail, authItem.email),
    AsyncStorage.setItem(
      ConfigConstants.StorageUserDisplayName,
      authItem.displayName
    ),
    AsyncStorage.setItem(
      ConfigConstants.StorageUserPhoneNumber,
      authItem.phoneNumber
    ),
    AsyncStorage.setItem(
      ConfigConstants.StorageAccessToken,
      authItem.accessToken
    ),
    AsyncStorage.setItem(
      ConfigConstants.StorageRefreshToken,
      authItem.refreshToken
    ),
  ]);
}

// unsetAuthItemInAsyncStorage unsets all user authentication data in the async storage
export async function unsetAuthItemInAsyncStorage() {
  // set all the values to an empty string rather than deleting
  // to avoid attempting to add null values in the future
  await Promise.all([
    AsyncStorage.setItem(ConfigConstants.StorageUserId, ""),
    AsyncStorage.setItem(ConfigConstants.StorageUserFirstName, ""),
    AsyncStorage.setItem(ConfigConstants.StorageUserLastName, ""),
    AsyncStorage.setItem(ConfigConstants.StorageUserEmail, ""),
    AsyncStorage.setItem(ConfigConstants.StorageUserDisplayName, ""),
    AsyncStorage.setItem(ConfigConstants.StorageUserPhoneNumber, ""),
    AsyncStorage.setItem(ConfigConstants.StorageAccessToken, ""),
    AsyncStorage.setItem(ConfigConstants.StorageRefreshToken, ""),
  ]);
}

// setAppearanceDataInAsyncStorage sets the user appearance setting in the async storage
export async function setAppearanceDataInAsyncStorage(appearance) {
  await AsyncStorage.setItem(ConfigConstants.StorageAppAppearance, appearance);
}

// setPrecisionDataInAsyncStorage sets the user precision setting in the async storage
export async function setPrecisionDataInAsyncStorage(precision) {
  await AsyncStorage.setItem(ConfigConstants.StorageAppPrecision, precision);
}

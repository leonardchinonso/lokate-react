import AsyncStorage from "@react-native-async-storage/async-storage";
import { ConfigConstants } from "../../models/constants";

export async function getItemFromAsyncStorage() {
  const items = {
    userId: "",
    email: "",
    displayName: "",
    phoneNumber: "",
    accessToken: "",
    refreshToken: "",
    appAppearance: "",
    appPrecision: "",
  };

  const userId = await AsyncStorage.getItem(ConfigConstants.StorageUserId);
  const email = await AsyncStorage.getItem(ConfigConstants.StorageUserEmail);
  const displayName = await AsyncStorage.getItem(
    ConfigConstants.StorageUserDisplayName
  );
  const phoneNumber = await AsyncStorage.getItem(
    ConfigConstants.StorageUserPhoneNumber
  );
  const accessToken = await AsyncStorage.getItem(
    ConfigConstants.StorageAccessToken
  );
  const refreshToken = await AsyncStorage.getItem(
    ConfigConstants.StorageRefreshToken
  );
  const appAppearance = await AsyncStorage.getItem(
    ConfigConstants.StorageAppAppearance
  );
  const appPrecision = await AsyncStorage.getItem(
    ConfigConstants.StorageAppPrecision
  );

  // const [
  //   userId,
  //   email,
  //   displayName,
  //   phoneNumber,
  //   accessToken,
  //   refreshToken,
  //   appAppearance,
  //   appPrecision,
  // ] = await Promise.all([
  //   AsyncStorage.getItem(ConfigConstants.StorageUserId),
  //   AsyncStorage.getItem(ConfigConstants.StorageUserEmail),
  //   AsyncStorage.getItem(ConfigConstants.StorageUserDisplayName),
  //   AsyncStorage.getItem(ConfigConstants.StorageUserPhoneNumber),
  //   AsyncStorage.getItem(ConfigConstants.StorageAccessToken),
  //   AsyncStorage.getItem(ConfigConstants.StorageRefreshToken),
  //   AsyncStorage.getItem(ConfigConstants.StorageAppAppearance),
  //   AsyncStorage.getItem(ConfigConstants.StorageAppPrecision),
  // ]);

  items.userId = userId;
  items.email = email;
  items.displayName = displayName;
  items.phoneNumber = phoneNumber;
  items.accessToken = accessToken;
  items.refreshToken = refreshToken;
  items.appAppearance = appAppearance;
  items.appPrecision = appPrecision;

  return items;
}

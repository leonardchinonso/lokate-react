import AsyncStorage from "@react-native-async-storage/async-storage";

import { createContext, useState } from "react";
import { ConfigConstants } from "../../models/constants";

// AuthenticationContext is the context for storing auth information through application lifetime
export const AuthenticationContext = createContext({
  authData: {
    userId: "",
    userEmail: "",
    userDisplayName: "",
    userPhoneNumber: "",
    accessToken: "",
    refreshToken: "",
    isAuthenticated: false,
  },
  setAuthData: (data) => {},
  unSetAuthData: () => {},
});

// AuthenticationContextProvider is the provider component for the AuthenticationContext storage
function AuthenticationContextProvider({ children }) {
  const [data, setData] = useState({
    userId: "",
    userEmail: "",
    userDisplayName: "",
    userPhoneNumber: "",
    accessToken: "",
    refreshToken: "",
    isAuthenticated: false,
  });

  function setAuthData(data) {
    setData(() => {
      return {
        userId: data.userId,
        userEmail: data.userEmail,
        userDisplayName: data.userDisplayName,
        userPhoneNumber: data.userPhoneNumber,
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        isAuthenticated: true,
      };
    });

    AsyncStorage.setItem(ConfigConstants.StorageUserId, data.userId);
    AsyncStorage.setItem(ConfigConstants.StorageUserEmail, data.userEmail);
    AsyncStorage.setItem(
      ConfigConstants.StorageUserDisplayName,
      data.userDisplayName
    );
    AsyncStorage.setItem(
      ConfigConstants.StorageUserPhoneNumber,
      data.userPhoneNumber
    );
    AsyncStorage.setItem(ConfigConstants.StorageAccessToken, data.accessToken);
    AsyncStorage.setItem(
      ConfigConstants.StorageRefreshToken,
      data.refreshToken
    );
  }

  function unsetAuthData() {
    setData(() => {
      return {
        userId: "",
        userEmail: "",
        userDisplayName: "",
        userPhoneNumber: "",
        accessToken: "",
        refreshToken: "",
        isAuthenticated: false,
      };
    });
  }

  const value = {
    authData: {
      userId: data.userId,
      userEmail: data.userEmail,
      userDisplayName: data.userDisplayName,
      userPhoneNumber: data.userPhoneNumber,
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
      isAuthenticated: true,
    },
    setAuthData: setAuthData,
    unSetAuthData: unsetAuthData,
  };

  return (
    <AuthenticationContext.Provider value={value}>
      {children}
    </AuthenticationContext.Provider>
  );
}

export default AuthenticationContextProvider;

import { createContext, useState } from "react";
import { STORAGE } from "../../models/constants";
import {
  setAuthDataInStorage,
  unsetAuthDataInStorage,
} from "../on_device/main";

// AuthenticationContext is the context for storing auth information through application lifetime
export const AuthenticationContext = createContext({
  authData: {
    userId: "",
    userFirstName: "",
    userLastName: "",
    userEmail: "",
    userDisplayName: "",
    userPhoneNumber: "",
    accessToken: "",
    refreshToken: "",
    isAuthenticated: false,
  },
  setAuthData: (data, db) => {},
  unSetAuthData: () => {},
});

// AuthenticationContextProvider is the provider component for the AuthenticationContext storage
function AuthenticationContextProvider({ children }) {
  const [data, setData] = useState({
    userId: "",
    userFirstName: "",
    userLastName: "",
    userEmail: "",
    userDisplayName: "",
    userPhoneNumber: "",
    accessToken: "",
    refreshToken: "",
    isAuthenticated: false,
  });

  function setAuthData(data) {
    const accessToken = data.accessToken ? data.accessToken : "";
    const refreshToken = data.refreshToken ? data.refreshToken : "";

    setData(() => {
      return {
        userId: data.userId,
        userEmail: data.userEmail,
        userFirstName: data.userFirstName,
        userLastName: data.userLastName,
        userDisplayName: data.userDisplayName,
        userPhoneNumber: data.userPhoneNumber,
        accessToken: accessToken,
        refreshToken: refreshToken,
        isAuthenticated: !!accessToken,
      };
    });

    // build the item contract to set in the async storage
    const item = {
      userId: data.userId,
      firstName: data.userFirstName,
      lastName: data.userLastName,
      email: data.userEmail,
      displayName: data.userDisplayName,
      phoneNumber: data.userPhoneNumber ? data.userPhoneNumber : "",
      accessToken: accessToken,
      refreshToken: refreshToken,
    };

    setAuthDataInStorage(item, STORAGE);
  }

  function unsetAuthData() {
    setData(() => {
      return {
        userId: "",
        userEmail: "",
        userFirstName: "",
        userLastName: "",
        userDisplayName: "",
        userPhoneNumber: "",
        accessToken: "",
        refreshToken: "",
        isAuthenticated: false,
      };
    });

    unsetAuthDataInStorage(STORAGE);
  }

  const value = {
    authData: {
      userId: data.userId,
      userFirstName: data.userFirstName,
      userLastName: data.userLastName,
      userEmail: data.userEmail,
      userDisplayName: data.userDisplayName,
      userPhoneNumber: data.userPhoneNumber,
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
      isAuthenticated: data.isAuthenticated,
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

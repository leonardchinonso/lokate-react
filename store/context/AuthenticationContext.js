import AsyncStorage from "@react-native-async-storage/async-storage";

import { createContext, useState } from "react";
import { ConfigConstants } from "../../models/constants";

export const AuthenticationContext = createContext({
  authToken: "",
  isAuthenticated: false,
  setAuthToken: (tokenString) => {},
  unsetAuthToken: () => {},
});

function AuthenticationContextProvider({ children }) {
  const [token, setToken] = useState("");

  function setAuthToken(token) {
    setToken(token);
    AsyncStorage.setItem(ConfigConstants.StorageTokenKey, token).then();
  }

  function unsetAuthToken() {
    setToken("");
  }

  const value = {
    authToken: token,
    isAuthenticated: !!token,
    setAuthToken: setAuthToken,
    unsetAuthToken: unsetAuthToken,
  };

  return (
    <AuthenticationContext.Provider value={value}>
      {children}
    </AuthenticationContext.Provider>
  );
}

export default AuthenticationContextProvider;

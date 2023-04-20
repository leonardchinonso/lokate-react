import { createContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ConfigConstants } from "../../models/constants";

// CommsContext is the context for storing organization information through application lifetime
export const CommsContext = createContext({
  aboutText: "",
  setAboutText: (text) => {},
});

// CommsContextProvider is the provider component for the CommsContext storage
function CommsContextProvider({ children }) {
  const [data, setData] = useState("");

  function setAboutText(text) {
    setData(text);
    AsyncStorage.setItem(ConfigConstants.StorageAboutText, text);
  }

  const value = {
    aboutText: data,
    setAboutText: setAboutText,
  };

  return <CommsContextProvider value={value}>{children}</CommsContextProvider>;
}

export default CommsContextProvider;

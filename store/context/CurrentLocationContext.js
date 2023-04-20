import { createContext, useState } from "react";

export const CurrentLocationContext = createContext({
  location: {
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0,
    longitudeDelta: 0,
  },
  setLocation: (location) => {},
});

function CurrentLocationContextProvider({ children }) {
  const [loc, setLoc] = useState(null);

  function setLocation(location) {
    setLoc(() => {
      return {
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: location.latitudeDelta,
        longitudeDelta: location.longitudeDelta,
      };
    });
  }

  const value = {
    location: loc,
    setLocation: setLocation,
  };

  return (
    <CurrentLocationContext.Provider value={value}>
      {children}
    </CurrentLocationContext.Provider>
  );
}

export default CurrentLocationContextProvider;

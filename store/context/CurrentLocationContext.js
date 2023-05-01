import { createContext, useState } from "react";

// CurrentLocationContext holds the user's current location in a context
export const CurrentLocationContext = createContext({
  location: {
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0,
    longitudeDelta: 0,
  },
  setLocation: (location) => {},
});

// CurrentLocationContextProvider is a wrapper for the CurrentLocationContext
function CurrentLocationContextProvider({ children }) {
  // create a state to handle the location storage context
  const [loc, setLoc] = useState(null);

  // setLocation sets the location in the state
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

  // value is the prop to be set in the context
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

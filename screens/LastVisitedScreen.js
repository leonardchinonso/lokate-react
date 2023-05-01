import { Alert, FlatList, StyleSheet, View } from "react-native";
import Colors from "../styles/colors";
import { useContext, useEffect, useState } from "react";
import LastVisitedPlaceCard from "../components/ui/LastVisitedPlaceCard";
import { AuthenticationContext } from "../store/context/AuthenticationContext";
import { getLastVisitedPlaces } from "../services/placeService";
import { ConfigConstants, HttpStatusCodes } from "../models/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ErrorOverlay from "../components/ui/ErrorOverlay";

// LastVisitedScreen is the component for rendering the last visited places
function LastVisitedScreen() {
  // get the authentication context for auth information
  const authContext = useContext(AuthenticationContext);

  // create a state for the last visited places
  const [lastVisitedPlaces, setLastVisitedPlaces] = useState({
    places: [],
  });

  // create a state to handle unexpected errors
  const [error, setError] = useState("");

  // setLastVisitedPlacesHandler handles the setting of the last visited places state
  function setLastVisitedPlacesHandler(places) {
    setLastVisitedPlaces(() => {
      return {
        places: places,
      };
    });
  }

  // retrieveLastVisitedPlaces retrieves the last visited places from the service
  async function retrieveLastVisitedPlaces() {
    // get the last visited places from the savedPlaces service using the auth token
    const response = await getLastVisitedPlaces(
      authContext.authData.accessToken,
      10
    );

    // if it comes back with a server error, display the error view
    if (response.error) {
      setError(response.error);
      return;
    }

    // if the request comes back with a 401, log user out
    if (response.status === HttpStatusCodes.StatusUnauthorized) {
      authContext.unSetAuthData();
      AsyncStorage.removeItem(ConfigConstants.StorageAccessToken).then();
      AsyncStorage.removeItem(ConfigConstants.StorageRefreshToken).then();
      return;
    }

    // if the request comes back with a 400, show pop up
    if (response.status === HttpStatusCodes.StatusBadRequest) {
      Alert.alert("Invalid Request", response.message);
      return;
    }

    // if the request comes back with a 200
    if (response.status === HttpStatusCodes.StatusOk) {
      setLastVisitedPlacesHandler(response.lastVisitedPlaces);
    }
  }

  useEffect(() => {
    // make a call to retrieve the last visited places
    retrieveLastVisitedPlaces().then();

    // reset the useEffect cache
    return () => {};
  }, []);

  // dismissError dismisses the error view from screen
  function dismissError() {
    setError(null);
  }

  // if there is an error, show the error overlay
  if (error) {
    return <ErrorOverlay message={error} onConfirm={dismissError} />;
  }

  return (
    <View style={rootStyles.root}>
      <FlatList
        data={lastVisitedPlaces.places}
        renderItem={({ item }) => (
          <LastVisitedPlaceCard>{item.place}</LastVisitedPlaceCard>
        )}
      />
    </View>
  );
}

export default LastVisitedScreen;

// rootStyles is the style sheet for the main component
const rootStyles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.primaryWhite,
    paddingHorizontal: 14,
    width: "100%",
  },
});

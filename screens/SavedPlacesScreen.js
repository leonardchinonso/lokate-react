import { Alert, FlatList, StyleSheet, View } from "react-native";
import TextString from "../components/ui/TextString";
import SavedPlaceCard from "../components/ui/SavedPlaceCard";
import { useContext, useEffect, useState } from "react";
import { AuthenticationContext } from "../store/context/AuthenticationContext";
import { HttpStatusCodes } from "../models/constants";
import ErrorOverlay from "../components/ui/ErrorOverlay";
import { getSavedPlaces } from "../services/placeService";
import { SavedPlaceContext } from "../store/context/SavedPlaceContext";

// SavedPlacesScreen renders the list of saved places by a user
function SavedPlacesScreen({ route }) {
  // get the authentication context for auth information
  const authContext = useContext(AuthenticationContext);

  // get the savedPlaceContext for storing saved places on application lifetime
  const savedPlaceContext = useContext(SavedPlaceContext);

  // create state to hold the saved places and initialize it with the context
  const [savedPlaces, setSavedPlaces] = useState({
    places: savedPlaceContext.savedPlaces,
  });

  // create a state to hold unexpected errors
  const [error, setError] = useState("");

  // setPlacesHandler handles saving places to the state
  function setPlacesHandler(places) {
    setSavedPlaces(() => {
      return {
        places: places,
      };
    });
  }

  // retrieveSavedPlaces retrieves saved places from the service
  async function retrieveSavedPlaces() {
    // get the saved places from the savedPlaces service using the auth token
    const response = await getSavedPlaces(authContext.authData.accessToken);

    // if it comes back with a server error, display the error view
    if (response.error) {
      setError(response.error);
      return;
    }

    // if the request comes back with a 401, log user out
    if (response.status === HttpStatusCodes.StatusUnauthorized) {
      authContext.unSetAuthData();
      return;
    }

    // if the request comes back with a 400, show pop up
    if (response.status === HttpStatusCodes.StatusBadRequest) {
      Alert.alert("Invalid Request", response.message);
      return;
    }

    // if the request comes back with a 200
    if (response.status === HttpStatusCodes.StatusOk) {
      // use the savedPlaceContext to update the savedPlace state
      savedPlaceContext.setSavedPlaces(response.savedPlaces);
      setPlacesHandler(response.savedPlaces);
    }
  }

  useEffect(() => {
    // query the place service for the places
    retrieveSavedPlaces().then();

    // reset the useEffect cache
    return () => {};
  }, [route]);

  // dismissError dismisses the error overlay
  function dismissError() {
    setError(null);
  }

  // if there is an error, return the error view
  if (error) {
    return <ErrorOverlay message={error} onConfirm={dismissError} />;
  }

  return (
    <View style={rootStyles.root}>
      <>
        {savedPlaces.places.length === 0 ? (
          <View>
            <TextString>Save a place to see your saved places</TextString>
          </View>
        ) : (
          savedPlaces.places.length > 0 && (
            <FlatList
              data={savedPlaces.places}
              renderItem={({ item }) => <SavedPlaceCard>{item}</SavedPlaceCard>}
              keyExtractor={(item, index) => item.id}
            />
          )
        )}
      </>
    </View>
  );
}

export default SavedPlacesScreen;

// rootStyles is the style sheet for the main component
const rootStyles = StyleSheet.create({
  root: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 14,
  },
});

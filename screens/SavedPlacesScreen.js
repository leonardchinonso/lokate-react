import { Alert, FlatList, ScrollView, StyleSheet, View } from "react-native";

import Colors from "../styles/colors";
import TextString from "../components/ui/TextString";
import SavedPlaceCard from "../components/ui/SavedPlaceCard";
import { useContext, useEffect, useState } from "react";
import { AuthenticationContext } from "../store/context/AuthenticationContext";
import { ConfigConstants, HttpStatusCodes } from "../models/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ErrorOverlay from "../components/ui/ErrorOverlay";
import { getSavedPlaces } from "../services/placeService";
import { SavedPlaceContext } from "../store/context/SavedPlaceContext";

function SavedPlacesScreen({ route }) {
  const authContext = useContext(AuthenticationContext);
  const savedPlaceContext = useContext(SavedPlaceContext);

  const [savedPlaces, setSavedPlaces] = useState({
    places: savedPlaceContext.savedPlaces,
  });
  const [error, setError] = useState("");

  function placesHandler(places) {
    setSavedPlaces(() => {
      return {
        places: places,
      };
    });
  }

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
      AsyncStorage.removeItem(ConfigConstants.StorageAccessToken).then();
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
      placesHandler(response.savedPlaces);
    }
  }

  useEffect(() => {
    // query the place service for the places
    retrieveSavedPlaces();

    // reset the useEffect cache
    return () => {};
  }, [route]);

  function dismissError() {
    setError(null);
  }

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

const rootStyles = StyleSheet.create({
  root: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 14,
  },
});

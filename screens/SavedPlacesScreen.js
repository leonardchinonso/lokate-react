import { Alert, FlatList, StyleSheet, View } from "react-native";

import Colors from "../styles/colors";
import TextString from "../components/ui/TextString";
import SavedPlaceCard from "../components/ui/SavedPlaceCard";
import { useContext, useEffect, useState } from "react";
import { Header } from "../styles/text";
import PrimaryButton from "../components/ui/PrimaryButton";
import { AuthenticationContext } from "../store/context/AuthenticationContext";
import {
  ConfigConstants,
  HttpStatusCodes,
  ScreenNameConstants,
} from "../models/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ErrorOverlay from "../components/ui/ErrorOverlay";
import { useNavigation } from "@react-navigation/native";
import { getSavedPlaces } from "../services/placeService";
import { SavedPlaceContext } from "../store/context/SavedPlaceContext";

function SavedPlacesScreen() {
  const navigation = useNavigation();

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

  function addPlaceHandler() {
    navigation.navigate(ScreenNameConstants.AddSavedPlaceScreen);
  }

  async function retrieveSavedPlaces() {
    // get the saved places from the savedPlaces service using the auth token
    const response = await getSavedPlaces(authContext.authToken);

    // if it comes back with a server error, display the error view
    if (response.error) {
      setError(response.error);
      return;
    }

    // if the request comes back with a 401, log user out
    if (response.status === HttpStatusCodes.StatusUnauthorized) {
      authContext.unsetAuthToken();
      AsyncStorage.removeItem(ConfigConstants.StorageTokenKey).then();
      return;
    }

    // if the request comes back with a 400, show pop up
    if (response.status === HttpStatusCodes.StatusBadRequest) {
      Alert.alert("Invalid Request", response.message);
      return;
    }

    // if the request comes back with a 200
    if (response.status === HttpStatusCodes.StatusOk) {
      console.log("RESPONSE: ", response.savedPlaces);
      // use the savedPlaceContext to update the savedPlace state
      savedPlaceContext.setSavedPlaces(response.savedPlaces);
      placesHandler(response.savedPlaces);
    }
  }

  useEffect(() => {
    // query the place service for the places
    retrieveSavedPlaces();

    return () => {};
  }, []);

  function dismissError() {
    setError(null);
  }

  if (error) {
    return <ErrorOverlay message={error} onConfirm={dismissError} />;
  }

  return (
    <View style={rootStyles.root}>
      <View style={Header.container}>
        <TextString textStyle={Header.text}>Saved Places</TextString>
      </View>

      {savedPlaces.places.length === 0 && (
        <View>
          <TextString>Save a new place with the button below</TextString>
        </View>
      )}
      {savedPlaces.places.length > 0 && (
        <View style={savedPlacesStyles.container}>
          <FlatList
            data={savedPlaces.places}
            renderItem={({ item }) => (
              <View style={savedPlacesStyles.singleSavedPlace}>
                <SavedPlaceCard>{item}</SavedPlaceCard>
              </View>
            )}
          />
        </View>
      )}

      <View style={buttonGroupStyles.container}>
        <PrimaryButton onPress={addPlaceHandler}>NEW</PrimaryButton>
      </View>
    </View>
  );
}

export default SavedPlacesScreen;

const rootStyles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primaryGrey,
  },
});

const savedPlacesStyles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    position: "absolute",
    top: "20%",
    width: "80%",
  },
  singleSavedPlace: {
    marginVertical: "3%",
  },
});

const buttonGroupStyles = StyleSheet.create({
  container: {
    position: "absolute",
    top: "80%",
    height: "20%",
  },
});

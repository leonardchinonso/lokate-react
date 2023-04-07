import { FlatList, StyleSheet, Text, View } from "react-native";
import Colors from "../styles/colors";
import TextString from "../components/ui/TextString";
import SavedPlaceCard from "../components/ui/SavedPlaceCard";
import { useEffect, useState } from "react";
import savedPlaceCard from "../components/ui/SavedPlaceCard";
import { Header } from "../styles/text";

function SavedPlacesScreen() {
  const [savedPlaces, setSavedPlaces] = useState();

  useEffect(() => {
    setSavedPlaces(["Abbey Road", "Curzon Building", "Dale's End"]);
  }, []);

  return (
    <View style={rootStyles.root}>
      <View style={Header.container}>
        <TextString textStyle={Header.text}>Saved Places</TextString>
      </View>
      <View style={savedPlacesStyles.container}>
        <FlatList
          data={savedPlaces}
          renderItem={(itemData) => (
            <View style={savedPlacesStyles.singleSavedPlace}>
              <SavedPlaceCard>{itemData.item}</SavedPlaceCard>
            </View>
          )}
        />
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

const textStyles = StyleSheet.create({
  savedPlacesText: {
    color: Colors.primaryBlack,
    fontWeight: "bold",
    fontSize: 50,
  },
  savedPlacesContainer: {
    position: "absolute",
    top: "10%",
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

import { StyleSheet, Text, View } from "react-native";
import Colors from "../styles/colors";
import TextString from "../components/ui/TextString";
import SavedPlaceCard from "../components/ui/SavedPlaceCard";

function SavedPlacesScreen() {
  return (
    <View style={rootStyles.root}>
      <View style={textStyles.savedPlacesContainer}>
        <TextString textStyle={textStyles.savedPlacesText}>
          Saved Places
        </TextString>
      </View>
      <View style={cardGroupStyles.container}>
        <SavedPlaceCard />
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

const cardGroupStyles = StyleSheet.create({
  container: {
    position: "absolute",
    top: "30%",
    width: "80%",
  },
});

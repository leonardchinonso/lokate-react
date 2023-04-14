import { TouchableOpacity, View, StyleSheet } from "react-native";
import Colors from "../styles/colors";
import TextString from "../components/ui/TextString";
import { useState } from "react";
import SavedPlacesScreen from "./SavedPlacesScreen";
import LastVisitedScreen from "./LastVisitedScreen";

function PlacesScreen({ route }) {
  const [isSaved, setIsSaved] = useState(true);

  function onToggle() {
    setIsSaved(!isSaved);
  }

  return (
    <View style={rootStyles.container}>
      <View style={box.container}>
        <TouchableOpacity
          style={
            isSaved
              ? [box.buttonContainer, box.isActiveContainer]
              : box.buttonContainer
          }
          onPress={onToggle}
        >
          <TextString
            textStyle={
              isSaved ? [box.buttonText, box.isActiveButton] : box.buttonText
            }
          >
            Saved
          </TextString>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            !isSaved
              ? [box.buttonContainer, box.isActiveContainer]
              : box.buttonContainer
          }
          onPress={onToggle}
        >
          <TextString
            textStyle={
              !isSaved ? [box.buttonText, box.isActiveButton] : box.buttonText
            }
          >
            Last Visited
          </TextString>
        </TouchableOpacity>
      </View>
      <View style={content.container}>
        {isSaved ? <SavedPlacesScreen route={route} /> : <LastVisitedScreen />}
      </View>
    </View>
  );
}

export default PlacesScreen;

const rootStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primaryWhite,
    alignItems: "center",
  },
});

const box = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginTop: "2%",
    paddingVertical: "1%",
    paddingHorizontal: "0.2%",
    width: "70%",
    borderRadius: 18,
    backgroundColor: Colors.primaryWhite,
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: "10%",
    paddingVertical: "4%",
    backgroundColor: Colors.primaryWhite,
    borderRadius: 14,
    width: "48.5%",
  },
  isActiveContainer: {
    backgroundColor: Colors.primaryPurple,
  },
  isActiveButton: {
    color: Colors.primaryWhite,
  },
  buttonText: { color: Colors.primaryBlack, fontWeight: "normal" },
});

const content = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
});

import { Pressable, StyleSheet, View } from "react-native";
import ItemCard from "./ItemCard";
import TextString from "./TextString";
import { useNavigation } from "@react-navigation/native";
import {
  NavigatorNameConstants,
  ScreenNameConstants,
} from "../../models/constants";
import Colors from "../../styles/colors";
import { useContext } from "react";
import { RouteContext } from "../../store/context/RouteContext";
import { getIcon } from "../../utils/utils";

// SearchResultCard is the component of a single search card
function SearchResultCard({ action, children }) {
  // get the navigation hook instance for moving through components
  const navigation = useNavigation();

  // get the routeContext for using route information
  const routeContext = useContext(RouteContext);

  // onPress handles the event when the card is pressed
  function onPress() {
    // get the location from the parent component
    const location = {
      name: children.name,
      lon: children.longitude,
      lat: children.latitude,
      type: children.type,
    };

    // based on the parent component, carry out an action
    switch (action) {
      // if parent component is the start location screen
      case "start":
        // set the location as the start location in the routeContext
        routeContext.setStartLocation(location);
        // navigate to the end location screen
        navigation.navigate(NavigatorNameConstants.EndLocationNavigatorName);
        break;
      // if parent component is the end location screen
      case "end":
        // set the location as the end location in the routeContext
        routeContext.setEndLocation(location);
        // navigate to the journey result screen
        navigation.navigate(ScreenNameConstants.JourneyResultScreen);
        break;
      // do nothing
      default:
        return;
    }
  }

  return (
    <View>
      <Pressable
        style={({ pressed }) => pressed && imageGroupStyles.pressed}
        onPress={onPress}
      >
        <ItemCard customStyles={itemCardCustomStyles.container}>
          <TextString textStyle={{ color: Colors.primaryWhite }}>
            {children.name}
          </TextString>
          <View style={imageGroupStyles.container}>
            {getIcon(children.type)}
          </View>
        </ItemCard>
      </Pressable>
    </View>
  );
}

export default SearchResultCard;

// imageGroupStyles is the style sheet for the images
const imageGroupStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: "5%",
  },
  pressed: {
    opacity: 0.5,
  },
});

// itemCardCustomStyles is the style sheet for an item card
const itemCardCustomStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    backgroundColor: Colors.primaryPurpleOp,
    paddingVertical: "5%",
  },
});

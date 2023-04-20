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

function SearchResultCard({ action, children }) {
  const navigation = useNavigation();

  const routeContext = useContext(RouteContext);

  function onPress() {
    const location = {
      name: children.name,
      lon: children.longitude,
      lat: children.latitude,
      type: children.type,
    };

    if (action === "start") {
      routeContext.setStartLocation(location);
      navigation.navigate(NavigatorNameConstants.EndLocationNavigatorName);
    } else if (action === "end") {
      routeContext.setEndLocation(location);
      navigation.navigate(ScreenNameConstants.JourneyResultScreen);
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

const itemCardCustomStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    backgroundColor: Colors.primaryPurpleOp,
    paddingVertical: "5%",
  },
});

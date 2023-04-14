import { Pressable, StyleSheet, View } from "react-native";
import ItemCard from "./ItemCard";
import TextString from "./TextString";
import { useNavigation } from "@react-navigation/native";
import { ScreenNameConstants } from "../../models/constants";
import {
  FontAwesome,
  FontAwesome5,
  Fontisto,
  MaterialIcons,
} from "@expo/vector-icons";
import Colors from "../../styles/colors";
import { useContext } from "react";
import { RouteContext } from "../../store/context/RouteContext";

function getIcon(type) {
  switch (type) {
    case "train_station":
      return (
        <FontAwesome5 name="train" size={24} color={Colors.primaryWhite} />
      );
    case "settlement":
      return <FontAwesome name="home" size={24} color={Colors.primaryWhite} />;
    case "bus_stop":
      return (
        <FontAwesome5 name="bus-alt" size={24} color={Colors.primaryWhite} />
      );
    case "street":
      return <FontAwesome5 name="road" size={24} color={Colors.primaryWhite} />;
    case "tram_stop":
      return <FontAwesome5 name="tram" size={24} color={Colors.primaryWhite} />;
    case "tube_station":
      return <Fontisto name="subway" size={24} color={Colors.primaryWhite} />;
    default:
      return (
        <MaterialIcons name="place" size={24} color={Colors.primaryWhite} />
      );
  }
}

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
      navigation.navigate(ScreenNameConstants.PickEndLocationScreenName);
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
  },
});

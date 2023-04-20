import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ItemCard from "./ItemCard";
import TextString from "./TextString";
import { useNavigation } from "@react-navigation/native";
import {
  NavigatorNameConstants,
  ScreenNameConstants,
} from "../../models/constants";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import Colors from "../../styles/colors";
import { getIcon } from "../../utils/utils";

function SavedPlaceCard({ children }) {
  const navigation = useNavigation();

  function onEdit() {
    navigation.navigate(NavigatorNameConstants.PlacesNavigatorName, {
      screen: ScreenNameConstants.EditSavedPlaceScreen,
      savedPlaceId: children.id,
      formerName: children.name,
    });
  }

  function onDelete() {
    console.log("UNIMPLEMENTED!");
  }

  return (
    <ItemCard customStyles={itemCardCustomStyles.container}>
      <View>{getIcon(children.place_alias)}</View>
      <TextString
        textStyle={{ fontWeight: "normal", color: Colors.primaryWhite }}
      >
        {children.name}
      </TextString>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <TouchableOpacity onPress={onEdit} style={{ paddingRight: "3%" }}>
          <TextString
            textStyle={{ color: Colors.primaryWhite, fontWeight: "normal" }}
          >
            Edit
          </TextString>
        </TouchableOpacity>
        <TouchableOpacity onPress={onDelete} style={{ paddingLeft: "3%" }}>
          <TextString
            textStyle={{ color: Colors.primaryWhite, fontWeight: "normal" }}
          >
            Delete
          </TextString>
        </TouchableOpacity>
      </View>
    </ItemCard>
  );
}

export default SavedPlaceCard;

const itemCardCustomStyles = StyleSheet.create({
  container: {
    marginVertical: "2%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: "5%",
    backgroundColor: Colors.primaryPurple,
    alignItems: "center",
    paddingVertical: "5%",
  },
});

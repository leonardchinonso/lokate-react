import { StyleSheet, TouchableOpacity } from "react-native";
import ItemCard from "./ItemCard";
import TextString from "./TextString";
import { useNavigation } from "@react-navigation/native";
import { ScreenNameConstants } from "../../models/constants";
import Colors from "../../styles/colors";

function LastVisitedCard({ children }) {
  const navigation = useNavigation();

  function onAdd() {
    navigation.navigate(ScreenNameConstants.AddSavedPlaceScreen, {
      placeId: children.id,
      formerName: children.name,
    });
  }

  return (
    <ItemCard customStyles={itemCardCustomStyles.container}>
      <TextString textStyle={{ color: Colors.primaryWhite }}>
        {children.name}
      </TextString>
      <TouchableOpacity onPress={onAdd}>
        <TextString textStyle={{ color: Colors.primaryWhite }}>Save</TextString>
      </TouchableOpacity>
    </ItemCard>
  );
}

export default LastVisitedCard;

const itemCardCustomStyles = StyleSheet.create({
  container: {
    marginVertical: "2%",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: Colors.primaryPurple,
    paddingHorizontal: "5%",
    paddingVertical: "5%",
  },
});

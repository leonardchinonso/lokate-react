import { StyleSheet, TouchableOpacity } from "react-native";
import ItemCard from "./ItemCard";
import TextString from "./TextString";
import { useNavigation } from "@react-navigation/native";
import { ScreenNameConstants } from "../../models/constants";
import Colors from "../../styles/colors";

// LastVisitedCard is the component for holding a single last visited place
function LastVisitedCard({ children }) {
  // get the navigation hook to route to another component
  const navigation = useNavigation();

  // onAdd is a function to handle saving a place
  function onAdd() {
    navigation.navigate(ScreenNameConstants.AddSavedPlaceScreen, {
      placeId: children.id,
      formerName: children.name,
    });
  }

  return (
    <ItemCard customStyles={styles.container}>
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

// style sheet for the component
const styles = StyleSheet.create({
  container: {
    marginVertical: "2%",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: Colors.primaryPurple,
    paddingHorizontal: "5%",
    paddingVertical: "5%",
  },
});

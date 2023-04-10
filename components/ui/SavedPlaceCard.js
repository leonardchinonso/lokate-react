import { Image, Pressable, StyleSheet, View } from "react-native";
import ItemCard from "./ItemCard";
import TextString from "./TextString";
import { useNavigation } from "@react-navigation/native";
import { ScreenNameConstants } from "../../models/constants";

function SavedPlaceCard({ children }) {
  const navigation = useNavigation();

  return (
    <View>
      <ItemCard customStyles={itemCardCustomStyles.container}>
        <View style={textStyles.container}>
          <TextString textStyle={{ fontSize: 20 }}>{children.name}</TextString>
        </View>
        <View style={imageGroupStyles.container}>
          <Pressable
            style={({ pressed }) => (pressed ? imageGroupStyles.pressed : null)}
            onPress={() =>
              navigation.navigate(ScreenNameConstants.EditSavedPlaceScreen, {
                savedPlaceId: children.id,
              })
            }
          >
            <Image
              style={imageGroupStyles.image}
              source={require("../../assets/images/edit_icon.png")}
            />
          </Pressable>
          <Pressable
            style={({ pressed }) => (pressed ? imageGroupStyles.pressed : null)}
            // onPress={}
          >
            <Image
              style={imageGroupStyles.image}
              source={require("../../assets/images/delete_icon.png")}
            />
          </Pressable>
        </View>
      </ItemCard>
    </View>
  );
}

export default SavedPlaceCard;

const textStyles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    alignItems: "center",
  },
});

const imageGroupStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    width: "20%",
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
  },
});

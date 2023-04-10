import { Pressable, StyleSheet, View } from "react-native";
import ItemCard from "./ItemCard";
import TextString from "./TextString";
import { useNavigation } from "@react-navigation/native";
import { ScreenNameConstants } from "../../models/constants";
import { AntDesign } from "@expo/vector-icons";

function SavedPlaceCard({ children }) {
  const navigation = useNavigation();

  return (
    <View>
      <ItemCard customStyles={itemCardCustomStyles.container}>
        <TextString>{children}</TextString>
        <View style={imageGroupStyles.container}>
          <Pressable
            style={({ pressed }) => pressed && imageGroupStyles.pressed}
            onPress={() =>
              navigation.navigate(ScreenNameConstants.AddSavedPlaceScreen)
            }
          >
            <AntDesign name="pluscircleo" size={24} color="black" />
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
  },
});

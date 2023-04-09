import { FlatList, StyleSheet, View } from "react-native";
import TextString from "../components/ui/TextString";
import { Header } from "../styles/text";
import Colors from "../styles/colors";
import SavedPlaceCard from "../components/ui/SavedPlaceCard";
import { useEffect, useState } from "react";
import ItemCard from "../components/ui/ItemCard";

function LastVisitedScreen() {
  const [lastVisitedPlaces, setLastVisitedPlaces] = useState([]);

  useEffect(() => {
    setLastVisitedPlaces(["Bull Ring", "Birmingham New Street", "Fenty Road"]);
  }, []);

  return (
    <View style={rootStyles.root}>
      <View style={Header.container}>
        <TextString textStyle={{ ...Header.text, fontSize: 45 }}>
          Last Visited Places
        </TextString>
      </View>
      <View style={lastVisitedPlaceStyle.container}>
        <FlatList
          data={lastVisitedPlaces}
          renderItem={(itemData) => (
            <View style={lastVisitedPlaceStyle.singleLastVisitedPlace}>
              <ItemCard>
                <TextString>{itemData.item}</TextString>
              </ItemCard>
            </View>
          )}
        />
      </View>
    </View>
  );
}

export default LastVisitedScreen;

const rootStyles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primaryGrey,
  },
});

const lastVisitedPlaceStyle = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    position: "absolute",
    top: "20%",
    width: "80%",
  },
  singleLastVisitedPlace: {
    marginVertical: "3%",
  },
});

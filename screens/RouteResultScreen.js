import { FlatList, StyleSheet, View } from "react-native";
import { Header } from "../styles/text";
import TextString from "../components/ui/TextString";
import Colors from "../styles/colors";
import JourneyCard from "../components/ui/JourneyCard";
import { useEffect, useState } from "react";
import {
  GetMinutesFromColonTimeFormat,
  GetTimeInMeridian,
} from "../utils/utils";
import JourneyDescriptionCard from "../components/ui/JourneyDescriptionCard";

function RouteResultScreen({ routeData }) {
  const [transportModes, setTransportModes] = useState([]);
  const [routeParts, setRouteParts] = useState([]);

  let parts = routeData.route_parts;

  useEffect(() => {
    handleSetTransportModes();
    handleSetRouteParts();
  }, []);

  function handleSetRouteParts() {
    let details = [];
    for (let route of parts) {
      let detail = {
        transportMode: route.mode,
        transportDuration: GetMinutesFromColonTimeFormat(route.duration),
        toPointName: route.to_point_name,
        departsAt: GetTimeInMeridian(route.departure_time),
      };
      details.push(detail);
    }
    setRouteParts(details);
  }

  function handleSetTransportModes() {
    let modes = [];
    for (let route of parts) {
      modes.push(route.mode);
    }
    setTransportModes(modes);
  }

  return (
    <View style={rootStyles.rootContainer}>
      <View style={Header.container}>
        <TextString textStyle={Header.text}>Go Somewhere</TextString>
      </View>

      <View style={mainResult.container}>
        <JourneyCard
          transportModes={transportModes}
          journeyTime={
            GetMinutesFromColonTimeFormat(routeData.duration) + " mins"
          }
        />
      </View>

      <View style={resultDescriptionStyles.container}>
        <FlatList
          data={routeParts}
          renderItem={(itemData) => (
            <View style={{ marginVertical: "3%" }}>
              <JourneyDescriptionCard
                transportMode={itemData.item.transportMode}
                departsAt={itemData.item.departsAt}
                toPointName={itemData.item.toPointName}
                transportDuration={itemData.item.transportDuration}
              />
            </View>
          )}
        />
      </View>
    </View>
  );
}

export default RouteResultScreen;

const rootStyles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primaryGrey,
  },
});

const mainResult = StyleSheet.create({
  container: {
    width: "80%",
    position: "absolute",
    top: "20%",
  },
});

const resultDescriptionStyles = StyleSheet.create({
  container: {
    width: "80%",
    position: "absolute",
    top: "40%",
  },
});

import { FlatList, SafeAreaView, StyleSheet, View } from "react-native";
import Colors from "../styles/colors";
import JourneyCard from "../components/ui/JourneyCard";
import { useContext, useEffect, useState } from "react";
import { getHoursAndMinutes, getTimeInMeridian } from "../utils/utils";
import JourneyDescriptionCard from "../components/ui/JourneyDescriptionCard";
import { transportModeConversionMap } from "../services/journeyService";
import { RouteContext } from "../store/context/RouteContext";
import TextString from "../components/ui/TextString";
import { Header } from "../styles/text";

function RouteResultScreen({ route }) {
  const { singleRoute, transportModes, journeyTime } = route.params;

  const routeContext = useContext(RouteContext);

  const [routeParts, setRouteParts] = useState([]);

  let parts = singleRoute.route_parts;

  useEffect(() => {
    // handleSetTransportModes();
    handleSetRouteParts();
  }, []);

  function handleSetRouteParts() {
    let details = [];
    for (let part of parts) {
      let detail = {
        transportMode: transportModeConversionMap[part.mode],
        transportDuration: getHoursAndMinutes(part.duration),
        toPointName: part.to_point_name,
        departsAt: getTimeInMeridian(part.departure_time),
      };
      details.push(detail);
    }
    setRouteParts(details);
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={rootStyles.rootContainer}>
        <View style={{ marginTop: "5%" }}>
          <TextString textStyle={Header.text}>
            {routeContext.startLocation.name} to {routeContext.endLocation.name}
          </TextString>
        </View>

        <View style={mainResult.container}>
          <JourneyCard
            transportModes={transportModes}
            journeyTime={journeyTime}
            pressable={false}
          />
        </View>

        <View style={resultDescriptionStyles.container}>
          <FlatList
            data={routeParts}
            renderItem={({ item }) => (
              <JourneyDescriptionCard
                transportMode={item.transportMode}
                departsAt={item.departsAt}
                toPointName={item.toPointName}
                transportDuration={item.transportDuration}
              />
            )}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

export default RouteResultScreen;

const rootStyles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Colors.primaryWhite,
    paddingHorizontal: 14,
  },
});

const mainResult = StyleSheet.create({
  container: {
    marginTop: "3%",
    width: "100%",
  },
});

const resultDescriptionStyles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: "20%",
  },
});

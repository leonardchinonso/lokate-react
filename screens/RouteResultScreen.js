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

// RouteResultScreen renders the results of the routes
function RouteResultScreen({ route }) {
  // get the routeContext to retrieve the start and end locations
  const routeContext = useContext(RouteContext);

  // get the route dependencies from the routes
  const { singleRoute, transportModes, journeyTime } = route.params;

  // create a state for the route parts
  const [routeParts, setRouteParts] = useState([]);

  // setRoutePartsHandler handles setting the route parts in the state
  function setRoutePartsHandler() {
    let details = [];
    // for each route in the route parts
    for (let part of singleRoute.route_parts) {
      // create a route detail with the transport mode, destination name, departure time and duration
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

  useEffect(() => {
    // call the setRoutePartsHandler to handle setting the routes
    setRoutePartsHandler();
  }, []);

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

// rootStyles is the style sheet for the main component
const rootStyles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Colors.primaryWhite,
    paddingHorizontal: 14,
  },
});

// mainResult is the style sheet for the result list
const mainResult = StyleSheet.create({
  container: {
    marginTop: "3%",
    width: "100%",
  },
});

// resultDescriptionStyles is the style for the result description cards
const resultDescriptionStyles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: "20%",
  },
});

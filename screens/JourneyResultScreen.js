import {
  Alert,
  FlatList,
  SafeAreaView,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import Colors from "../styles/colors";
import TextInputBox from "../components/ui/TextInputBox";
import { useContext, useEffect, useState } from "react";
import JourneyCard from "../components/ui/JourneyCard";
import { RouteContext } from "../store/context/RouteContext";
import { HttpStatusCodes, ScreenNameConstants } from "../models/constants";
import { getJourney, formatRouteData } from "../services/journeyService";
import ErrorOverlay from "../components/ui/ErrorOverlay";
import { useNavigation } from "@react-navigation/native";
import LoadingOverlay from "../components/ui/LoadingOverlay";

// JourneyResultScreen is the component for rendering journey results
function JourneyResultScreen() {
  // get the navigation hook instance for moving through components
  const navigation = useNavigation();

  // get the route context to use stored route data
  const routeContext = useContext(RouteContext);

  // get the start and end locations from the route context
  const { startLocation, endLocation } = routeContext;

  // create a state to monitor the loading state of the app
  const [isLoading, setIsLoading] = useState(true);

  // create a state to manage the route information
  const [routesData, setRoutes] = useState({
    routes: [],
  });

  // create an error state to manage unexpected errors
  const [error, setError] = useState("");

  // setRoutesHandler sets the route information
  function setRoutesHandler(routes) {
    setRoutes(() => {
      return {
        routes: routes,
      };
    });
  }

  // onSelectRoute handles clicking on a single route item
  function onSelectRoute(route) {
    // navigate to the route result screen of the selected route
    navigation.navigate(ScreenNameConstants.RouteResultScreenName, {
      singleRoute: route,
      transportModes: route.transportModes,
      journeyTime: route.journeyTime,
    });
  }

  // retrieveJourney retrieves a journey given the start and end locations
  async function retrieveJourney(startLocation, endLocation) {
    // get the journey results from the journeyService
    const response = await getJourney(startLocation, endLocation);

    // if it comes back with a server error, display the error view
    if (response.error) {
      setError(response.error);
      return;
    }

    // if the request comes back with a 400, show pop up
    if (response.status === HttpStatusCodes.StatusBadRequest) {
      Alert.alert("Invalid Request", response.message);
      return;
    }

    // if the request comes back with a 200
    if (response.status === HttpStatusCodes.StatusOk) {
      // clean up the route data
      let routes = formatRouteData(response.journeyResults.routes);
      // set the routes in the state
      setRoutesHandler(routes);
    }
  }

  useEffect(() => {
    // query the journey service for the journey results between the points
    retrieveJourney(routeContext.startLocation, routeContext.endLocation).then(
      () => {
        // set the loading state to false when result is returned
        setIsLoading(false);
      }
    );

    // reset the useEffect cache
    return () => {};
  }, []);

  // if the loading state is true, show the loading overlay
  if (isLoading) {
    return <LoadingOverlay />;
  }

  // dismissError dismisses the error overlay
  function dismissError() {
    setError(null);
  }

  // if there is an error, show the loading overlay
  if (error) {
    return <ErrorOverlay message={error} onConfirm={dismissError} />;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={rootStyles.rootContainer}>
        <View style={{ marginBottom: "20%" }}>
          <TextInputBox
            editable={false}
            placeholder={startLocation.name}
            contentType={"none"}
            keyboardType={"default"}
            inputStyle={{ backgroundColor: Colors.almostWhite }}
            containerStyle={{ marginTop: "10%", marginBottom: "3%" }}
          ></TextInputBox>
          <TextInputBox
            editable={false}
            placeholder={endLocation.name}
            contentType={"none"}
            keyboardType={"default"}
            inputStyle={{ backgroundColor: Colors.almostWhite }}
          ></TextInputBox>
        </View>
        <View>
          <FlatList
            data={routesData.routes}
            renderItem={(itemData) => (
              <View style={journeyGroupStyles.journeyCard}>
                <Pressable
                  style={({ pressed }) =>
                    pressed ? journeyGroupStyles.pressed : null
                  }
                  onPress={onSelectRoute.bind(this, itemData.item)}
                >
                  <JourneyCard
                    transportModes={itemData.item.transportModes}
                    journeyTime={itemData.item.journeyTime}
                  />
                </Pressable>
              </View>
            )}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

export default JourneyResultScreen;

// rootStyles is the style sheet for the main component
const rootStyles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    paddingHorizontal: 14,
    backgroundColor: Colors.primaryWhite,
  },
});

// journeyGroupStyles is the style sheet for the journey routes
const journeyGroupStyles = StyleSheet.create({
  journeyCard: {
    marginVertical: "4%",
  },
  pressed: {
    opacity: 0.5,
  },
});

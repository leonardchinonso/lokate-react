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
import { getJourney, modifyRouteInfo } from "../services/journeyService";
import ErrorOverlay from "../components/ui/ErrorOverlay";
import { useNavigation } from "@react-navigation/native";
import LoadingOverlay from "../components/ui/LoadingOverlay";

function JourneyResultScreen() {
  const routeContext = useContext(RouteContext);
  const startLocation = routeContext.startLocation;
  const endLocation = routeContext.endLocation;

  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(true);
  const [routesData, setRoutes] = useState({
    routes: [],
  });
  const [error, setError] = useState("");

  function setRoutesHandler(routes) {
    setRoutes(() => {
      return {
        routes: routes,
      };
    });
  }

  function onSelectRoute(route) {
    navigation.navigate(ScreenNameConstants.RouteResultScreenName, {
      singleRoute: route,
      transportModes: route.transportModes,
      journeyTime: route.journeyTime,
    });
  }

  async function retrieveJourney(startLocation, endLocation) {
    // get the journey results from the journeyService
    const response = await getJourney(startLocation, endLocation);
    // const response = {};

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
      let routes = modifyRouteInfo(response.journeyResults.routes);
      setRoutesHandler(routes);
    }
  }

  useEffect(() => {
    // query the journey service for the journey results between the points
    retrieveJourney(routeContext.startLocation, routeContext.endLocation).then(
      () => {
        setIsLoading(false);
      }
    );

    // reset the useEffect cache
    return () => {};
  }, []);

  if (isLoading) {
    return <LoadingOverlay />;
  }

  function dismissError() {
    setError(null);
  }

  if (error) {
    return <ErrorOverlay message={error} onConfirm={dismissError} />;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={rootStyles.rootContainer}>
        <View style={textBoxStyles.container}>
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

const rootStyles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    paddingHorizontal: 14,
    backgroundColor: Colors.primaryWhite,
  },
});

const textBoxStyles = StyleSheet.create({
  container: {
    marginBottom: "20%",
  },
});

const journeyGroupStyles = StyleSheet.create({
  journeyCard: {
    marginVertical: "4%",
  },
  pressed: {
    opacity: 0.5,
  },
});

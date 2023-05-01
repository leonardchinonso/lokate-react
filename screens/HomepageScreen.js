import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { NavigatorNameConstants } from "../models/constants";
import MapView, { Callout, Circle, Marker } from "react-native-maps";
import PrimaryButton from "../components/ui/PrimaryButton";
import { useContext, useState } from "react";
import ErrorOverlay from "../components/ui/ErrorOverlay";
import { CurrentLocationContext } from "../store/context/CurrentLocationContext";
import Colors from "../styles/colors";

// HomepageScreen is the component for rendering the homepage
function HomepageScreen({ navigation }) {
  // get the location context
  const currentLocationContext = useContext(CurrentLocationContext);

  // create a state to store unexpected error
  const [error, setError] = useState("");

  // get the stored location in the user current context
  const { location } = currentLocationContext;

  // goSomewhereHandler navigates to the goSomewhere page
  function goSomewhereHandler() {
    navigation.navigate(NavigatorNameConstants.StartLocationNavigatorName);
  }

  // dismissError dismisses the error overlay
  function dismissError() {
    setError(null);
  }

  // if there is an unexpected error, show the error overlay
  if (error) {
    return <ErrorOverlay message={error} onConfirm={dismissError} />;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={rootStyles.container}>
        <MapView
          style={mapStyles.map}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.004757,
            longitudeDelta: 0.006866,
          }}
        >
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            pinColor={Colors.primaryPurple}
          >
            <Callout>
              <Text>You are here</Text>
            </Callout>
          </Marker>
          <Circle
            center={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            radius={1000}
          />
        </MapView>
        <View
          style={{
            position: "absolute",
            marginHorizontal: 20,
            width: "90%",
            height: 100,
          }}
        >
          <PrimaryButton onPress={goSomewhereHandler}>
            GO SOMEWHERE
          </PrimaryButton>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default HomepageScreen;

// rootStyles is the style sheet for the main view
const rootStyles = StyleSheet.create({
  container: {
    justifyContent: "flex-end",
  },
});

// mapStyles is the style sheet for the map view
const mapStyles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
});

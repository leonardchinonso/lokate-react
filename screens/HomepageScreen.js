import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { ScreenNameConstants } from "../models/constants";
import MapView, { Callout, Circle, Marker } from "react-native-maps";
import PrimaryButton from "../components/ui/PrimaryButton";
import { useContext, useState } from "react";
import ErrorOverlay from "../components/ui/ErrorOverlay";
import { CurrentLocationContext } from "../store/context/CurrentLocationContext";
import Colors from "../styles/colors";

function HomepageScreen({ navigation }) {
  const currentLocationContext = useContext(CurrentLocationContext);

  const [location, setLocation] = useState(currentLocationContext.location);
  const [error, setError] = useState("");

  function goSomewhereHandler() {
    navigation.navigate(ScreenNameConstants.PickStartLocationScreenName);
  }

  function dismissError() {
    setError(null);
  }

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
            bottom: "6%",
            marginHorizontal: 20,
            width: "90%",
            height: 70,
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

const rootStyles = StyleSheet.create({
  container: {
    justifyContent: "flex-end",
  },
});

const mapStyles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
});

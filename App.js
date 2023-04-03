import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import Colors from "./styles/colors";
import SplashScreen from "./screens/SplashScreen";
import LoginScreen from "./screens/LoginScreen";
import { useEffect } from "react";
import SignupScreen from "./screens/SignupScreen";
import HomepageScreen from "./screens/HomepageScreen";
import PickStartLocationScreen from "./screens/PickStartLocationScreen";

export default function App() {
  useEffect(() => {});

  return (
    <View style={styles.rootContainer}>
      {/*<SplashScreen />*/}
      {/*<LoginScreen />*/}
      {/*<SignupScreen />*/}
      {/*<HomepageScreen />*/}
      <PickStartLocationScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: Colors.primaryLightBlue,
  },
});

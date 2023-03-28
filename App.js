import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import PrimaryButton from "./components/ui/PrimaryButton";
import Colors from "./styles/colors";
import SplashScreen from "./screens/SplashScreen";
import LoginScreen from "./screens/LoginScreen";
import { useEffect } from "react";

export default function App() {
  useEffect(() => {});

  return (
    <View style={styles.rootContainer}>
      <SafeAreaView style={styles.rootContainer}>
        {/*<SplashScreen />*/}
        <LoginScreen />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: Colors.primaryLightBlue,
  },
});

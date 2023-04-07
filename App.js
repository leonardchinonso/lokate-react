import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import Colors from "./styles/colors";
import SplashScreen from "./screens/SplashScreen";
import LoginScreen from "./screens/LoginScreen";
import { useEffect } from "react";
import SignupScreen from "./screens/SignupScreen";
import HomepageScreen from "./screens/HomepageScreen";
import PickStartLocationScreen from "./screens/PickStartLocationScreen";
import SavedPlacesScreen from "./screens/SavedPlacesScreen";
import EditPlaceScreen from "./screens/EditPlaceScreen";
import AddPlaceScreen from "./screens/AddPlaceScreen";
import ProfileScreen from "./screens/ProfileScreen";
import EditProfileScreen from "./screens/EditProfileScreen";
import SettingsScreen from "./screens/SettingsScreen";
import PickEndLocationScreen from "./screens/PickEndLocationScreen";
import ContactUsScreen from "./screens/ContactUsScreen";
import AboutScreen from "./screens/AboutScreen";
import LogoutScreen from "./screens/LogoutScreen";

export default function App() {
  useEffect(() => {});

  return (
    <View style={styles.rootContainer}>
      {/*<SplashScreen />*/}
      {/*<LoginScreen />*/}
      {/*<SignupScreen />*/}
      {/*<HomepageScreen />*/}
      {/*<PickStartLocationScreen />*/}
      {/*<PickEndLocationScreen />*/}
      {/*<SavedPlacesScreen />*/}
      {/*<EditPlaceScreen />*/}
      <AddPlaceScreen />
      {/*<ProfileScreen />*/}
      {/*<EditProfileScreen />*/}
      {/*<SettingsScreen />*/}
      {/*<ContactUsScreen />*/}
      {/*<AboutScreen />*/}
      {/*<LogoutScreen />*/}
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: Colors.primaryLightBlue,
  },
});

import {
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import PrimaryButton from "../components/ui/PrimaryButton";
import { useNavigation } from "@react-navigation/native";
import { ScreenNameConstants } from "../models/constants";
import Colors from "../styles/colors";
import TextString from "../components/ui/TextString";

// WelcomeScreen renders the welcome screen.
// It is the landing page screen
function WelcomeScreen() {
  // get the navigation hook instance for moving through components
  const navigation = useNavigation();

  // goToSignup navigates the user to the signup page
  function goToSignup() {
    navigation.navigate(ScreenNameConstants.SignupScreenName);
  }

  // goToLogin navigates the user to the login page
  function goToLogin() {
    navigation.navigate(ScreenNameConstants.LoginScreenName);
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={rootStyles.container}>
        <TextString
          textStyle={{
            color: Colors.almostBlack,
            fontSize: 40,
            fontWeight: "bold",
            marginTop: "5%",
          }}
        >
          Welcome
        </TextString>
        <View style={imageStyles.container}>
          <Image
            style={{ width: "100%", height: undefined, aspectRatio: 1 }}
            source={require("../assets/images/welcome_page_illustration.jpg")}
          />
        </View>
        <View style={{ marginTop: "40%" }}>
          <TextString>
            Create an account to get started with awesome navigation
          </TextString>
        </View>
        <PrimaryButton onPress={goToSignup}>Get Started</PrimaryButton>
        <TouchableOpacity onPress={goToLogin}>
          <TextString textStyle={{ color: Colors.primaryPurple }}>
            Already have an account? Login
          </TextString>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default WelcomeScreen;

// rootStyles is the style sheet for the main component
const rootStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primaryWhite,
    paddingHorizontal: 14,
  },
});

// imageStyles is the style sheet for the image component
const imageStyles = StyleSheet.create({
  container: {
    marginTop: "10%",
    justifyContent: "center",
    alignItems: "center",
  },
});

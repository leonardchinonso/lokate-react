import TextString from "../components/ui/TextString";
import { StyleSheet, View } from "react-native";
import Colors from "../styles/colors";
import PrimaryButton from "../components/ui/PrimaryButton";
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import { AuthenticationContext } from "../store/context/AuthenticationContext";

// LogoutScreen is the component that renders the logout screen
function LogoutScreen() {
  // get the authentication context for auth information
  const authContext = useContext(AuthenticationContext);

  // get the navigation hook instance for moving through components
  const navigation = useNavigation();

  // onClickYes handles the use case of a user clicking yes
  function onClickYes() {
    authContext.unSetAuthData();
  }

  // onClickNo handlers the use case of a user clicking no
  function onClickNo() {
    navigation.goBack();
  }

  return (
    <View style={rootStyles.rootContainer}>
      <View style={logoutSectionStyles.container}>
        <TextString textStyle={logoutSectionStyles.areYouSureText}>
          Are You Sure?
        </TextString>
        <View style={buttonGroupStyles.container}>
          <View style={buttonGroupStyles.button}>
            <PrimaryButton
              onPress={onClickYes}
              customStyles={{ paddingVertical: "15%" }}
            >
              YES
            </PrimaryButton>
          </View>
          <View style={buttonGroupStyles.button}>
            <PrimaryButton
              onPress={onClickNo}
              customStyles={{ paddingVertical: "15%" }}
            >
              NO
            </PrimaryButton>
          </View>
        </View>
      </View>
    </View>
  );
}

export default LogoutScreen;

// rootStyles is the stylesheet for the main component
const rootStyles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primaryWhite,
  },
});

// logoutSectionStyles is the stylesheet for the logout section
const logoutSectionStyles = StyleSheet.create({
  container: {
    width: "80%",
    height: "20%",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: Colors.primaryWhite,
    borderRadius: 10,
    elevation: 4,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 1,
    shadowOpacity: 0.25,
  },
  areYouSureText: {
    color: Colors.primaryDarkPurple,
    fontSize: 20,
  },
});

// buttonGroupStyles is the stylesheet for the button group
const buttonGroupStyles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    flexDirection: "row",
    width: "70%",
  },
  button: {
    width: "40%",
  },
});

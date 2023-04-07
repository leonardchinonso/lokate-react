import { Header } from "../styles/text";
import TextString from "../components/ui/TextString";
import { StyleSheet, View } from "react-native";
import Colors from "../styles/colors";
import PrimaryButton from "../components/ui/PrimaryButton";

function LogoutScreen() {
  return (
    <View style={rootStyles.rootContainer}>
      <View style={Header.container}>
        <TextString textStyle={Header.text}>Logout</TextString>
      </View>
      <View style={logoutSectionStyles.container}>
        <TextString textStyle={logoutSectionStyles.areYouSureText}>
          Are You Sure?
        </TextString>
        <View style={buttonGroupStyles.container}>
          <View style={buttonGroupStyles.button}>
            <PrimaryButton customStyles={{ paddingVertical: "15%" }}>
              YES
            </PrimaryButton>
          </View>
          <View style={buttonGroupStyles.button}>
            <PrimaryButton customStyles={{ paddingVertical: "15%" }}>
              NO
            </PrimaryButton>
          </View>
        </View>
      </View>
    </View>
  );
}

export default LogoutScreen;

const rootStyles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primaryGrey,
  },
});

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
    color: Colors.primaryDarkBlue,
    fontSize: 20,
  },
});

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

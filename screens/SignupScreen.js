import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import PrimaryButton from "../components/ui/PrimaryButton";
import Card from "../components/ui/Card";
import PrimaryButtonLink from "../components/ui/PrimaryButtonLink";
import Colors from "../styles/colors";
import TextString from "../components/ui/TextString";
import TextInputBox from "../components/ui/TextInputBox";
import { useState } from "react";
import PasswordInputBox from "../components/ui/PasswordInputBox";
import Logo from "../components/ui/Logo";

function SignupScreen() {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  function emailInputHandler(enteredText) {
    setEnteredEmail(enteredText);
  }

  function firstNameInputHandler(enteredText) {
    setFirstName(enteredText);
  }

  function lastNameInputHandler(enteredText) {
    setLastName(enteredText);
  }

  return (
    <KeyboardAvoidingView
      style={rootStyles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Logo />

      <View style={cardStyles.container}>
        <Card>
          <View style={textStyles.needDirectionsContainer}>
            <TextString textStyle={textStyles.needDirectionsText}>
              Get Started
            </TextString>
          </View>

          <View style={textInputGroupStyles.container}>
            <View style={textInputGroupStyles.nameContainer}>
              <TextInputBox
                placeholder={"First Name"}
                contentType={"name"}
                onChange={firstNameInputHandler}
                keyboardType={"default"}
                containerStyle={{ width: "45%" }}
              ></TextInputBox>
              <TextInputBox
                placeholder={"Last Name"}
                contentType={"name"}
                onChange={lastNameInputHandler}
                keyboardType={"default"}
                containerStyle={{ width: "45%" }}
              ></TextInputBox>
            </View>
            <TextInputBox
              placeholder={"Email"}
              contentType={"emailAddress"}
              onChange={emailInputHandler}
              keyboardType={"email-address"}
            ></TextInputBox>
            <PasswordInputBox placeholder={"Password"}></PasswordInputBox>
            <PasswordInputBox
              placeholder={"Confirm Password"}
            ></PasswordInputBox>
          </View>

          <View style={buttonGroupStyles.container}>
            <PrimaryButton>SIGN UP</PrimaryButton>
            <View style={buttonLinkStyles.login}>
              <PrimaryButtonLink textStyle={textStyles.login}>
                Already have an account? Login
              </PrimaryButtonLink>
            </View>
          </View>
        </Card>
      </View>
    </KeyboardAvoidingView>
  );
}

export default SignupScreen;

const rootStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
});

const cardStyles = StyleSheet.create({
  container: {
    width: "100%",
    height: "60%",
  },
});

const textStyles = StyleSheet.create({
  needDirectionsText: {
    color: Colors.primaryDarkBlue,
    fontWeight: "bold",
    fontSize: 50,
  },
  needDirectionsContainer: {
    position: "absolute",
    top: "10%",
  },
  login: {
    color: Colors.primaryDarkBlue,
  },
});

const buttonGroupStyles = StyleSheet.create({
  container: {
    position: "absolute",
    top: "70%",
    height: "20%",
  },
});

const buttonLinkStyles = StyleSheet.create({
  forgotPassAndSignupContainer: {
    flexDirection: "row",
    position: "absolute",
    top: "80%",
  },
  forgotPassword: {
    marginRight: "15%",
    position: "absolute",
    top: "90%",
  },
  login: {
    marginTop: "15%",
  },
});

const textInputGroupStyles = StyleSheet.create({
  nameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  container: {
    justifyContent: "space-around",
    position: "absolute",
    top: "20%",
    width: "80%",
    height: "50%",
  },
});

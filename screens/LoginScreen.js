import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
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

function LoginScreen() {
  const [enteredEmail, setEnteredEmail] = useState("");

  function emailInputHandler(enteredText) {
    setEnteredEmail(enteredText);
  }

  return (
    <KeyboardAvoidingView
      style={rootStyles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Logo customContainerStyles={{ top: "10%" }} />

      <View style={cardStyles.container}>
        <Card>
          <View style={textStyles.welcomeContainer}>
            <TextString textStyle={textStyles.welcomeText}>Welcome</TextString>
          </View>
          <View style={textStyles.loginForExperienceContainer}>
            <TextString>Login for the best experience...</TextString>
          </View>

          <View style={textInputGroupStyles.container}>
            <TextInputBox
              placeholder={"Email"}
              contentType={"emailAddress"}
              onChange={emailInputHandler}
              keyboardType={"email-address"}
            ></TextInputBox>
            <PasswordInputBox placeholder={"Password"}></PasswordInputBox>
          </View>

          <View style={buttonGroupStyles.container}>
            <PrimaryButton>LOGIN</PrimaryButton>
            <View style={buttonLinkStyles.forgotPassword}>
              <PrimaryButtonLink textStyle={textStyles.forgotPassword}>
                Forgot password?
              </PrimaryButtonLink>
            </View>
            <View style={buttonLinkStyles.signup}>
              <PrimaryButtonLink textStyle={textStyles.signup}>
                Signup
              </PrimaryButtonLink>
            </View>
          </View>
        </Card>
      </View>
    </KeyboardAvoidingView>
  );
}

export default LoginScreen;

const rootStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
});

const cardStyles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width,
    height: "65%",
  },
});

const textStyles = StyleSheet.create({
  welcomeText: {
    color: Colors.primaryDarkBlue,
    fontWeight: "bold",
    fontSize: 50,
  },
  welcomeContainer: {
    position: "absolute",
    top: "10%",
  },
  loginForExperienceContainer: {
    position: "absolute",
    top: "23%",
  },
  forgotPassword: {
    color: Colors.secondaryDarkGrey,
  },
  signup: {
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
  signup: {
    marginRight: "15%",
    position: "absolute",
    top: "90%",
    left: "75%",
  },
});

const textInputGroupStyles = StyleSheet.create({
  container: {
    justifyContent: "space-around",
    position: "absolute",
    top: "35%",
    width: "80%",
    height: "25%",
  },
});

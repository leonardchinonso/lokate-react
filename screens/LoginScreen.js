import { Image, StyleSheet, Text, View } from "react-native";
import PrimaryButton from "../components/ui/PrimaryButton";
import Card from "../components/ui/Card";
import PrimaryButtonLink from "../components/ui/PrimaryButtonLink";
import Colors from "../styles/colors";
import TextString from "../components/ui/TextString";
import TextInputBox from "../components/ui/TextInputBox";
import { useState } from "react";
import PasswordInputBox from "../components/ui/PasswordInputBox";

function LoginScreen() {
  const [enteredEmail, setEnteredEmail] = useState("");

  function emailInputHandler(enteredText) {
    setEnteredEmail(enteredText);
  }

  return (
    <View style={rootStyles.container}>
      <View style={logoStyles.container}>
        <Image
          style={logoStyles.image}
          source={require("../assets/images/logo.png")}
        />
      </View>

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
            <PasswordInputBox></PasswordInputBox>
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
    </View>
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
    width: "100%",
    height: "70%",
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

const logoStyles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    width: "100%",
  },
  image: {
    width: "60%",
    height: "60%",
    resizeMode: "contain",
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

const passwordGroupStyles = StyleSheet.create({
  container: {
    position: "absolute",
    top: "50%",
    width: "100%",
  },
});

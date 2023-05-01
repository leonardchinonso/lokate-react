import { Alert, SafeAreaView, StyleSheet, View } from "react-native";
import PrimaryButton from "../components/ui/PrimaryButton";
import PrimaryButtonLink from "../components/ui/PrimaryButtonLink";
import Colors from "../styles/colors";
import TextString from "../components/ui/TextString";
import TextInputBox from "../components/ui/TextInputBox";
import { useContext, useState } from "react";
import PasswordInputBox from "../components/ui/PasswordInputBox";
import ErrorOverlay from "../components/ui/ErrorOverlay";
import { signup } from "../services/authService";
import { HttpStatusCodes, STORAGE } from "../models/constants";
import { AuthenticationContext } from "../store/context/AuthenticationContext";

// SignupScreen renders the sign up screen
function SignupScreen({ navigation }) {
  // get the authentication context to manage the token
  const authContext = useContext(AuthenticationContext);

  // create a state variable to hold the server error if it occurs
  const [error, setError] = useState("");

  // create a state variable to hold the form details for signup
  const [signupDetails, setSignupDetails] = useState({
    firstName: "",
    lastName: "",
    email: {
      value: "",
      isValid: true,
      errorText: "",
    },
    password: {
      value: "",
      isValid: true,
      errorText: "",
    },
    confirmPassword: "",
  });

  // login navigates back to the login page
  function login() {
    navigation.goBack();
  }

  function inputHandler(key, val) {
    setSignupDetails((prevState) => {
      // set the value to modify for when email and password are set
      let modifiedVal = { value: val, isValid: true, errorText: "" };
      switch (key) {
        case "email":
          // if email is set, keep other fields intact
          return {
            ...prevState,
            [key]: modifiedVal,
          };
        case "password":
          // if password is set, keep other fields intact
          return {
            ...prevState,
            [key]: modifiedVal,
          };
        default:
          // if any other field is set, ensure the email and password fields are reset to valid values
          return {
            ...prevState,
            [key]: val,
            // set the email and password error states to empty
            email: {
              value: prevState.email.value,
              isValid: true,
              errorText: "",
            },
            password: {
              value: prevState.password.value,
              isValid: true,
              errorText: "",
            },
          };
      }
    });
  }

  // signupHandler makes a call to the service to sign a user up
  async function signupHandler() {
    // call the signup service to handle the signup request
    const response = await signup(
      signupDetails.firstName,
      signupDetails.lastName,
      signupDetails.email.value,
      signupDetails.password.value,
      signupDetails.confirmPassword
    );

    // if there is an error with the email or password validation,
    // set the state to reflect it
    if (response.emailError || response.passwordError) {
      setSignupDetails((prevState) => {
        return {
          ...prevState,
          email: {
            value: prevState.email.value,
            isValid: !response.emailError,
            errorText: response.emailError,
          },
          password: {
            value: prevState.password.value,
            isValid: !response.passwordError,
            errorText: response.passwordError,
          },
        };
      });
      return;
    }

    // if there is an error otherwise, set the error state to display the view
    if (response.error) {
      setError(response.error);
      return;
    }

    // if the request comes back with a 400, show pop up
    if (response.status === HttpStatusCodes.StatusBadRequest) {
      Alert.alert("Invalid Request", response.message);
      return;
    }

    // if the response is ok, set the access token
    if (response.status === HttpStatusCodes.StatusOk) {
      const data = {
        userId: response.userId,
        userFirstName: response.userFirstName,
        userLastName: response.userLastName,
        userEmail: response.userEmail,
        userDisplayName: response.userDisplayName,
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
      };
      // set the authentication data with the signup details
      authContext.setAuthData(data, STORAGE);
    }
  }

  // dismissError dismisses the error view
  function dismissError() {
    setError(null);
  }

  // if there is an error, return the error overlay
  if (error) {
    return <ErrorOverlay message={error} onConfirm={dismissError} />;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={rootStyles.container}>
        <TextString
          textStyle={{
            color: Colors.almostBlack,
            fontSize: 40,
            fontWeight: "bold",
            marginVertical: "5%",
          }}
        >
          Get Started
        </TextString>

        <View style={textInputGroupStyles.nameContainer}>
          <TextInputBox
            placeholder={"First Name"}
            contentType={"name"}
            onChange={inputHandler.bind(this, "firstName")}
            keyboardType={"default"}
            containerStyle={{ width: "49%", marginVertical: "4%" }}
          ></TextInputBox>
          <TextInputBox
            placeholder={"Last Name"}
            contentType={"name"}
            onChange={inputHandler.bind(this, "lastName")}
            keyboardType={"default"}
            containerStyle={{ width: "49%", marginVertical: "4%" }}
          ></TextInputBox>
        </View>
        <TextInputBox
          placeholder={"Email"}
          contentType={"emailAddress"}
          onChange={inputHandler.bind(this, "email")}
          keyboardType={"email-address"}
        ></TextInputBox>
        <PasswordInputBox
          customStyles={{ marginVertical: "4%" }}
          placeholder={"Password"}
          onChange={inputHandler.bind(this, "password")}
        ></PasswordInputBox>
        <PasswordInputBox
          placeholder={"Confirm Password"}
          onChange={inputHandler.bind(this, "confirmPassword")}
          customStyles={{ marginBottom: "6%" }}
        ></PasswordInputBox>

        {!signupDetails.email.isValid && (
          <TextString textStyle={invalidInputStyle.text}>
            {signupDetails.email.errorText}
          </TextString>
        )}
        {!signupDetails.password.isValid && (
          <TextString textStyle={invalidInputStyle.text}>
            {signupDetails.password.errorText}
          </TextString>
        )}

        <PrimaryButton
          onPress={signupHandler}
          customStyles={{ width: "100%", marginTop: "5%" }}
        >
          SIGN UP
        </PrimaryButton>
        <PrimaryButtonLink
          onPress={login}
          textStyle={{ color: Colors.primaryPurple }}
        >
          Already have an account? Login
        </PrimaryButtonLink>
      </View>
    </SafeAreaView>
  );
}

export default SignupScreen;

// rootStyles is the style sheet for the main component
const rootStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primaryWhite,
    paddingHorizontal: 14,
  },
});

// textInputGroupStyles is the style sheet for the text inputs
const textInputGroupStyles = StyleSheet.create({
  nameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
});

// invalidInputStyle is the style sheet for an invalid text field
const invalidInputStyle = StyleSheet.create({
  text: {
    textAlign: "center",
    color: Colors.primaryRed,
    fontSize: 14,
  },
});

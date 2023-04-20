import { useContext, useState } from "react";
import { Alert, Image, SafeAreaView, StyleSheet, View } from "react-native";
import PrimaryButton from "../components/ui/PrimaryButton";
import PrimaryButtonLink from "../components/ui/PrimaryButtonLink";
import Colors from "../styles/colors";
import TextString from "../components/ui/TextString";
import TextInputBox from "../components/ui/TextInputBox";
import PasswordInputBox from "../components/ui/PasswordInputBox";
import { HttpStatusCodes, ScreenNameConstants } from "../models/constants";
import ErrorOverlay from "../components/ui/ErrorOverlay";
import { AuthenticationContext } from "../store/context/AuthenticationContext";
import { login } from "../services/authService";

function LoginScreen({ navigation }) {
  // get the authentication context to manage the token
  const authContext = useContext(AuthenticationContext);

  const [error, setError] = useState("");
  const [loginDetails, setLoginDetails] = useState({
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
  });

  function inputHandler(id, val) {
    setLoginDetails((prevValues) => {
      return {
        ...prevValues,
        [id]: { value: val, isValid: true, errorText: "" },
      };
    });
  }

  function signup() {
    navigation.navigate(ScreenNameConstants.SignupScreenName);
  }

  // loginHandler handles the call to the login service
  async function loginHandler() {
    // call the login service to handle the login request
    const response = await login(
      loginDetails.email.value,
      loginDetails.password.value
    );

    // if the email or password have errors, update the state with the errors and return
    if (response.emailError || response.passwordError) {
      setLoginDetails((prevValues) => {
        return {
          email: {
            value: prevValues.email.value,
            isValid: false,
            errorText: response.emailError,
          },
          password: {
            value: prevValues.password.value,
            isValid: false,
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

    // if the response comes back unauthorized, show error alert
    if (response.status === HttpStatusCodes.StatusUnauthorized) {
      Alert.alert(
        "Invalid Login Credentials",
        "Check that your email and password are both correct"
      );
      return;
    }

    // if the response is ok, set the access token
    if (response.status === HttpStatusCodes.StatusOk) {
      const data = {
        userId: response.userId,
        userEmail: response.userEmail,
        userDisplayName: response.userDisplayName,
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
      };
      authContext.setAuthData(data);
    }
  }

  // dismissError dismisses the error view
  function dismissError() {
    setError(null);
  }

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
            marginTop: "5%",
          }}
        >
          Login
        </TextString>
        <View style={imageStyles.container}>
          <Image
            style={{ width: "100%", height: undefined, aspectRatio: 1 }}
            source={require("../assets/images/login_illustration.jpg")}
          />
        </View>
        <View style={{ marginTop: "3%" }}>
          <TextString>Login for the best experience...</TextString>
        </View>

        <TextInputBox
          containerStyle={{ marginVertical: "5%" }}
          placeholder={"Email"}
          contentType={"emailAddress"}
          onChange={inputHandler.bind(this, "email")}
          keyboardType={"email-address"}
          value={loginDetails.email.value}
        ></TextInputBox>
        <PasswordInputBox
          placeholder={"Password"}
          onChange={inputHandler.bind(this, "password")}
          value={loginDetails.password.value}
          customStyles={{ marginBottom: "4%" }}
        ></PasswordInputBox>

        {!loginDetails.email.isValid && (
          <TextString textStyle={invalidInputStyle.text}>
            {loginDetails.email.errorText}
          </TextString>
        )}
        {!loginDetails.password.isValid && (
          <TextString textStyle={invalidInputStyle.text}>
            {loginDetails.password.errorText}
          </TextString>
        )}

        <PrimaryButton customStyles={{ width: "100%" }} onPress={loginHandler}>
          LOGIN
        </PrimaryButton>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 14,
            width: "100%",
          }}
        >
          <PrimaryButtonLink textStyle={textStyles.forgotPassword}>
            Forgot password?
          </PrimaryButtonLink>
          <PrimaryButtonLink onPress={signup} textStyle={textStyles.signup}>
            Signup
          </PrimaryButtonLink>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default LoginScreen;

const rootStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 14,
    alignItems: "center",
    backgroundColor: Colors.primaryWhite,
  },
});

const textStyles = StyleSheet.create({
  welcomeText: {
    color: Colors.primaryDarkPurple,
    fontWeight: "bold",
    fontSize: 50,
  },
  welcomeContainer: {},
  loginForExperienceContainer: {},
  forgotPassword: {
    color: Colors.secondaryDarkGrey,
  },
  signup: {
    color: Colors.primaryPurple,
  },
});

const invalidInputStyle = StyleSheet.create({
  text: {
    textAlign: "center",
    color: Colors.primaryRed,
    fontSize: 14,
  },
});

const imageStyles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});

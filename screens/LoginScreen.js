import { useContext, useState } from "react";
import {
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
} from "react-native";
import PrimaryButton from "../components/ui/PrimaryButton";
import Card from "../components/ui/Card";
import PrimaryButtonLink from "../components/ui/PrimaryButtonLink";
import Colors from "../styles/colors";
import TextString from "../components/ui/TextString";
import TextInputBox from "../components/ui/TextInputBox";
import PasswordInputBox from "../components/ui/PasswordInputBox";
import Logo from "../components/ui/Logo";
import { HttpStatusCodes, ScreenNameConstants } from "../models/constants";
import { IsValidEmail, IsValidPassword } from "../utils/utils";
import { MakeLoginRequest } from "../http/Authentication";
import ErrorOverlay from "../components/ui/ErrorOverlay";
import { AuthenticationContext } from "../store/context/AuthenticationContext";
import { ErrorConstants } from "../models/errors";

function LoginScreen({ navigation }) {
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

  const authContext = useContext(AuthenticationContext);

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

  function submitHandler() {
    const emailIsValid = IsValidEmail(loginDetails.email.value);
    const passwordIsValid = IsValidPassword(loginDetails.password.value);

    if (emailIsValid && passwordIsValid) {
      const details = {
        email: loginDetails.email.value,
        password: loginDetails.password.value,
      };

      async function makeLoginRequestHelper() {
        const response = await MakeLoginRequest(details);
        if (response.serverError) {
          setError(ErrorConstants.ServerErrMsg);
          return;
        }
        if (response.data) {
          switch (response.data.status) {
            case HttpStatusCodes.StatusUnauthorized:
              Alert.alert(
                "Invalid Login Credentials",
                "Check that your email and password are both correct"
              );
              break;
            case HttpStatusCodes.StatusOk:
              const token = response.data["data"]["access_token"];
              authContext.setAuthToken(token);
              break;
            default: // return an error on any other outcome
              setError(ErrorConstants.ServerErrMsg);
          }
        }
      }

      makeLoginRequestHelper().then();

      return;
    }
    // throw error
    setLoginDetails((prevValues) => {
      return {
        email: {
          value: prevValues.email.value,
          isValid: emailIsValid,
          errorText: emailIsValid ? "" : "email format is invalid",
        },
        password: {
          value: prevValues.password.value,
          isValid: passwordIsValid,
          errorText: passwordIsValid
            ? ""
            : "password must not be less than 6 characters",
        },
      };
    });
  }

  const hasError =
    !loginDetails.email.isValid || !loginDetails.password.isValid;

  function dismissError() {
    setError(null);
  }

  if (error) {
    return <ErrorOverlay message={error} onConfirm={dismissError} />;
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
              onChange={inputHandler.bind(this, "email")}
              keyboardType={"email-address"}
              value={loginDetails.email.value}
            ></TextInputBox>
            <PasswordInputBox
              placeholder={"Password"}
              onChange={inputHandler.bind(this, "password")}
              value={loginDetails.password.value}
            ></PasswordInputBox>
          </View>

          {hasError ? (
            <View style={{ position: "absolute", top: "60%" }}>
              <TextString textStyle={errorsStyle.text}>
                {loginDetails.email.isValid
                  ? loginDetails.password.errorText
                  : loginDetails.email.errorText}
              </TextString>
            </View>
          ) : null}

          <View style={buttonGroupStyles.container}>
            <PrimaryButton onPress={submitHandler}>LOGIN</PrimaryButton>
            <View style={buttonLinkStyles.forgotPassword}>
              <PrimaryButtonLink textStyle={textStyles.forgotPassword}>
                Forgot password?
              </PrimaryButtonLink>
            </View>
            <View style={buttonLinkStyles.signup}>
              <PrimaryButtonLink onPress={signup} textStyle={textStyles.signup}>
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
    backgroundColor: Colors.primaryPurple,
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
    color: Colors.primaryDarkPurple,
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
    color: Colors.primaryDarkPurple,
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

const errorsStyle = StyleSheet.create({
  text: {
    textAlign: "center",
    color: Colors.primaryRed,
    margin: 8,
    fontSize: 20,
  },
});

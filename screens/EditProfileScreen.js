import { Alert, SafeAreaView, StyleSheet, View } from "react-native";
import TextString from "../components/ui/TextString";
import Colors from "../styles/colors";
import TextInputBox from "../components/ui/TextInputBox";
import PrimaryButton from "../components/ui/PrimaryButton";
import { useContext, useState } from "react";
import { AuthenticationContext } from "../store/context/AuthenticationContext";
import { editProfile } from "../services/userService";
import {
  ConfigConstants,
  HttpStatusCodes,
  ScreenNameConstants,
} from "../models/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import ErrorOverlay from "../components/ui/ErrorOverlay";

function EditProfileScreen() {
  const authContext = useContext(AuthenticationContext);
  const navigation = useNavigation();

  // create a state for the server error display
  const [error, setError] = useState("");

  // get the user first name and last name
  const [currentFirstName, currentLastName] =
    authContext.authData.userDisplayName.split(" ");

  // create a state variable to hold the form details for the user profile
  const [profileDetails, setProfileDetails] = useState({
    firstName: currentFirstName,
    lastName: currentLastName,
    phoneNumber: authContext.authData.userPhoneNumber,
    email: {
      value: authContext.authData.userEmail,
      isValid: true,
      errorText: "",
    },
  });

  // login navigates back to the login page
  function inputHandler(key, val) {
    setProfileDetails((prevState) => {
      // set the values appropriately
      switch (key) {
        case "email":
          return {
            ...prevState,
            email: { value: val, isValid: true, errorText: "" },
          };
        default:
          return {
            ...prevState,
            [key]: val,
            // set the email error states to empty
            email: {
              value: prevState.email.value,
              isValid: true,
              errorText: "",
            },
          };
      }
    });
  }

  // processResponse handles the response from the service on editing a profile
  function processResponse(response) {
    // if it comes back with a server error, display the error view
    if (response.error) {
      setError(response.error);
      return;
    }

    // if the request comes back with a 401, log user out
    if (response.status === HttpStatusCodes.StatusUnauthorized) {
      authContext.unSetAuthData();
      AsyncStorage.removeItem(ConfigConstants.StorageAccessToken).then();
      return;
    }

    // if the request comes back with a 400, show pop up
    if (response.status === HttpStatusCodes.StatusBadRequest) {
      Alert.alert("Invalid Request", response.message);
      return;
    }

    // if the request comes back with a 200
    if (response.status === HttpStatusCodes.StatusOk) {
      Alert.alert("Successful!", "Profile updated successfully");
      navigation.goBack();
    }
  }

  // saveDetailsHandler handles the request to the service to save user details
  async function saveDetailsHandler() {
    // call the user service to edit the user profile
    const response = await editProfile(
      authContext.authData.accessToken,
      profileDetails.firstName,
      profileDetails.lastName,
      profileDetails.email.value,
      profileDetails.phoneNumber
    );

    // process the response from the service
    processResponse(response);
  }

  function dismissError() {
    setError(null);
  }

  if (error) {
    return <ErrorOverlay message={error} onConfirm={dismissError} />;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={rootStyles.container}>
        <View style={textInputGroupStyles.nameContainer}>
          <View
            style={{
              alignItems: "flex-start",
              width: "49%",
            }}
          >
            <TextString
              textStyle={{ marginLeft: "2%", color: Colors.almostBlack }}
            >
              First Name
            </TextString>
            <TextInputBox
              placeholder={profileDetails.firstName}
              contentType={"name"}
              onChange={inputHandler.bind(this, "firstName")}
              keyboardType={"default"}
              containerStyle={{ width: "100%" }}
            ></TextInputBox>
          </View>
          <View style={{ alignItems: "flex-start", width: "49%" }}>
            <TextString
              textStyle={{ marginLeft: "2%", color: Colors.almostBlack }}
            >
              Last Name
            </TextString>
            <TextInputBox
              placeholder={profileDetails.lastName}
              contentType={"name"}
              onChange={inputHandler.bind(this, "lastName")}
              keyboardType={"default"}
              containerStyle={{ width: "100%" }}
            ></TextInputBox>
          </View>
        </View>

        <View
          style={{
            alignItems: "flex-start",
            width: "100%",
            marginBottom: "4%",
          }}
        >
          <TextString
            textStyle={{ marginLeft: "2%", color: Colors.almostBlack }}
          >
            Email
          </TextString>
          <TextInputBox
            placeholder={profileDetails.email.value}
            contentType={"emailAddress"}
            onChange={inputHandler.bind(this, "email")}
            keyboardType={"email-address"}
            containerStyle={{ marginBottom: "4%" }}
          ></TextInputBox>
          <TextString
            textStyle={{ marginLeft: "2%", color: Colors.almostBlack }}
          >
            Phone Number
          </TextString>
          <TextInputBox
            placeholder={
              profileDetails.phoneNumber ? "phone" : profileDetails.phoneNumber
            }
            contentType={"telephoneNumber"}
            onChange={inputHandler.bind(this, "phoneNumber")}
            keyboardType={"phone-pad"}
            containerStyle={{ marginBottom: "4%" }}
          ></TextInputBox>
        </View>

        {!profileDetails.email.isValid && (
          <TextString textStyle={invalidInputStyle.text}>
            {profileDetails.email.errorText}
          </TextString>
        )}

        <PrimaryButton
          onPress={saveDetailsHandler}
          customStyles={{
            position: "absolute",
            bottom: "1%",
            width: "100%",
          }}
        >
          SAVE
        </PrimaryButton>
      </View>
    </SafeAreaView>
  );
}

export default EditProfileScreen;

const rootStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Colors.primaryWhite,
    paddingHorizontal: 14,
  },
});

const textInputGroupStyles = StyleSheet.create({
  nameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: "4%",
    marginTop: "8%",
  },
});

const invalidInputStyle = StyleSheet.create({
  text: {
    textAlign: "center",
    color: Colors.primaryRed,
    fontSize: 14,
  },
});

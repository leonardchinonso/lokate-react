import { useState } from "react";

import { KeyboardAvoidingView, StyleSheet, View } from "react-native";
import TextString from "../components/ui/TextString";
import Colors from "../styles/colors";
import TextInputBox from "../components/ui/TextInputBox";
import PasswordInputBox from "../components/ui/PasswordInputBox";
import PrimaryButton from "../components/ui/PrimaryButton";

function EditProfileScreen() {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  function emailInputHandler(enteredText) {
    setEnteredEmail(enteredText);
  }

  function firstNameInputHandler(enteredText) {
    setFirstName(enteredText);
  }

  function lastNameInputHandler(enteredText) {
    setLastName(enteredText);
  }

  function phoneInputHandler(enteredText) {
    setPhoneNumber(enteredText);
  }

  return (
    <KeyboardAvoidingView style={rootStyles.root}>
      <View style={textStyles.editProfileContainer}>
        <TextString textStyle={textStyles.editProfileText}>
          Edit Profile
        </TextString>
      </View>

      <View style={textInputGroupStyles.container}>
        <View style={textInputGroupStyles.compulsorySection}>
          <View style={textStyles.optionalAndCompulsoryTextContainer}>
            <TextString
              textStyle={{
                textAlign: "center",
                color: Colors.primaryBlack,
                marginBottom: "2%",
              }}
            >
              Compulsory
            </TextString>
          </View>
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
            placeholder={"Phone Number"}
            contentType={"telephoneNumber"}
            onChange={phoneInputHandler}
            keyboardType={"phone-pad"}
          ></TextInputBox>
        </View>
        <View style={textInputGroupStyles.optionalSection}>
          <View style={textStyles.optionalAndCompulsoryTextContainer}>
            <TextString
              textStyle={{
                textAlign: "center",
                color: Colors.primaryBlack,
                marginBottom: "2%",
              }}
            >
              Optional
            </TextString>
          </View>
          <TextInputBox
            placeholder={"Email"}
            contentType={"emailAddress"}
            onChange={emailInputHandler}
            keyboardType={"email-address"}
          ></TextInputBox>
          <PasswordInputBox placeholder={"Old Password"}></PasswordInputBox>
          <PasswordInputBox placeholder={"New Password"}></PasswordInputBox>
          <PasswordInputBox placeholder={"Confirm Password"}></PasswordInputBox>
        </View>
      </View>
      <View style={buttonGroupStyles.container}>
        <PrimaryButton>SAVE</PrimaryButton>
      </View>
    </KeyboardAvoidingView>
  );
}

export default EditProfileScreen;

const rootStyles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: Colors.primaryGrey,
  },
});

const textStyles = StyleSheet.create({
  editProfileText: {
    color: Colors.primaryBlack,
    fontWeight: "bold",
    fontSize: 50,
  },
  editProfileContainer: {
    marginTop: "15%",
    marginBottom: "20%",
  },
  optionalAndCompulsoryTextContainer: {
    alignItems: "flex-start",
  },
});

const textInputGroupStyles = StyleSheet.create({
  nameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  container: {
    justifyContent: "space-around",
    width: "80%",
    height: "50%",
  },
  compulsorySection: {
    height: "35%",
    justifyContent: "space-between",
    marginBottom: "50%",
  },
  optionalSection: {
    height: "65%",
    justifyContent: "space-between",
  },
});

const buttonGroupStyles = StyleSheet.create({
  container: {
    position: "absolute",
    top: "85%",
    height: "20%",
  },
});

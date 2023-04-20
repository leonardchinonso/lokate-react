import { Alert, SafeAreaView, StyleSheet, View } from "react-native";
import Colors from "../styles/colors";
import { Header } from "../styles/text";
import TextString from "../components/ui/TextString";
import PrimaryButton from "../components/ui/PrimaryButton";
import TextInputBox from "../components/ui/TextInputBox";
import { useContext, useEffect, useState } from "react";
import { AuthenticationContext } from "../store/context/AuthenticationContext";
import {
  ConfigConstants,
  EmailSubjectConstants,
  HttpStatusCodes,
  ScreenNameConstants,
} from "../models/constants";
import { SelectList } from "react-native-dropdown-select-list/index";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { contactUs } from "../services/commsService";

const subjectData = [
  { key: "1", value: EmailSubjectConstants.BusinessProposal },
  { key: "2", value: EmailSubjectConstants.FeatureRequest },
  { key: "3", value: EmailSubjectConstants.IssuesAndComplaints },
  { key: "4", value: EmailSubjectConstants.Other },
];

function ContactUsScreen() {
  const authContext = useContext(AuthenticationContext);

  // create a state to manage the message input
  const [message, setMessage] = useState("");

  // create a state to manage the dropdown selections
  const [selectedSubject, setSelectedSubject] = useState(
    EmailSubjectConstants.Other
  );

  // create a state to manage the server error if any
  const [error, setError] = useState("");

  // messageInputHandler handles input into the message text box
  function messageInputHandler(enteredText) {
    setMessage(enteredText);
  }

  // process response handles the response from the service
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

    // if the request comes back with a 400, show error pop up
    if (response.status === HttpStatusCodes.StatusBadRequest) {
      Alert.alert("Invalid Request", response.message);
      return;
    }

    // if the request comes back with a 200
    if (response.status === HttpStatusCodes.StatusOk) {
      Alert.alert("Successful!", "Message sent successfully");
    }
  }

  async function onSend() {
    // call the organization service to contact the organization
    const response = await contactUs(
      authContext.authData.accessToken,
      selectedSubject,
      message
    );

    // process the response from the service
    processResponse(response);
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={rootStyles.rootContainer}>
        <View
          style={{
            paddingLeft: "1%",
            marginTop: "5%",
            marginVertical: "1%",
            width: "100%",
            alignItems: "flex-start",
          }}
        >
          <TextString textStyle={nameSectionStyles.nameText}>Email</TextString>
        </View>
        <TextInputBox
          editable={false}
          placeholder={authContext.authData.userEmail}
          contentType={"name"}
          inputStyle={{ backgroundColor: Colors.almostWhite }}
        />

        <View
          style={{
            paddingLeft: "1%",
            marginTop: "5%",
            marginVertical: "1%",
            width: "100%",
            alignItems: "flex-start",
          }}
        >
          <TextString textStyle={nameSectionStyles.nameText}>Title</TextString>
        </View>
        <View style={dropdownStyles.container}>
          <SelectList
            setSelected={(val) => setSelectedSubject(val)}
            data={subjectData}
            save={"value"}
            dropdownStyles={{ backgroundColor: "white" }}
            dropdownTextStyles={{ fontSize: 14 }}
            placeholder={selectedSubject}
          />
        </View>

        <View
          style={{
            paddingLeft: "1%",
            marginTop: "5%",
            marginVertical: "1%",
            width: "100%",
            alignItems: "flex-start",
          }}
        >
          <TextString textStyle={nameSectionStyles.nameText}>
            Message
          </TextString>
        </View>
        <TextInputBox
          placeholder={"Type your message here"}
          contentType={"name"}
          inputStyle={{ height: "30%" }}
          multiline={true}
          onChange={messageInputHandler}
        />

        <PrimaryButton
          customStyles={{
            position: "absolute",
            bottom: "1%",
            width: "100%",
            left: 14,
          }}
          onPress={onSend}
        >
          SEND
        </PrimaryButton>
      </View>
    </SafeAreaView>
  );
}

export default ContactUsScreen;

const rootStyles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Colors.primaryWhite,
    paddingHorizontal: 14,
  },
});

const nameSectionStyles = StyleSheet.create({
  nameText: {
    color: Colors.primaryBlack,
    fontSize: 14,
  },
});

const dropdownStyles = StyleSheet.create({
  container: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.secondaryDarkGrey,
    backgroundColor: Colors.primaryWhite,
    width: "100%",
  },
});

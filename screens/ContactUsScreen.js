import { StyleSheet, View } from "react-native";
import Colors from "../styles/colors";
import { Header } from "../styles/text";
import TextString from "../components/ui/TextString";
import PrimaryButton from "../components/ui/PrimaryButton";
import TextInputBox from "../components/ui/TextInputBox";
import { useEffect, useState } from "react";

function ContactUsScreen() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function messageInputHandler(enteredText) {
    setMessage(enteredText);
  }

  useEffect(() => {
    setEmail("johnsmith@mail.bcu.ac.uk");
  }, []);

  return (
    <View style={rootStyles.rootContainer}>
      <View style={Header.container}>
        <TextString textStyle={Header.text}>Contact Us</TextString>
      </View>
      <View style={sectionStyles.container}>
        <View style={emailSectionStyles.container}>
          <TextString
            textStyle={[
              emailSectionStyles.emailText,
              { color: Colors.primaryDarkBlue },
            ]}
          >
            Email
          </TextString>
          <TextString textStyle={emailSectionStyles.emailText}>
            {email}
          </TextString>
        </View>
        <View style={messageSectionStyles.container}>
          <TextString
            textStyle={[
              messageSectionStyles.messageText,
              { color: Colors.primaryDarkBlue },
            ]}
          >
            Message
          </TextString>
          <View style={{ width: "70%", height: "100%" }}>
            <TextInputBox
              contentType={"organizationName"}
              onChange={messageInputHandler}
              keyboardType={"default"}
            />
          </View>
        </View>
      </View>

      <View style={buttonGroupStyles.container}>
        <PrimaryButton>SEND</PrimaryButton>
      </View>
    </View>
  );
}

export default ContactUsScreen;

const rootStyles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primaryGrey,
  },
});

const sectionStyles = StyleSheet.create({
  container: {
    position: "absolute",
    top: "25%",
    width: "80%",
    height: "50%",
  },
});

const buttonGroupStyles = StyleSheet.create({
  container: {
    position: "absolute",
    top: "85%",
    height: "20%",
  },
});

const emailSectionStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  emailText: {
    color: Colors.secondaryDarkGrey,
    fontWeight: "bold",
    fontSize: 20,
  },
});

const messageSectionStyles = StyleSheet.create({
  container: {
    position: "absolute",
    top: "15%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    width: "100%",
    height: "80%",
  },
  messageText: {
    color: Colors.secondaryDarkGrey,
    fontWeight: "bold",
    fontSize: 20,
  },
});

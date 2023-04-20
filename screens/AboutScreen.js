import { Alert, Dimensions, ScrollView, StyleSheet, View } from "react-native";
import { Header } from "../styles/text";
import TextString from "../components/ui/TextString";
import Colors from "../styles/colors";
import { useContext, useEffect, useState } from "react";
import { CommsContext } from "../store/context/CommsContext";
import { about } from "../services/commsService";
import { HttpStatusCodes } from "../models/constants";
import ErrorOverlay from "../components/ui/ErrorOverlay";
import LoadingOverlay from "../components/ui/LoadingOverlay";

const { width, height } = Dimensions.get("window");

function AboutScreen() {
  // use the context for the about text field to avoid multiple API requests
  // const commsContext = useContext(CommsContext);

  // create a state to hold the value for the about text
  const [aboutText, setAboutText] = useState("");

  // create a state to hold the value for the error state
  const [error, setError] = useState("");

  // create a state to hold the loading state of the screen
  const [isLoading, setIsLoading] = useState(false);

  // processResponse processes the response from the API
  function processResponse(response) {
    // if it comes back with a server error, display the error view
    if (response.error) {
      setError(response.error);
      return;
    }

    // if the request comes back with a 400, show pop up
    if (response.status === HttpStatusCodes.StatusBadRequest) {
      Alert.alert("Invalid Request", response.message);
      return;
    }

    // if the request comes back with a 200
    if (response.status === HttpStatusCodes.StatusOk) {
      setAboutText(response.details);
    }
  }

  // fetchAboutInformation makes a call to fetch the information from the service
  async function fetchAboutInformation() {
    // call the comms service to get the about information
    const response = await about();

    // process the response from the service
    processResponse(response);
  }

  useEffect(() => {
    if (!aboutText) {
      setIsLoading(true);
      // when the call is done, whether successful or not, set the loading screen state to false
      fetchAboutInformation().then(() => setIsLoading(false));
    }

    return () => {};
  }, []);

  // if the about information is being fetched, display the loading screen
  if (isLoading) {
    return <LoadingOverlay />;
  }

  // dismissError discards the error screen
  function dismissError() {
    setError(null);
  }

  if (error) {
    return <ErrorOverlay message={error} onConfirm={dismissError} />;
  }

  return (
    <ScrollView contentContainerStyle={rootStyles.rootContainer}>
      <View style={aboutSectionStyles.content}>
        <TextString textStyle={{ color: Colors.primaryBlack }}>
          {aboutText}
        </TextString>
      </View>
      <View style={{ position: "absolute", bottom: "3%", right: 14 }}>
        <TextString textStyle={{ fontSize: 10 }}>
          - heavily lifted from Starbucks' company profile
        </TextString>
      </View>
    </ScrollView>
  );
}

export default AboutScreen;

const rootStyles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primaryWhite,
    paddingHorizontal: 14,
  },
});

const aboutSectionStyles = StyleSheet.create({
  content: {
    padding: "5%",
    width: width,
  },
});

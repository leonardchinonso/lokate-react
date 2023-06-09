import { Alert, Dimensions, ScrollView, StyleSheet, View } from "react-native";
import TextString from "../components/ui/TextString";
import Colors from "../styles/colors";
import { useEffect, useState } from "react";
import { about } from "../services/commsService";
import { HttpStatusCodes } from "../models/constants";
import ErrorOverlay from "../components/ui/ErrorOverlay";
import LoadingOverlay from "../components/ui/LoadingOverlay";

// get the width dimensions for the window in focus
const { width } = Dimensions.get("window");

// AboutScreen is the component for the about information
function AboutScreen() {
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
      // if the about text has not gotten to the frontend, set the loading state to true
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

  // if an unexpected error exists, display the error screen
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

// rootStyles is the style for the root component
const rootStyles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primaryWhite,
    paddingHorizontal: 14,
  },
});

// aboutSectionStyles is the style sheet for the about section
const aboutSectionStyles = StyleSheet.create({
  content: {
    padding: "5%",
    width: width,
  },
});

import { Alert, StyleSheet, View } from "react-native";
import Colors from "../styles/colors";
import TextString from "../components/ui/TextString";
import TextInputBox from "../components/ui/TextInputBox";
import { useContext, useState } from "react";
import { SelectList } from "react-native-dropdown-select-list/index";
import {
  HttpStatusCodes,
  ScreenNameConstants,
  UseAsConstants,
} from "../models/constants";
import PrimaryButton from "../components/ui/PrimaryButton";
import { editSavedPlace } from "../services/placeService";
import { AuthenticationContext } from "../store/context/AuthenticationContext";
import { useNavigation } from "@react-navigation/native";
import ErrorOverlay from "../components/ui/ErrorOverlay";
import { savePlace } from "../services/placeService";

// ModifyPlaceScreen component renders the screen for adding OR editing the saved places
function ModifyPlaceScreen({ action, route }) {
  // get the authentication context for auth information
  const authContext = useContext(AuthenticationContext);

  // get the navigation hook instance for moving through components
  const navigation = useNavigation();

  // get the token from the authentication context
  const token = authContext.authData.accessToken;

  // create a state for the name of the saved place
  const [name, setName] = useState("");

  // create a state for the alias of the saved place
  const [alias, setAlias] = useState(UseAsConstants.None);

  // create a state for unexpected errors
  const [error, setError] = useState("");

  // renderDetails holds details of events to carry out depending on the action
  const renderDetails = {
    headerText: "Add",
    onClick: handleAdd,
    buttonText: "ADD",
  };

  // if the action is an edit action, modify the render details object
  if (action === "edit") {
    renderDetails.headerText = "Edit";
    renderDetails.onClick = handleEdit;
    renderDetails.buttonText = "SAVE";
    renderDetails.savePlaceId = route.params.savedPlaceId;
  } else {
    // if it is an Add action, add the placeId
    // we do not add it in the creation of the render details because
    // another component calling this component might not have the placeId
    renderDetails.placeId = route.params.placeId;
  }

  // dropdownData is the data for the dropdown menu
  const dropdownData = [
    { key: "1", value: UseAsConstants.None },
    { key: "2", value: UseAsConstants.Home },
    { key: "3", value: UseAsConstants.Work },
  ];

  // nameInputHandler handles the event a user edits the name textbox
  function nameInputHandler(nameText) {
    setName(nameText);
  }

  // processResponse processes the response based on the action of the parent component
  function processResponse(response, action) {
    // if it comes back with a server error, display the error view
    if (response.error) {
      setError(response.error);
      return;
    }

    // if the request comes back with a 401, log user out
    if (response.status === HttpStatusCodes.StatusUnauthorized) {
      // nullify the authentication data
      authContext.unSetAuthData();
      return;
    }

    // if the request comes back with a 400, show pop up
    if (response.status === HttpStatusCodes.StatusBadRequest) {
      // show an alert for invalid request
      Alert.alert("Invalid Request", response.message);
      return;
    }

    // if the request comes back with a 200
    if (response.status === HttpStatusCodes.StatusOk) {
      if (action !== "edit") {
        // TODO: when the user clicks OK, route them to the saved places page
        // if the action is an edit action, show the success alert box
        Alert.alert("Successful!", "Place added to saved places successfully");
      }
      // route the user back to the saved places screen
      navigation.navigate(ScreenNameConstants.SavedPlacesScreenName, {
        render: true,
      });
    }
  }

  // handleAdd handles adding saved places event
  async function handleAdd() {
    // call the place service to save the place
    const response = await savePlace(token, name, alias, renderDetails.placeId);
    // process the response from the service
    processResponse(response, action);
  }

  // handleEdit handles editing saved places event
  async function handleEdit() {
    // call the place service to edit the place
    const response = await editSavedPlace(
      token,
      name,
      alias,
      renderDetails.savePlaceId
    );
    // process the response from the service
    processResponse(response, action);
  }

  // dismissError discards the error screen
  function dismissError() {
    setError(null);
  }

  // if there is an error, show the error overlay
  if (error) {
    return <ErrorOverlay message={error} onConfirm={dismissError} />;
  }

  return (
    <View style={rootStyles.rootContainer}>
      <View style={nameSectionStyles.container}>
        <View
          style={{ paddingLeft: "1%", marginTop: "5%", marginVertical: "1%" }}
        >
          <TextString textStyle={nameSectionStyles.nameText}>Name</TextString>
        </View>
        <TextInputBox
          placeholder={route.params.formerName}
          contentType={"name"}
          onChange={nameInputHandler}
          keyboardType={"default"}
        />
      </View>
      <View style={useAsSectionStyles.container}>
        <View
          style={{ paddingLeft: "1%", marginTop: "5%", marginVertical: "1%" }}
        >
          <TextString textStyle={nameSectionStyles.nameText}>Use As</TextString>
        </View>
        <View style={dropdownStyles.container}>
          <SelectList
            setSelected={(val) => setAlias(val)}
            data={dropdownData}
            save={"value"}
            dropdownStyles={{ backgroundColor: "white" }}
            dropdownTextStyles={{ fontSize: 17 }}
            placeholder={"Use as"}
          />
        </View>
      </View>

      <PrimaryButton
        customStyles={{ marginTop: "10%" }}
        onPress={renderDetails.onClick}
      >
        {renderDetails.buttonText}
      </PrimaryButton>
    </View>
  );
}

export default ModifyPlaceScreen;

// rootStyles is the stylesheet for the main component
const rootStyles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: Colors.primaryWhite,
    paddingHorizontal: 14,
  },
});

// nameSectionStyles is the style sheet for the name sections
const nameSectionStyles = StyleSheet.create({
  container: {
    alignItems: "flex-start",
  },
  nameText: {
    color: Colors.primaryBlack,
    fontSize: 14,
  },
});

// useAsSectionStyles is the style sheet for the use as dropdown
const useAsSectionStyles = StyleSheet.create({
  container: {
    alignItems: "flex-start",
  },
  useAsText: {
    color: Colors.primaryBlack,
    fontWeight: "bold",
    fontSize: 20,
  },
});

// dropdownStyles is the style for the dropdown menu
const dropdownStyles = StyleSheet.create({
  container: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.secondaryDarkGrey,
    backgroundColor: Colors.primaryWhite,
    width: "100%",
  },
});

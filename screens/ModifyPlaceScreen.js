import { Alert, StyleSheet, View } from "react-native";
import Colors from "../styles/colors";
import TextString from "../components/ui/TextString";
import TextInputBox from "../components/ui/TextInputBox";
import { useContext, useState } from "react";
import { SelectList } from "react-native-dropdown-select-list/index";
import {
  ConfigConstants,
  HttpStatusCodes,
  NavigatorNameConstants,
  ScreenNameConstants,
  UseAsConstants,
} from "../models/constants";
import PrimaryButton from "../components/ui/PrimaryButton";
import { Header } from "../styles/text";
import { editSavedPlace } from "../services/placeService";
import { AuthenticationContext } from "../store/context/AuthenticationContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import ErrorOverlay from "../components/ui/ErrorOverlay";
import { savePlace } from "../services/placeService";

function ModifyPlaceScreen({ action, route }) {
  const navigation = useNavigation();

  const renderDetails = {
    headerText: "Add",
    onClick: handleAdd,
    buttonText: "ADD",
  };

  if (action === "edit") {
    renderDetails.headerText = "Edit";
    renderDetails.onClick = handleEdit;
    renderDetails.buttonText = "SAVE";
    renderDetails.savePlaceId = route.params.savedPlaceId;
  } else {
    renderDetails.placeId = route.params.placeId;
  }

  const authContext = useContext(AuthenticationContext);
  const token = authContext.authToken;

  const [name, setName] = useState("");
  const [alias, setAlias] = useState(UseAsConstants.None);
  const [error, setError] = useState("");

  const data = [
    { key: "1", value: UseAsConstants.None },
    { key: "2", value: UseAsConstants.Home },
    { key: "3", value: UseAsConstants.Work },
  ];

  function nameInputHandler(nameText) {
    setName(nameText);
  }

  function processResponse(response, action) {
    // if it comes back with a server error, display the error view
    if (response.error) {
      setError(response.error);
      return;
    }

    // if the request comes back with a 401, log user out
    if (response.status === HttpStatusCodes.StatusUnauthorized) {
      authContext.unsetAuthToken();
      AsyncStorage.removeItem(ConfigConstants.StorageTokenKey).then();
      return;
    }

    // if the request comes back with a 400, show pop up
    if (response.status === HttpStatusCodes.StatusBadRequest) {
      Alert.alert("Invalid Request", response.message);
      return;
    }

    // if the request comes back with a 200
    if (response.status === HttpStatusCodes.StatusOk) {
      if (action !== "edit") {
        Alert.alert("Successful!", "Place added to saved places successfully");
      }
      navigation.navigate(ScreenNameConstants.SavedPlacesScreenName, {
        render: true,
      });
    }
  }

  async function handleAdd() {
    // call the place service to save the place
    const response = await savePlace(token, name, alias, renderDetails.placeId);
    // process the response from the service
    processResponse(response, action);
  }

  async function handleEdit() {
    const response = await editSavedPlace(
      token,
      name,
      alias,
      renderDetails.savePlaceId
    );
    processResponse(response, action);
  }

  function dismissError() {
    setError(null);
  }

  if (error) {
    return <ErrorOverlay message={error} onConfirm={dismissError} />;
  }

  return (
    <View style={rootStyles.rootContainer}>
      <View style={Header.container}>
        <TextString textStyle={Header.text}>
          {renderDetails.headerText}
        </TextString>
      </View>
      <View style={nameSectionStyles.container}>
        <TextString textStyle={nameSectionStyles.nameText}>Name</TextString>
        <View style={nameSectionStyles.textInputBox}>
          <TextInputBox
            placeholder={route.params.formerName}
            contentType={"name"}
            onChange={nameInputHandler}
            keyboardType={"default"}
          />
        </View>
      </View>
      <View style={useAsSectionStyles.container}>
        <TextString textStyle={useAsSectionStyles.useAsText}>Use As</TextString>
        <View style={useAsSectionStyles.useAsDropdownContainer}>
          <View style={dropdownStyles.container}>
            <SelectList
              setSelected={(val) => setAlias(val)}
              data={data}
              save={"value"}
              dropdownStyles={{ backgroundColor: "white" }}
              dropdownTextStyles={{ fontSize: 17 }}
              placeholder={"Use as"}
            />
          </View>
        </View>
      </View>

      <View style={buttonGroupStyles.container}>
        <PrimaryButton onPress={renderDetails.onClick}>
          {renderDetails.buttonText}
        </PrimaryButton>
      </View>
    </View>
  );
}

export default ModifyPlaceScreen;

const rootStyles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primaryGrey,
  },
});

const nameSectionStyles = StyleSheet.create({
  container: {
    position: "absolute",
    top: "20%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "80%",
  },
  nameText: {
    color: Colors.primaryBlack,
    fontWeight: "bold",
    fontSize: 20,
  },
  textInputBox: {
    width: "70%",
  },
});

const useAsSectionStyles = StyleSheet.create({
  container: {
    position: "absolute",
    top: "30%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "80%",
  },
  useAsText: {
    color: Colors.primaryBlack,
    fontWeight: "bold",
    fontSize: 20,
  },
  useAsDropdownContainer: {
    width: "70%",
  },
});

const dropdownStyles = StyleSheet.create({
  container: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.secondaryDarkGrey,
    backgroundColor: "white",
  },
});

const buttonGroupStyles = StyleSheet.create({
  container: {
    position: "absolute",
    top: "80%",
    height: "20%",
  },
});

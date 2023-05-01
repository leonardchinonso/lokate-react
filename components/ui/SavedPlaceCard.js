import {
  Alert,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ItemCard from "./ItemCard";
import TextString from "./TextString";
import { useNavigation } from "@react-navigation/native";
import {
  HttpStatusCodes,
  NavigatorNameConstants,
  ScreenNameConstants,
} from "../../models/constants";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import Colors from "../../styles/colors";
import { getIcon } from "../../utils/utils";
import { deleteSavedPlace } from "../../services/placeService";
import { AuthenticationContext } from "../../store/context/AuthenticationContext";
import { useContext, useState } from "react";
import ErrorOverlay from "./ErrorOverlay";

// SavedPlaceCard is the component for rendering a single saved place card
function SavedPlaceCard({ children }) {
  // get the authentication context for auth information
  const authContext = useContext(AuthenticationContext);

  // get the navigation hook instance for moving through components
  const navigation = useNavigation();

  // create a state for the error view
  const [error, setError] = useState("");

  // onEdit handles user clicking the edit button
  function onEdit() {
    // navigate to the edit saved place screen
    navigation.navigate(NavigatorNameConstants.PlacesNavigatorName, {
      screen: ScreenNameConstants.EditSavedPlaceScreen,
      savedPlaceId: children.id,
      formerName: children.name,
    });
  }

  // onDelete handles user clicking the delete button
  function onDelete() {
    // proceedToDelete handles the function to delete a savedPlace once its confirmed
    async function proceedToDelete() {
      // call the service to delete a place and get the response
      const response = await deleteSavedPlace(
        authContext.authData.accessToken,
        children.id
      );
      // process the response
      processResponse(response);
    }

    // show an alert box to ask to delete the savedPlace when clicked
    // if yes, call the proceedToDelete function
    Alert.alert(`Delete ${children.name}?`, "", [
      { text: "No", style: "cancel" },
      { text: "Yes", onPress: proceedToDelete },
    ]);
  }

  // processResponse processes the response from the service
  function processResponse(response) {
    // if it comes back with a server error, display the error view
    if (response.error) {
      setError(response.error);
      return;
    }

    // if the request comes back with a 401, log user out
    if (response.status === HttpStatusCodes.StatusUnauthorized) {
      authContext.unSetAuthData();
      return;
    }

    // if the request comes back with a 400, show error pop up
    if (response.status === HttpStatusCodes.StatusBadRequest) {
      Alert.alert("Invalid Request", response.message);
      return;
    }

    // if the request comes back with a 200
    if (response.status === HttpStatusCodes.StatusOk) {
      // navigate to saved places list on success
      navigation.navigate(ScreenNameConstants.SavedPlacesScreenName, {
        render: true,
      });
    }
  }

  // dismissError discards the error screen
  function dismissError() {
    setError(null);
  }

  // if there is an error, call the dismissError function
  if (error) {
    return <ErrorOverlay message={error} onConfirm={dismissError} />;
  }

  return (
    <ItemCard customStyles={styles.container}>
      <View>{getIcon(children.place_alias)}</View>
      <TextString
        textStyle={{ fontWeight: "normal", color: Colors.primaryWhite }}
      >
        {children.name}
      </TextString>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <TouchableOpacity onPress={onEdit} style={{ paddingRight: "3%" }}>
          <TextString
            textStyle={{ color: Colors.primaryWhite, fontWeight: "normal" }}
          >
            Edit
          </TextString>
        </TouchableOpacity>
        <TouchableOpacity onPress={onDelete} style={{ paddingLeft: "3%" }}>
          <TextString
            textStyle={{ color: Colors.primaryWhite, fontWeight: "normal" }}
          >
            Delete
          </TextString>
        </TouchableOpacity>
      </View>
    </ItemCard>
  );
}

export default SavedPlaceCard;

// style sheet for the component
const styles = StyleSheet.create({
  container: {
    marginVertical: "2%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: "5%",
    backgroundColor: Colors.primaryPurple,
    alignItems: "center",
    paddingVertical: "5%",
  },
});

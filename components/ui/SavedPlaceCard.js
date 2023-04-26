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

function SavedPlaceCard({ children }) {
  const navigation = useNavigation();
  const authContext = useContext(AuthenticationContext);
  const [error, setError] = useState("");

  function onEdit() {
    navigation.navigate(NavigatorNameConstants.PlacesNavigatorName, {
      screen: ScreenNameConstants.EditSavedPlaceScreen,
      savedPlaceId: children.id,
      formerName: children.name,
    });
  }

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

    // if the request comes back with a 400, show pop up
    if (response.status === HttpStatusCodes.StatusBadRequest) {
      Alert.alert("Invalid Request", response.message);
      return;
    }

    // if the request comes back with a 200
    if (response.status === HttpStatusCodes.StatusOk) {
      navigation.navigate(ScreenNameConstants.SavedPlacesScreenName, {
        render: true,
      });
    }
  }

  function onDelete() {
    async function proceedToDelete() {
      const response = await deleteSavedPlace(
        authContext.authData.accessToken,
        children.id
      );
      processResponse(response);
    }

    Alert.alert(`Delete ${children.name}?`, "", [
      { text: "No", style: "cancel" },
      { text: "Yes", onPress: proceedToDelete },
    ]);
  }

  // dismissError discards the error screen
  function dismissError() {
    setError(null);
  }

  if (error) {
    return <ErrorOverlay message={error} onConfirm={dismissError} />;
  }

  return (
    <ItemCard customStyles={itemCardCustomStyles.container}>
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

const itemCardCustomStyles = StyleSheet.create({
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

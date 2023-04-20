import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Colors from "../styles/colors";
import TextInputBox from "../components/ui/TextInputBox";
import { useContext, useState } from "react";
import Card from "../components/ui/Card";
import TextString from "../components/ui/TextString";
import {
  HomepageDestinationConstants,
  NavigatorNameConstants,
  ScreenNameConstants,
} from "../models/constants";
import IconButtonLink from "../components/ui/IconButtonLink";
import { SelectList } from "react-native-dropdown-select-list/index";
import PrimaryButton from "../components/ui/PrimaryButton";
import { Header } from "../styles/text";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { RouteContext } from "../store/context/RouteContext";
import { CurrentLocationContext } from "../store/context/CurrentLocationContext";
import { SavedPlaceContext } from "../store/context/SavedPlaceContext";

function PickLocation({ action }) {
  const routeContext = useContext(RouteContext);
  const currentLocationContext = useContext(CurrentLocationContext);
  const savedPlacesContext = useContext(SavedPlaceContext);

  const navigation = useNavigation();

  const [searchQuery, setSearchQuery] = useState("");
  const [selected, setSelected] = useState("");

  const searchPlaces = [
    {
      name: HomepageDestinationConstants.CurrentLocation,
      value: "Current Location",
      icon: (
        <Ionicons
          name="md-location-outline"
          size={24}
          color={Colors.primaryBlack}
        />
      ),
    },
    {
      name: HomepageDestinationConstants.GoHome,
      value: "Home",
      icon: (
        <Ionicons name="home-outline" size={24} color={Colors.primaryBlack} />
      ),
    },
    {
      name: HomepageDestinationConstants.GoToWork,
      value: "Work",
      icon: (
        <FontAwesome name="suitcase" size={24} color={Colors.primaryBlack} />
      ),
    },
  ];

  const savedPlaces = [
    {
      name: HomepageDestinationConstants.Location,
      value: "Birmingham New Street",
      icon: (
        <Ionicons
          name="md-location-outline"
          size={24}
          color={Colors.primaryBlack}
        />
      ),
    },
    {
      name: HomepageDestinationConstants.Location,
      value: "Curzon Building",
      icon: (
        <Ionicons
          name="md-location-outline"
          size={24}
          color={Colors.primaryBlack}
        />
      ),
    },
    {
      name: HomepageDestinationConstants.Location,
      value: "Bull Ring",
      icon: (
        <Ionicons
          name="md-location-outline"
          size={24}
          color={Colors.primaryBlack}
        />
      ),
    },
  ];

  const data = [
    { key: "1", value: "Last Visited" },
    { key: "2", value: "Saved Places" },
  ];

  function onSelectLocation(placeAlias) {
    console.log("Place Alias: ", placeAlias);
    const location = {
      name: "",
      lon: null,
      lat: null,
      type: "",
    };

    // if the current location is selected as a start or end point,
    // fetch the GPS location and use it
    if (placeAlias === "Current Location") {
      location.name = "Current Location";
      location.lon = currentLocationContext.location.longitude;
      location.lat = currentLocationContext.location.latitude;
      locationHandler(location);
      return;
    }

    // if the control gets here, it means the alias is either WORK or HOME
    // get the saved places from the context and onDevice storage
    const savedPlaces = savedPlacesContext.savedPlaces;

    // iterate over the places and check for when the placeAlias is the same
    for (const savedPlace of savedPlaces) {
      if (savedPlace.place_alias === placeAlias.toUpperCase()) {
        location.name = placeAlias;
        location.lon = savedPlace.place.longitude;
        location.lat = savedPlace.place.latitude;
      }
    }

    // if no place_alias could be found for home or work, show error message
    if (!location.lat || !location.lon) {
      Alert.alert("Invalid request", "No location set for HOME or WORK");
      return;
    }

    // pass the location object to the onPressHandler function
    locationHandler(location);
  }

  function locationHandler(location) {
    if (action === "start") {
      routeContext.setStartLocation(location);
      navigation.navigate(NavigatorNameConstants.EndLocationNavigatorName);
    } else if (action === "end") {
      routeContext.setEndLocation(location);
      navigation.navigate(ScreenNameConstants.JourneyResultScreen);
    }
  }

  function searchInputHandler(enteredText) {
    setSearchQuery(enteredText);
  }

  function submitButtonHandler() {
    if (action === "start") {
      navigation.navigate(NavigatorNameConstants.StartLocationNavigatorName, {
        screen: ScreenNameConstants.SearchResultScreenName,
        searchQuery,
        action,
      });
    } else {
      navigation.navigate(NavigatorNameConstants.EndLocationNavigatorName, {
        screen: ScreenNameConstants.SearchResultScreenName,
        searchQuery,
        action,
      });
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false} style={rootStyles.root}>
        <View style={searchFieldStyles.container}>
          <TextInputBox
            placeholder={"Search Place"}
            contentType={"name"}
            onChange={searchInputHandler}
            keyboardType={"default"}
          ></TextInputBox>
        </View>

        <View style={startLocationGroupStyles.topContainer}>
          {searchPlaces.map((location, index) => (
            <IconButtonLink
              key={index}
              name={location.name}
              children={location.value}
              icon={location.icon}
              onPress={onSelectLocation.bind(this, location.value)}
            />
          ))}
        </View>

        <View style={dropdownStyles.container}>
          <SelectList
            setSelected={(val) => setSelected(val)}
            data={data}
            save={"value"}
            dropdownStyles={{ backgroundColor: "white" }}
            dropdownTextStyles={{ fontSize: 17 }}
            placeholder={"Pick a place"}
          />
        </View>

        <View>
          {savedPlaces.map((location, index) => (
            <IconButtonLink
              key={index}
              name={location.name}
              children={location.value}
              icon={location.icon}
            />
          ))}
        </View>

        <PrimaryButton
          customStyles={buttonStyles.container}
          onPress={submitButtonHandler}
        >
          {action === "start" ? "NEXT" : "GO"}
        </PrimaryButton>
      </ScrollView>
    </SafeAreaView>
  );
}

export default PickLocation;

const rootStyles = StyleSheet.create({
  root: {
    flex: 1,
    height: "100%",
    paddingHorizontal: 14,
    backgroundColor: Colors.primaryWhite,
  },
});

const searchFieldStyles = StyleSheet.create({
  container: {
    marginTop: "5%",
    marginBottom: 20,
  },
});

const startLocationGroupStyles = StyleSheet.create({
  topContainer: {
    marginBottom: "25%",
  },
});

const dropdownStyles = StyleSheet.create({
  container: {
    marginBottom: "5%",
  },
});

const buttonStyles = StyleSheet.create({
  container: {
    marginTop: "35%",
    marginBottom: "10%",
  },
});

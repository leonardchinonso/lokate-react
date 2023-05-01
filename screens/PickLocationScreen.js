import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import Colors from "../styles/colors";
import TextInputBox from "../components/ui/TextInputBox";
import { useContext, useState } from "react";
import {
  HomepageDestinationConstants,
  NavigatorNameConstants,
  ScreenNameConstants,
} from "../models/constants";
import IconButtonLink from "../components/ui/IconButtonLink";
import { SelectList } from "react-native-dropdown-select-list/index";
import PrimaryButton from "../components/ui/PrimaryButton";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { RouteContext } from "../store/context/RouteContext";
import { CurrentLocationContext } from "../store/context/CurrentLocationContext";
import { SavedPlaceContext } from "../store/context/SavedPlaceContext";

// PickLocation is the component for picking the place to visit
function PickLocation({ action }) {
  // get the routeContext to set the routes globally
  const routeContext = useContext(RouteContext);

  // get the navigation hook instance for moving through components
  const navigation = useNavigation();

  // get the currentLocationContext to retrieve the current location
  const currentLocationContext = useContext(CurrentLocationContext);

  // get the savedPlacesContext to retrieve saved places
  const savedPlacesContext = useContext(SavedPlaceContext);

  // create a state for the search input
  const [searchQuery, setSearchQuery] = useState("");

  // create a state for the selected dropdown menu
  const [selected, setSelected] = useState("");

  // searchInputHandler sets the input for the search query
  function searchInputHandler(enteredText) {
    setSearchQuery(enteredText);
  }

  // searchPlaces is a list of places to pick from as destinations or start positions
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

  // savedPlaces is a list of places saved by the user, it is a mock
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

  // placeTypeData is the data holding the type of place tor render
  const placeTypeData = [
    { key: "1", value: "Last Visited" },
    { key: "2", value: "Saved Places" },
  ];

  // onSelectLocation handles the event of clicking a location
  function onSelectLocation(placeAlias) {
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
      // handle what happens with the location
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

  // locationHandler handles the location depending on the action
  function locationHandler(location) {
    if (action === "start") {
      routeContext.setStartLocation(location);
      navigation.navigate(NavigatorNameConstants.EndLocationNavigatorName);
    } else if (action === "end") {
      routeContext.setEndLocation(location);
      navigation.navigate(ScreenNameConstants.JourneyResultScreen);
    }
  }

  // submitButtonHandler handles event of the submit button when clicked
  function submitButtonHandler() {
    if (action === "start") {
      // navigate to the search results screen of the start location
      navigation.navigate(NavigatorNameConstants.StartLocationNavigatorName, {
        screen: ScreenNameConstants.SearchResultScreenName,
        searchQuery,
        action,
      });
    } else {
      // navigate to the search results screen of the end location
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
            data={placeTypeData}
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

// rootStyles is the style sheet for the main component
const rootStyles = StyleSheet.create({
  root: {
    flex: 1,
    height: "100%",
    paddingHorizontal: 14,
    backgroundColor: Colors.primaryWhite,
  },
});

// searchFieldStyles is the style sheet for the search field
const searchFieldStyles = StyleSheet.create({
  container: {
    marginTop: "5%",
    marginBottom: 20,
  },
});

// startLocationGroupStyles is the style sheet for the start location group
const startLocationGroupStyles = StyleSheet.create({
  topContainer: {
    marginBottom: "25%",
  },
});

// dropdownStyles is the style for the dropdown menu
const dropdownStyles = StyleSheet.create({
  container: {
    marginBottom: "5%",
  },
});

// buttonStyles is the style for the buttons
const buttonStyles = StyleSheet.create({
  container: {
    marginTop: "35%",
    marginBottom: "10%",
  },
});

import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import Colors from "../styles/colors";
import TextInputBox from "../components/ui/TextInputBox";
import { useState } from "react";
import Card from "../components/ui/Card";
import TextString from "../components/ui/TextString";
import {
  HomepageDestinationConstants,
  ScreenNameConstants,
} from "../models/constants";
import IconButtonLink from "../components/ui/IconButtonLink";
import { SelectList } from "react-native-dropdown-select-list/index";
import PrimaryButton from "../components/ui/PrimaryButton";
import { Header } from "../styles/text";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

function PickLocation({ action }) {
  const navigation = useNavigation();

  const [searchQuery, setSearchQuery] = useState("");
  const [selected, setSelected] = useState("");

  const searchPlaces = [
    {
      name: HomepageDestinationConstants.CurrentLocation,
      value: "Current Location",
      icon: <Ionicons name="md-location-outline" size={24} color="black" />,
    },
    {
      name: HomepageDestinationConstants.GoHome,
      value: "Home",
      icon: <Ionicons name="home-outline" size={24} color="black" />,
    },
    {
      name: HomepageDestinationConstants.GoToWork,
      value: "Work",
      icon: <FontAwesome name="suitcase" size={24} color="black" />,
    },
  ];

  const savedPlaces = [
    {
      name: HomepageDestinationConstants.Location,
      value: "Birmingham New Street",
      icon: <Ionicons name="md-location-outline" size={24} color="black" />,
    },
    {
      name: HomepageDestinationConstants.Location,
      value: "Curzon Building",
      icon: <Ionicons name="md-location-outline" size={24} color="black" />,
    },
    {
      name: HomepageDestinationConstants.Location,
      value: "Bull Ring",
      icon: <Ionicons name="md-location-outline" size={24} color="black" />,
    },
  ];

  const data = [
    { key: "1", value: "Last Visited" },
    { key: "2", value: "Saved Places" },
  ];

  function searchInputHandler(enteredText) {
    setSearchQuery(enteredText);
  }

  function resolveSubmitButton() {
    navigation.navigate(ScreenNameConstants.SearchResultScreenName, {
      searchQuery,
      action,
    });
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false} style={rootStyles.root}>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginTop: 20,
            marginBottom: 80,
          }}
        >
          <TextString textStyle={Header.text}>
            {action === "start" ? "From Where?" : "To Where?"}
          </TextString>
        </View>
        <View style={textStyles.pickLocationContainer}>
          <TextString textStyle={{ fontSize: 17 }}>
            {action === "start"
              ? "Pick a start location"
              : "Pick an end location"}
          </TextString>
        </View>

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
            />
          ))}
        </View>

        <View style={textStyles.pickLocationContainer}>
          <TextString textStyle={{ fontSize: 17 }}>Pick a place</TextString>
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

        <View style={startLocationGroupStyles.bottomContainer}>
          {savedPlaces.map((location, index) => (
            <IconButtonLink
              key={index}
              name={location.name}
              children={location.value}
              icon={location.icon}
            />
          ))}
        </View>

        <View style={buttonGroupStyles.container}>
          <PrimaryButton onPress={resolveSubmitButton}>
            {action === "start" ? "NEXT" : "GO"}
          </PrimaryButton>
        </View>
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
    marginBottom: 20,
  },
});

const textStyles = StyleSheet.create({
  goSomewhereText: {
    color: Colors.primaryBlack,
    fontWeight: "bold",
    fontSize: 50,
  },
  goSomewhereContainer: {},
  pickLocationContainer: {
    marginBottom: 10,
  },
});

const startLocationGroupStyles = StyleSheet.create({
  topContainer: {
    marginBottom: 70,
  },
  bottomContainer: {},
});

const dropdownStyles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
});

const buttonGroupStyles = StyleSheet.create({
  container: {
    marginTop: 70,
    height: 50,
    marginBottom: 50,
  },
});

import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import Colors from "../styles/colors";
import TextInputBox from "../components/ui/TextInputBox";
import { useState } from "react";
import Card from "../components/ui/Card";
import TextString from "../components/ui/TextString";
import { HomepageDestinationConstants } from "../models/constants";
import IconButtonLink from "../components/ui/IconButtonLink";
import { SelectList } from "react-native-dropdown-select-list/index";
import PrimaryButton from "../components/ui/PrimaryButton";
import { Header } from "../styles/text";
import { FontAwesome, Ionicons } from "@expo/vector-icons";

function PickLocation({ position, onPress }) {
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
            {position === "start" ? "From Where?" : "To Where?"}
          </TextString>
        </View>
        <View style={textStyles.pickLocationContainer}>
          <TextString textStyle={{ fontSize: 17 }}>
            {position === "start"
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
          <PrimaryButton onPress={onPress}>
            {position === "start" ? "NEXT" : "GO"}
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
    // justifyContent: "center",
    // alignItems: "center",
    backgroundColor: Colors.primaryWhite,
  },
});

const searchFieldStyles = StyleSheet.create({
  container: {
    // position: "absolute",
    // top: "23%",
    // width: "80%",
    marginBottom: 20,
  },
});

const textStyles = StyleSheet.create({
  goSomewhereText: {
    color: Colors.primaryBlack,
    fontWeight: "bold",
    fontSize: 50,
  },
  goSomewhereContainer: {
    // position: "absolute",
    // top: "10%",
  },
  pickLocationContainer: {
    // position: "absolute",
    // top: "16%",
    marginBottom: 10,
  },
});

const startLocationGroupStyles = StyleSheet.create({
  topContainer: {
    // position: "absolute",
    // top: "31%",
    // width: "80%",
    // height: "15%",
    // justifyContent: "space-around",
    marginBottom: 70,
  },
  bottomContainer: {
    // position: "absolute",
    // top: "58%",
    // width: "80%",
    // height: "15%",
    // justifyContent: "space-around",
  },
});

const dropdownStyles = StyleSheet.create({
  container: {
    // position: "absolute",
    // top: "50%",
    // width: "80%",
    // borderRadius: 10,
    // borderWidth: 1,
    // borderColor: Colors.secondaryDarkGrey,
    // backgroundColor: "white",
    marginBottom: 20,
  },
});

const buttonGroupStyles = StyleSheet.create({
  container: {
    // position: "absolute",
    // top: "80%",
    // height: "20%",
    marginTop: 70,
    height: 50,
    marginBottom: 50,
  },
});

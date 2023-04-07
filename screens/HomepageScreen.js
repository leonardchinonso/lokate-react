import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Logo from "../components/ui/Logo";
import Card from "../components/ui/Card";
import TextString from "../components/ui/TextString";
import PrimaryButtonLink from "../components/ui/PrimaryButtonLink";
import Colors from "../styles/colors";
import IconButtonLink from "../components/ui/IconButtonLink";
import { HomepageDestinationConstants } from "../models/constants";

function HomepageScreen() {
  function fetchRecentlyVisited() {
    return ["Bull Ring", "Birmingham New Street", "Curzon Building"];
  }

  return (
    <View style={rootStyles.container}>
      <View style={profileIconStyles.container}>
        <Pressable
          style={({ pressed }) => (pressed ? profileIconStyles.pressed : null)}
        >
          <Image source={require("../assets/images/profile_icon.png")} />
        </Pressable>
      </View>

      <Logo />

      <View style={cardStyles.container}>
        <Card>
          <View style={textStyles.getStartedContainer}>
            <TextString textStyle={textStyles.getStartedText}>
              Need Directions?
            </TextString>
          </View>

          <View style={destinationGroupStyles.container}>
            <IconButtonLink
              name={HomepageDestinationConstants.GoSomewhere}
              children={"Go Somewhere"}
            />
            <IconButtonLink
              name={HomepageDestinationConstants.GoHome}
              children={"Go Home"}
            />
            <IconButtonLink
              name={HomepageDestinationConstants.GoToWork}
              children={"Go To Work"}
            />
            <IconButtonLink
              name={HomepageDestinationConstants.SavedPlaces}
              children={"Saved Places"}
            />
          </View>

          <View style={recentlyVisitedStyles.container}>
            <TextString textStyle={{ fontSize: 20 }}>
              You recently visited...
            </TextString>
            <View>
              <FlatList
                data={fetchRecentlyVisited()}
                renderItem={(itemData) => (
                  <View style={recentlyVisitedStyles.singleItem}>
                    <PrimaryButtonLink
                      textStyle={textStyles.singleRecentlyVisitedItemText}
                    >
                      {itemData.item}
                    </PrimaryButtonLink>
                  </View>
                )}
              />
            </View>
          </View>

          <View style={seeMoreStyles.container}>
            <PrimaryButtonLink textStyle={textStyles.seeMore}>
              ...see more
            </PrimaryButtonLink>
          </View>
        </Card>
      </View>
    </View>
  );
}

export default HomepageScreen;

const rootStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
});

const profileIconStyles = StyleSheet.create({
  container: {
    position: "absolute",
    top: "7%",
    left: "1%",
  },
  pressed: {
    opacity: 0.5,
  },
});

const cardStyles = StyleSheet.create({
  container: {
    width: "100%",
    height: "60%",
  },
});

const textStyles = StyleSheet.create({
  getStartedText: {
    color: Colors.primaryDarkBlue,
    fontWeight: "bold",
    fontSize: 50,
  },
  getStartedContainer: {
    position: "absolute",
    top: "5%",
  },
  seeMore: {
    color: Colors.primaryDarkBlue,
  },
  singleRecentlyVisitedItemText: {
    color: Colors.primaryDarkBlue,
    fontSize: 16,
  },
});

const recentlyVisitedStyles = StyleSheet.create({
  container: {
    position: "absolute",
    top: "65%",
    left: "15%",
    height: "20%",
  },
  singleItem: {
    marginTop: "5%",
    marginLeft: "5%",
    alignItems: "flex-start",
  },
});

const seeMoreStyles = StyleSheet.create({
  container: {
    position: "absolute",
    top: "90%",
    right: "10%",
  },
});

const destinationGroupStyles = StyleSheet.create({
  container: {
    justifyContent: "space-around",
    position: "absolute",
    top: "20%",
    width: "80%",
    height: "40%",
    paddingLeft: "10%",
  },
});

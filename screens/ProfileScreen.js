import { Image, StyleSheet, View } from "react-native";
import Colors from "../styles/colors";
import IconButtonLink from "../components/ui/IconButtonLink";
import { ProfileConstants, ScreenNameConstants } from "../models/constants";
import TextString from "../components/ui/TextString";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

function ProfileScreen() {
  const navigation = useNavigation();

  function logout() {
    navigation.navigate(ScreenNameConstants.LogoutScreenName);
  }

  return (
    <View style={rootStyles.rootContainer}>
      <View style={profileHeaderStyles.container}>
        <View style={imageStyles.imageContainer}>
          <Image source={require("../assets/images/profile_big_icon.png")} />
        </View>
        <View style={profileHeaderStyles.profileContainer}>
          <TextString
            textStyle={[
              profileHeaderStyles.profileDetails,
              profileHeaderStyles.profileName,
            ]}
          >
            John Smith
          </TextString>
          <TextString textStyle={profileHeaderStyles.profileDetails}>
            07502018862
          </TextString>
          <TextString textStyle={profileHeaderStyles.profileDetails}>
            johnsmith@mail.bcu.ac.uk
          </TextString>
        </View>
      </View>

      <View style={styles.line} />

      <View style={profileActionStyles.container}>
        <IconButtonLink
          name={ProfileConstants.EditProfile}
          children={"Edit Profile"}
        />
        <IconButtonLink
          name={ProfileConstants.SavedPlaces}
          children={"Saved Places"}
        />
        <IconButtonLink
          name={ProfileConstants.Settings}
          children={"Settings"}
        />
        <IconButtonLink
          name={ProfileConstants.ContactUs}
          children={"Contact Us"}
        />
        <IconButtonLink name={ProfileConstants.About} children={"About"} />
        <IconButtonLink
          name={ProfileConstants.Logout}
          children={"Logout"}
          onPress={logout}
        />
      </View>
    </View>
  );
}

export default ProfileScreen;

const rootStyles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primaryGrey,
  },
});

const profileActionStyles = StyleSheet.create({
  container: {
    position: "absolute",
    top: "33%",
    left: "15%",
    width: "60%",
    height: "50%",
    justifyContent: "space-between",
  },
});

const imageStyles = StyleSheet.create({
  imageContainer: {
    width: "11%",
    height: "100%",
    marginRight: "5%",
  },
});

const profileHeaderStyles = StyleSheet.create({
  container: {
    position: "absolute",
    top: "10%",
    width: "80%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  profileName: {
    fontSize: 30,
  },
  profileDetails: {
    color: Colors.primaryBlack,
    marginVertical: "5%",
  },
  profileContainer: {
    alignItems: "flex-start",
  },
});

const styles = StyleSheet.create({
  line: {
    position: "absolute",
    top: "25%",
    borderBottomColor: "black",
    borderBottomWidth: StyleSheet.hairlineWidth,
    backgroundColor: "black",
    height: 2,
    width: "80%",
  },
});

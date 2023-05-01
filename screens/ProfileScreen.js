import React, { useContext } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import Colors from "../styles/colors";
import imgPlaceHolder from "../assets/images/user_boy.png";
import { Caption, Title } from "react-native-paper";
import { AntDesign, Entypo, Feather } from "@expo/vector-icons";
import { AuthenticationContext } from "../store/context/AuthenticationContext";
import { ScreenNameConstants } from "../models/constants";
import { useNavigation } from "@react-navigation/native";
import PrimaryButton from "../components/ui/PrimaryButton";
import TextString from "../components/ui/TextString";

// profileActions is a list of profile actions and their icons
const profileActions = [
  {
    buttonName: "Edit Profile",
    buttonIcon: <Entypo name="pencil" size={24} color={Colors.primaryPurple} />,
    navigateTo: ScreenNameConstants.EditProfileScreenName,
  },
  {
    buttonName: "Settings",
    buttonIcon: (
      <AntDesign name="setting" size={24} color={Colors.primaryPurple} />
    ),
    navigateTo: ScreenNameConstants.SettingsScreenName,
  },
  {
    buttonName: "Contact Us",
    buttonIcon: <Feather name="phone" size={24} color={Colors.primaryPurple} />,
    navigateTo: ScreenNameConstants.ContactUsScreenName,
  },
  {
    buttonName: "About",
    buttonIcon: (
      <Entypo name="open-book" size={24} color={Colors.primaryPurple} />
    ),
    navigateTo: ScreenNameConstants.AboutScreenName,
  },
];

// imagePick handles the setting of user images
function imagePick() {
  // it is unimplemented at the moment
  console.log("UNIMPLEMENTED");
}

// ProfileScreen renders the profile screen for a user
function ProfileScreen() {
  // get the authentication context for auth information
  const authContext = useContext(AuthenticationContext);

  // get the navigation hook instance for moving through components
  const navigation = useNavigation();

  // profileActionHandler navigates to the provided route
  function profileActionHandler(route) {
    navigation.navigate(route);
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <View>
            <Image style={styles.image} source={imgPlaceHolder} />
            <TouchableOpacity
              onPress={imagePick}
              style={{ alignItems: "flex-end", top: -10 }}
            >
              <Entypo name="pencil" size={20} color={Colors.primaryPurple} />
            </TouchableOpacity>
          </View>
          <View style={styles.textContainer}>
            <Title>{authContext.authData.userDisplayName}</Title>
            <Caption>{authContext.authData.userEmail}</Caption>
            {authContext.authData.userPhoneNumber && (
              <Caption>{authContext.authData.userPhoneNumber}</Caption>
            )}
          </View>
        </View>

        <View
          style={{
            marginLeft: "10%",
            marginTop: "10%",
            marginBottom: "10%",
          }}
        >
          {profileActions.map((datum, index) => (
            <TouchableOpacity
              style={{ flexDirection: "row", alignItems: "center" }}
              key={index}
              onPress={() => profileActionHandler(datum.navigateTo)}
            >
              {datum.buttonIcon}
              <TextString
                textStyle={{
                  paddingLeft: "5%",
                  color: Colors.primaryBlack,
                  fontSize: 18,
                  marginVertical: "10%",
                }}
              >
                {datum.buttonName}
              </TextString>
            </TouchableOpacity>
          ))}
        </View>

        <PrimaryButton
          onPress={() =>
            profileActionHandler(ScreenNameConstants.LogoutScreenName)
          }
          customStyles={{
            marginHorizontal: "30%",
            backgroundColor: Colors.primaryRed,
          }}
        >
          Logout
        </PrimaryButton>
      </View>
    </SafeAreaView>
  );
}

export default ProfileScreen;

// styles holds the stylesheets for the main component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 14,
    backgroundColor: Colors.primaryWhite,
  },
  profileContainer: {
    alignItems: "center",
    marginTop: "5%",
  },
  textContainer: {
    alignItems: "center",
  },
  image: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderColor: Colors.primaryPurple,
    borderWidth: 3,
  },
  userInfo: {
    flex: 1,
  },
  bio: {
    borderRadius: 10,
    padding: 16,
    margin: 16,
  },
});

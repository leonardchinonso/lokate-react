import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import Colors from "../styles/colors";
import {
  NavigatorNameConstants,
  ScreenNameConstants,
} from "../models/constants";

import HomepageScreen from "../screens/HomepageScreen";
import PickStartLocationScreen from "../screens/PickStartLocationScreen";
import PickEndLocationScreen from "../screens/PickEndLocationScreen";
import LogoutScreen from "../screens/LogoutScreen";
import AddPlaceScreen from "../screens/AddPlaceScreen";
import EditPlaceScreen from "../screens/EditPlaceScreen";
import SearchResultScreen from "../screens/SearchResultScreen";
import JourneyResultScreen from "../screens/JourneyResultScreen";
import ProfileScreen from "../screens/ProfileScreen";
import PlacesScreen from "../screens/PlacesScreen";
import RouteResultScreen from "../screens/RouteResultScreen";
import EditProfileScreen from "../screens/EditProfileScreen";
import ContactUsScreen from "../screens/ContactUsScreen";
import AboutScreen from "../screens/AboutScreen";
import SettingsScreen from "../screens/SettingsScreen";

// create a stack navigator
const Stack = createNativeStackNavigator();

// create a bottom tab navigator
const BottomTab = createBottomTabNavigator();

// HomepageStackNavigator is the stack navigator for the homepage
function HomepageStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={ScreenNameConstants.HomepageScreenName}
        component={HomepageScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={NavigatorNameConstants.StartLocationNavigatorName}
        component={StartLocationStackNavigator}
        options={{ title: "Pick a start location" }}
      />
      <Stack.Screen
        name={NavigatorNameConstants.EndLocationNavigatorName}
        component={EndLocationStackNavigator}
        options={{ title: "Pick an end location" }}
      />
      <Stack.Screen
        name={ScreenNameConstants.JourneyResultScreen}
        component={JourneyResultScreen}
        options={{ headerShown: true, title: "Plan your journey" }}
      />
      <Stack.Screen
        name={ScreenNameConstants.RouteResultScreenName}
        component={RouteResultScreen}
        options={{ headerShown: true, title: "Route" }}
      />
      <Stack.Screen
        name={ScreenNameConstants.LogoutScreenName}
        component={LogoutScreen}
        options={{ headerShown: true, title: "Logout" }}
      />
    </Stack.Navigator>
  );
}

// StartLocationStackNavigator is the stack navigator for
// the pick a location page (start page)
function StartLocationStackNavigator({ route }) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={ScreenNameConstants.PickStartLocationScreenName}
        component={PickStartLocationScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ScreenNameConstants.SearchResultScreenName}
        component={SearchResultScreen}
        initialParams={route.params}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

// EndLocationStackNavigator is the stack navigator for
// the pick a location page (end page)
function EndLocationStackNavigator({ route }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={ScreenNameConstants.PickEndLocationScreenName}
        component={PickEndLocationScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ScreenNameConstants.SearchResultScreenName}
        component={SearchResultScreen}
        initialParams={route.params}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

// PlacesStackNavigator is the stack navigator for
// the places page
function PlacesStackNavigator({ route }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={ScreenNameConstants.SavedPlacesScreenName}
        component={PlacesScreen}
        options={{ headerShown: false, title: "Edit Place" }}
      />
      <Stack.Screen
        name={ScreenNameConstants.EditSavedPlaceScreen}
        component={EditPlaceScreen}
        initialParams={route.params}
        options={{ title: "Edit Place" }}
      />
      <Stack.Screen
        name={ScreenNameConstants.AddSavedPlaceScreen}
        component={AddPlaceScreen}
        initialParams={route.params}
        options={{ title: "Add Place" }}
      />
    </Stack.Navigator>
  );
}

// ProfileStackNavigator is the stack navigator for all profile actions
function ProfileStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={ScreenNameConstants.ProfileScreenName}
        component={ProfileScreen}
        options={{ headerShown: false, title: "Profile" }}
      />
      <Stack.Screen
        name={ScreenNameConstants.EditProfileScreenName}
        component={EditProfileScreen}
        options={{ title: "Edit Profile" }}
      />
      <Stack.Screen
        name={ScreenNameConstants.ContactUsScreenName}
        component={ContactUsScreen}
        options={{ title: "Contact Us" }}
      />
      <Stack.Screen
        name={ScreenNameConstants.AboutScreenName}
        component={AboutScreen}
        options={{ title: "About" }}
      />
      <Stack.Screen
        name={ScreenNameConstants.SettingsScreenName}
        component={SettingsScreen}
        options={{ title: "Settings" }}
      />
    </Stack.Navigator>
  );
}

// LandingBottomTabNavigator is the bottom tab navigator
function LandingBottomTabNavigator() {
  return (
    <BottomTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.primaryPurple,
      }}
    >
      <BottomTab.Screen
        name={NavigatorNameConstants.HomepageNavigatorName}
        component={HomepageStackNavigator}
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name={NavigatorNameConstants.PlacesNavigatorName}
        component={PlacesStackNavigator}
        options={{
          title: "Places",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="road" size={size} color={color} />
          ),
          headerShown: true,
          headerStyle: { backgroundColor: Colors.primaryPurple },
          headerTintColor: Colors.primaryWhite,
          tabBarShowLabel: false,
        }}
      />
      <BottomTab.Screen
        name={NavigatorNameConstants.ProfileNavigatorName}
        component={ProfileStackNavigator}
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

export default LandingBottomTabNavigator;

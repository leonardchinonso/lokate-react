import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign, FontAwesome5, Ionicons } from "@expo/vector-icons";

import Colors from "../styles/colors";
import {
  NavigatorNameConstants,
  ScreenNameConstants,
} from "../models/constants";
import SavedPlacesScreen from "../screens/SavedPlacesScreen";
import LastVisitedScreen from "../screens/LastVisitedScreen";
import ProfileScreen from "../screens/ProfileScreen";
import HomepageScreen from "../screens/HomepageScreen";
import PickStartLocationScreen from "../screens/PickStartLocationScreen";
import PickEndLocationScreen from "../screens/PickEndLocationScreen";
import LogoutScreen from "../screens/LogoutScreen";
import AddPlaceScreen from "../screens/AddPlaceScreen";
import EditPlaceScreen from "../screens/EditPlaceScreen";
import SearchResultScreen from "../screens/SearchResultScreen";
import JourneyResultScreen from "../screens/JourneyResultScreen";
import ProfileScreeenTwo from "../screens/ProfileScreeenTwo";
import PlacesScreen from "../screens/PlacesScreen";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const BottomTab = createBottomTabNavigator();

function HomepageStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={ScreenNameConstants.HomepageScreenName}
        component={HomepageScreen}
      />
      <Stack.Screen
        name={ScreenNameConstants.PickStartLocationScreenName}
        component={PickStartLocationScreen}
      />
      <Stack.Screen
        name={ScreenNameConstants.PickEndLocationScreenName}
        component={PickEndLocationScreen}
      />
      <Stack.Screen
        name={ScreenNameConstants.JourneyResultScreen}
        component={JourneyResultScreen}
      />
      <Stack.Screen
        name={ScreenNameConstants.SearchResultScreenName}
        component={SearchResultScreen}
      />
      <Stack.Screen
        name={ScreenNameConstants.LogoutScreenName}
        component={LogoutScreen}
      />
      <Stack.Screen
        name={ScreenNameConstants.AddSavedPlaceScreen}
        component={AddPlaceScreen}
      />
      <Stack.Screen
        name={ScreenNameConstants.EditSavedPlaceScreen}
        component={EditPlaceScreen}
      />
    </Stack.Navigator>
  );
}

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
          tabBarShowLabel: false,
        }}
      />
      <BottomTab.Screen
        name={ScreenNameConstants.SavedPlacesScreenName}
        component={PlacesScreen}
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
        name={ScreenNameConstants.ProfileScreenName}
        component={ProfileScreeenTwo}
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
          tabBarShowLabel: false,
        }}
      />
    </BottomTab.Navigator>
  );
}

export default LandingBottomTabNavigator;

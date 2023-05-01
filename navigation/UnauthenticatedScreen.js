import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ScreenNameConstants } from "../models/constants";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import WelcomeScreen from "../screens/WelcomeScreen";

// create a stack navigator
const Stack = createNativeStackNavigator();

// AuthenticationStackNavigation is the stack navigator for the
// authentication screens
export function AuthenticationStackNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={ScreenNameConstants.WelcomeScreenName}
        component={WelcomeScreen}
        options={{ headerShown: false, title: "" }}
      />
      <Stack.Screen
        name={ScreenNameConstants.SignupScreenName}
        component={SignupScreen}
        options={{ headerShown: true, title: "" }}
      />
      <Stack.Screen
        name={ScreenNameConstants.LoginScreenName}
        component={LoginScreen}
        options={{ headerShown: true, title: "" }}
      />
    </Stack.Navigator>
  );
}

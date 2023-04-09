import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ScreenNameConstants } from "../models/constants";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";

const Stack = createNativeStackNavigator();

function AuthenticationStackNavigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={ScreenNameConstants.LoginScreenName}
        component={LoginScreen}
      />
      <Stack.Screen
        name={ScreenNameConstants.SignupScreenName}
        component={SignupScreen}
      />
    </Stack.Navigator>
  );
}

export default AuthenticationStackNavigation;

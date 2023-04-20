import { useContext, useEffect, useState } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { AuthenticationStackNavigation } from "./navigation/UnauthenticatedScreen";
import LandingBottomTabNavigator from "./navigation/AuthenticatedScreens";
import AuthenticationContextProvider, {
  AuthenticationContext,
} from "./store/context/AuthenticationContext";
import SplashScreen from "./screens/SplashScreen";
import SavedPlaceContextProvider from "./store/context/SavedPlaceContext";
import RouteContextProvider from "./store/context/RouteContext";
import CurrentLocationContextProvider, {
  CurrentLocationContext,
} from "./store/context/CurrentLocationContext";
import * as Location from "expo-location";
import ErrorOverlay from "./components/ui/ErrorOverlay";
import SettingsContextProvider, {
  SettingsContext,
} from "./store/context/SettingsContext";
import { getItemFromAsyncStorage } from "./store/asyncStorage/main";

function Navigation() {
  const authContext = useContext(AuthenticationContext);

  return (
    <NavigationContainer>
      {authContext.isAuthenticated && <AuthenticationStackNavigation />}
      {!authContext.isAuthenticated && <LandingBottomTabNavigator />}
    </NavigationContainer>
  );
}

function Root() {
  const authContext = useContext(AuthenticationContext);
  const settingsContext = useContext(SettingsContext);

  const currentLocationContext = useContext(CurrentLocationContext);

  const [isTryingLogin, setIsTryingLogin] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchStorage() {
      const storedItems = await getItemFromAsyncStorage();

      const authData = {
        userId: storedItems.userId,
        userEmail: storedItems.email,
        userDisplayName: storedItems.displayName,
        userPhoneNumber: storedItems.phoneNumber ? storedItems.phoneNumber : "", // store empty if user does not have a phone yet
        accessToken: storedItems.accessToken,
        refreshToken: storedItems.refreshToken,
      };

      const userSettingsData = {
        appAppearance: storedItems.appAppearance,
        appPrecision: storedItems.appPrecision,
      };

      authContext.setAuthData(authData);
      settingsContext.setAppAppearance(userSettingsData.appAppearance);
      settingsContext.setAppPrecision(userSettingsData.appPrecision);

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setError("Permission to access location was denied");
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      currentLocationContext.setLocation(currentLocation.coords);

      await new Promise((resolve) => setTimeout(resolve, 3000));
    }

    fetchStorage().then(() => {
      setIsTryingLogin(false);
    });
  }, []);

  if (isTryingLogin) {
    return <SplashScreen />;
  }

  function dismissError() {
    setError(null);
  }

  if (error) {
    return <ErrorOverlay message={error} onConfirm={dismissError} />;
  }

  return <Navigation />;
}

export default function App() {
  return (
    <AuthenticationContextProvider>
      <CurrentLocationContextProvider>
        <SavedPlaceContextProvider>
          <RouteContextProvider>
            <SettingsContextProvider>
              {/*<CommsContextProvider>*/}
              <Root />
              {/*</CommsContextProvider>*/}
            </SettingsContextProvider>
          </RouteContextProvider>
        </SavedPlaceContextProvider>
      </CurrentLocationContextProvider>
    </AuthenticationContextProvider>
  );
}

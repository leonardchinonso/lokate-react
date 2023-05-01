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
import { STORAGE } from "./models/constants";
import { getItemsFromStorage } from "./store/on_device/main";

// Navigation renders the navigation based on the authentication of the user
function Navigation() {
  // get the authentication context for auth information
  const authContext = useContext(AuthenticationContext);

  return (
    <NavigationContainer>
      {!authContext.authData.isAuthenticated && (
        <AuthenticationStackNavigation />
      )}
      {authContext.authData.isAuthenticated && <LandingBottomTabNavigator />}
    </NavigationContainer>
  );
}

// Root renders the main app screens
function Root() {
  // get the authentication, settings and currentLocation contexts to store information in
  const authContext = useContext(AuthenticationContext);
  const settingsContext = useContext(SettingsContext);
  const currentLocationContext = useContext(CurrentLocationContext);

  // create a state for when user is trying to log in to render splash screen
  const [isLoadingAppData, setIsLoadingAppData] = useState(true);

  // create an error state to show error screen if there is a server error
  const [error, setError] = useState("");

  // loadAuthenticationAndUserSettings loads all the configurations for a particular user
  async function loadAuthenticationAndUserSettings(storageData) {
    // build the authentication data to store in the context API for use throughout the app
    const authData = {
      userId: storageData.userId,
      userFirstName: storageData.firstName,
      userLastName: storageData.lastName,
      userEmail: storageData.email,
      userDisplayName: storageData.displayName,
      userPhoneNumber: storageData.phoneNumber ? storageData.phoneNumber : "", // store empty if user does not have a phone yet
      accessToken: storageData.accessToken,
      refreshToken: storageData.refreshToken,
    };

    // set the authentication data in the Authentication Context
    authContext.setAuthData(authData, STORAGE);

    // build the user settings data to store in the context API for use throughout the app
    const userSettingsData = {
      appAppearance: storageData.appAppearance,
      appPrecision: storageData.appPrecision,
    };

    // set the settings data in the Settings Context
    settingsContext.setAppAppearance(userSettingsData.appAppearance);
    settingsContext.setAppPrecision(userSettingsData.appPrecision);
  }

  // loadAppFeatures fetches stored on-Device information, user's authentication,
  // user's settings and user's location and loads them in the context
  async function loadAppFeatures() {
    // get the authentication details from the chosen on-Device storage
    const storedItems = await getItemsFromStorage(STORAGE);

    // if an access token is stored, it means logged in, configure authentication and app settings
    if (storedItems.accessToken) {
      await loadAuthenticationAndUserSettings(storedItems);
    }

    // request the user's current location with the Location API
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setError("Permission to access location was denied");
      return;
    }

    // get the user's current position in lon/lat format
    let currentLocation = await Location.getCurrentPositionAsync({});

    // set the current position in the CurrentLocation Context for use throughout the app
    currentLocationContext.setLocation(currentLocation.coords);

    // simulate app loading and give time for promises to return
    await new Promise((resolve) => setTimeout(resolve, 3000));
  }

  useEffect(() => {
    // make a function call to load all app dependencies
    loadAppFeatures().then(() => {
      // once the storage is fetched and context is loaded,
      // set the login trying state to false to mark the end of preprocessing
      setIsLoadingAppData(false);
    });
  }, []);

  // if the app is still trying to set things up, show the splash screen
  if (isLoadingAppData) {
    return <SplashScreen />;
  }

  // dismissError dismisses the error view
  function dismissError() {
    setError(null);
  }

  // if there is an unexpected error, show the error display
  if (error) {
    return <ErrorOverlay message={error} onConfirm={dismissError} />;
  }

  return <Navigation />;
}

export default function App() {
  // embed the context in order of usage
  return (
    <AuthenticationContextProvider>
      <CurrentLocationContextProvider>
        <SavedPlaceContextProvider>
          <RouteContextProvider>
            <SettingsContextProvider>
              <Root />
            </SettingsContextProvider>
          </RouteContextProvider>
        </SavedPlaceContextProvider>
      </CurrentLocationContextProvider>
    </AuthenticationContextProvider>
  );
}

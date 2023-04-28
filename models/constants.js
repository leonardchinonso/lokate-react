/**
 * This file holds on constants that are reused throughout the app
 * */

// HomepageDestinationConstants holds the constants for the homepage
export const HomepageDestinationConstants = {
  GoSomewhere: "go_somewhere",
  GoHome: "go_home",
  GoToWork: "go_to_work",
  SavedPlaces: "saved_places",
  CurrentLocation: "current_location",
  Location: "location",
};

// ProfileConstants holds the constants for the profile
export const ProfileConstants = {
  EditProfile: "edit_profile",
  SavedPlaces: "saved_places",
  Settings: "settings",
  ContactUs: "contact_us",
  About: "about",
  Logout: "logout",
};

// UseAsConstants holds constants for the place aliases
export const UseAsConstants = {
  None: "NONE",
  Home: "HOME",
  Work: "WORK",
};

// AppearanceConstants holds constants for the
// app appearance in user settings
export const AppearanceConstants = {
  LightMode: "Light Mode",
  DarkMode: "Dark Mode",
};

// PrecisionConstants holds constants for the
// app precision in user settings
export const PrecisionConstants = {
  Approximate: "Approximate",
  Exact: "Exact",
};

// EmailSubjectConstants holds constants for the
// reasons drop down in contactUs
export const EmailSubjectConstants = {
  BusinessProposal: "Business Proposal",
  FeatureRequest: "Feature Request",
  IssuesAndComplaints: "Issues and Complaints",
  Other: "Other",
};

// TransportModeConstants holds constants for the
// various transport modes
export const TransportModeConstants = {
  Bus: "bus",
  Walk: "walking",
  Train: "train",
};

// ScreenNameConstants holds constants for the
// screen names and their navigation
export const ScreenNameConstants = {
  HomepageScreenName: "homepage_screen",
  PickStartLocationScreenName: "pick_start_location_screen",
  PickEndLocationScreenName: "pick_end_location_screen",
  JourneyResultScreen: "journey_result_screen",
  RouteResultScreenName: "route_result_screen",
  SearchResultScreenName: "search_result_screen",
  SavedPlacesScreenName: "saved_places_screen",
  AddSavedPlaceScreen: "add_saved_place_screen",
  EditSavedPlaceScreen: "edit_saved_place_screen",
  LastVisitedScreenName: "last_visited_screen",
  ProfileScreenName: "profile_screen",
  WelcomeScreenName: "welcome_screen",
  LoginScreenName: "login_screen",
  SignupScreenName: "signup_screen",
  LogoutScreenName: "logout_screen",
  EditProfileScreenName: "edit_profile_screen_name",
  SettingsScreenName: "settings_screen_name",
  ContactUsScreenName: "contactus_screen_name",
  AboutScreenName: "about_screen_name",
};

// NavigatorNameConstants holds constants for the
// navigator containers in the navigation screens
export const NavigatorNameConstants = {
  PlacesNavigatorName: "places_navigator",
  ProfileNavigatorName: "profile_navigator",
  HomepageNavigatorName: "homepage_navigator",
  StartLocationNavigatorName: "start_location_navigator",
  EndLocationNavigatorName: "end_location_navigator",
  AuthenticationNavigatorName: "authentication_navigator",
};

// ServerUrlConstants holds constants for the
// urls for http requests
export const ServerUrlConstants = {
  ServerBaseUrl: "http://192.168.0.144:8080/v1/",
  LoginUrl: "auth/login/",
  SignUpUrl: "auth/signup/",
  SavedPlacesUrl: "saved-places/",
  LastVisitedPlacesUrl: "places/last/",
  SearchPlacesUrl: "places/search?query=",
  JourneyLonLatUrl: "journey/lonlat?",
  EditProfileUrl: "user/update-profile",
  ContactUsUrl: "comms/contact-us",
  AboutUrl: "comms/about",
};

// HttpStatusCodes holds constants for status codes
export const HttpStatusCodes = {
  StatusOk: 200,
  StatusBadRequest: 400,
  StatusUnauthorized: 401,
};

// ConfigConstants holds the configured storage constants
export const ConfigConstants = {
  StorageAccessToken: "access_token",
  StorageRefreshToken: "refresh_token",
  StorageUserId: "user_id",
  StorageUserFirstName: "user_first_name",
  StorageUserLastName: "user_last_name",
  StorageUserEmail: "user_email",
  StorageUserDisplayName: "user_display_name",
  StorageUserPhoneNumber: "user_phone_number",
  StorageAppAppearance: "app_appearance",
  StorageAppPrecision: "app_precision",
  StorageAboutText: "about_text",
  MongoStorage: "mongo_storage",
  AsyncStorage: "async_storage",
};

// STORAGE holds the current onDevice storage choice
export const STORAGE = ConfigConstants.AsyncStorage; // can be AsyncStorage

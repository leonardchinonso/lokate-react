import { Alert, FlatList, SafeAreaView, StyleSheet, View } from "react-native";
import Colors from "../styles/colors";
import TextString from "../components/ui/TextString";
import { Header } from "../styles/text";
import SearchResultCard from "../components/ui/SearchResultCard";
import { useEffect, useState } from "react";
import ErrorOverlay from "../components/ui/ErrorOverlay";
import { HttpStatusCodes } from "../models/constants";
import { searchPlaces } from "../services/placeService";
import LoadingOverlay from "../components/ui/LoadingOverlay";

// SearchResultScreen renders the search result screen of picking a location
function SearchResultScreen({ route }) {
  // get the search query from the route provided by the parent component
  const { searchQuery, action } = route.params;

  // create a state to handle the loading state of the application
  const [isLoading, setIsLoading] = useState(true);

  // create a state to handle setting the result of the search
  const [results, setResults] = useState({
    places: [],
  });

  // create a state to hold unexpected errors
  const [error, setError] = useState("");

  // setResultsHandler handles setting the results in the state
  function setResultsHandler(places) {
    setResults(() => {
      return {
        places: places,
      };
    });
  }

  // retrieveSearchedPlaces calls the service to retrieve search results and handles the response
  async function retrieveSearchedPlaces() {
    // get the saved places from the savedPlaces service using the auth token
    const response = await searchPlaces(searchQuery);

    // if it comes back with a server error, display the error view
    if (response.error) {
      setError(response.error);
      return;
    }

    // if the request comes back with a 400, show pop up
    if (response.status === HttpStatusCodes.StatusBadRequest) {
      // show invalid pop up alert box
      Alert.alert("Invalid Request", response.message);
      return;
    }

    // if the request comes back with a 200
    if (response.status === HttpStatusCodes.StatusOk) {
      // set the state with the new results
      setResultsHandler(response.searchedPlaces);
    }
  }

  useEffect(() => {
    // make a call to retrieve the results
    retrieveSearchedPlaces().then(() => {
      // when the results are back, stop the loading overlay
      setIsLoading(false);
    });
    // use the route as dependency to listen for changes to it and reload the state
  }, [route]);

  // if the loading state is true, return the overlay
  if (isLoading) {
    return <LoadingOverlay />;
  }

  // dismissError dismisses the error view
  function dismissError() {
    setError(null);
  }

  // if there is an error, show the error overlay
  if (error) {
    return <ErrorOverlay message={error} onConfirm={dismissError} />;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={rootStyles.root}>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginTop: 20,
            marginBottom: 15,
          }}
        >
          <TextString textStyle={Header.text}>Which one?</TextString>
        </View>
        <View style={resultStyle.container}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={results.places}
            renderItem={({ item }) => (
              <View style={resultStyle.singleResult}>
                <SearchResultCard action={action}>{item}</SearchResultCard>
              </View>
            )}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

export default SearchResultScreen;

// rootStyles is the style sheet for the main component
const rootStyles = StyleSheet.create({
  root: {
    flex: 1,
    height: "100%",
    paddingHorizontal: 14,
    backgroundColor: Colors.primaryWhite,
  },
});

// resultStyle is the style sheet for the result listing
const resultStyle = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    flex: 1,
    paddingTop: 10,
  },
  singleResult: {
    marginVertical: "3%",
  },
});

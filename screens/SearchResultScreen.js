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

function SearchResultScreen({ route }) {
  const { searchQuery, action } = route.params;

  const [isLoading, setIsLoading] = useState(true);

  const [results, setResults] = useState({
    places: [],
  });
  const [error, setError] = useState("");

  function setResultsHandler(places) {
    setResults(() => {
      return {
        places: places,
      };
    });
  }

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
    retrieveSearchedPlaces().then(() => {
      setIsLoading(false);
    });
  }, [route]);

  if (isLoading) {
    return <LoadingOverlay />;
  }

  function dismissError() {
    setError(null);
  }

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

const rootStyles = StyleSheet.create({
  root: {
    flex: 1,
    height: "100%",
    paddingHorizontal: 14,
    backgroundColor: Colors.primaryWhite,
  },
});

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

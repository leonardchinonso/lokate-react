import { createContext, useReducer } from "react";

// define the initial state
const initialState = {
  savedPlaces: [],
};

// define actions on the state
const actions = {
  SET_SAVED_PLACES: "SET_SAVED_PLACES", // sets the saved places to the new one
  ADD_SAVED_PLACE: "ADD_SAVED_PLACE", // adds a saved place from a place object
  EDIT_SAVED_PLACE: "EDIT_SAVED_PLACE", // edits a saved place's name and alias by the id
  DELETE_SAVED_PLACE: "DELETE_SAVED_PLACE", // removes a saved place by the id
};

const savedPlaceReducer = (state, action) => {
  switch (action.type) {
    case actions.SET_SAVED_PLACES:
      console.log(actions.SET_SAVED_PLACES, ": ", action.payload);
      return {
        savedPlaces: action.payload,
      };
    case actions.ADD_SAVED_PLACE:
      return {
        savedPlaces: [
          {
            id: action.payload.id,
            name: action.payload.name,
            place_alias: action.payload.place_alias,
            userId: action.payload.userId,
          },
          ...state.savedPlaces,
        ],
      };
    case actions.EDIT_SAVED_PLACE:
      console.log(actions.EDIT_SAVED_PLACE, ": ", action.payload);
      for (let i in state.savedPlaces) {
        if (state.savedPlaces[i].id === action.payload.id) {
          state.savedPlaces[i].name = action.payload.name;
          state.savedPlaces[i].place_alias = action.payload.place_alias;
        }
      }
      console.log("NEW STATE: ", state.savedPlaces);
      return state;
    case actions.DELETE_SAVED_PLACE:
      return {
        savedPlaces: state.savedPlaces.filter(
          (place) => place.id !== action.payload.id
        ),
      };
    default:
      return state;
  }
};

export const SavedPlaceContext = createContext({
  savedPlaces: [],
  setSavedPlaces: (savedPlaces) => {},
  addSavedPlace: (savedPlace) => {},
  editSavedPlace: (savedPlace) => {},
  deleteSavedPlace: (savedPlace) => {},
});

const SavedPlaceContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(savedPlaceReducer, initialState);

  const value = {
    savedPlaces: state.savedPlaces,
    setSavedPlaces: (savedPlaces) => {
      dispatch({ type: actions.SET_SAVED_PLACES, payload: savedPlaces });
    },
    addSavedPlace: (savedPlace) => {
      dispatch({ type: actions.ADD_SAVED_PLACE, payload: savedPlace });
    },
    editSavedPlace: (savedPlace) => {
      dispatch({ type: actions.EDIT_SAVED_PLACE, payload: savedPlace });
    },
    deleteSavedPlace: (savedPlace) => {
      dispatch({ type: actions.EDIT_SAVED_PLACE, payload: savedPlace });
    },
  };

  return (
    <SavedPlaceContext.Provider value={value}>
      {children}
    </SavedPlaceContext.Provider>
  );
};

export default SavedPlaceContextProvider;

import { createContext, useReducer } from "react";

const dispatchMethods = {
  ADD: "ADD",
  DELETE: "DELETE",
};

export const UserTokenContext = createContext({
  userToken: "",
  isAuthenticated: false,
  addUserToken: () => {},
  deleteUserToken: () => {},
});

function userTokenReducer(state, action) {
  switch (action.type) {
    case dispatchMethods.ADD:
      return [{ ...action.payload }, ...state];
    case dispatchMethods.DELETE:
      return state.filter((userToken) => userToken.userId !== action.payload);
    default:
      return state;
  }
}

function UserTokenContextProvider({ children }) {
  const [userTokensState, dispatch] = useReducer(
    userTokenReducer,
    { toDo: [] },
    undefined
  );

  function addUserToken(userTokenData) {
    dispatch({ type: dispatchMethods.ADD, userTokenData });
  }

  function deleteUserToken(userId) {
    dispatch({ type: dispatchMethods.DELETE, userId });
  }

  const value = {
    userToken: userTokensState,
    addUserToken: (userTokenData) => {
      dispatch({ type: dispatchMethods.ADD, userTokenData });
    },
    deleteUserToken: deleteUserToken,
  };

  return (
    <UserTokenContext.Provider value={value}>
      {children}
    </UserTokenContext.Provider>
  );
}

export default UserTokenContextProvider;

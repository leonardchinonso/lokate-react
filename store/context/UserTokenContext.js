import { createContext, useReducer } from "react";

const dispatchMethods = {
  ADD: "ADD",
  DELETE: "DELETE",
};

export const UserTokenContext = createContext({
  userTokens: "",
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
    [],
    undefined
  );

  function addUserToken(userTokenData) {
    dispatch({ type: dispatchMethods.ADD, payload: userTokenData });
  }

  function deleteUserToken(userId) {
    dispatch({ type: dispatchMethods.DELETE, payload: userId });
  }

  const value = {
    userTokens: userTokensState,
    addUserToken: addUserToken,
    deleteUserToken: deleteUserToken,
  };

  return (
    <UserTokenContext.Provider value={value}>
      {children}
    </UserTokenContext.Provider>
  );
}

export default UserTokenContextProvider;

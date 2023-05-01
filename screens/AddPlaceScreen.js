import ModifyPlaceScreen from "./ModifyPlaceScreen";

// AddPlaceScreen is the component for adding a place
// it calls the Modify Place Screen component as a general component
function AddPlaceScreen({ route }) {
  return <ModifyPlaceScreen action={"add"} route={route} />;
}

export default AddPlaceScreen;

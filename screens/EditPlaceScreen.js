import ModifyPlaceScreen from "./ModifyPlaceScreen";

// EditPlaceScreen is the component for the edit place
function EditPlaceScreen({ route }) {
  return <ModifyPlaceScreen action={"edit"} route={route} />;
}

export default EditPlaceScreen;

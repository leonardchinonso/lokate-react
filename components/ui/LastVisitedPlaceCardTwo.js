import {
  TouchableWithoutFeedback,
  View,
  Text,
  StyleSheet,
  Image,
} from "react-native";
import Colors from "../../styles/colors";

function LastVisitedPlaceCardTwo({ children }) {
  return (
    <TouchableWithoutFeedback>
      <View style={styles.mainCardView}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={styles.subCardView}>
            <Image
              source={require("../../assets/images/user_boy.png")}
              resizeMode="contain"
              style={{
                borderRadius: 25,
                height: 50,
                width: 50,
              }}
            />
          </View>
          <View style={{ marginLeft: 12 }}>
            <Text
              style={{
                fontSize: 14,
                color: Colors.primaryBlack,
                fontWeight: "bold",
                textTransform: "capitalize",
              }}
            >
              {children.name}
            </Text>
            <View
              style={{
                marginTop: 4,
                borderWidth: 0,
                width: "85%",
              }}
            >
              <Text
                style={{
                  color: Colors.almostBlack,
                  fontSize: 12,
                }}
              >
                {children.name}
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            height: 25,
            backgroundColor: Colors.primaryPurple,
            borderWidth: 0,
            width: 25,
            marginLeft: -26,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 50,
          }}
        >
          <Text style={{ color: Colors.primaryWhite }}>Edit</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default LastVisitedPlaceCardTwo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primaryWhite,
  },
  mainCardView: {
    height: 90,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primaryWhite,
    borderRadius: 15,
    shadowColor: Colors.primaryBlack,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 8,
    flexDirection: "row",
    // justifyContent: 'space-between',
    paddingLeft: 16,
    paddingRight: 14,
    marginTop: 6,
    marginBottom: 6,
    marginLeft: 16,
    marginRight: 16,
  },
  subCardView: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: Colors.primaryBlack,
    borderColor: Colors.primaryPurple,
    borderWidth: 1,
    borderStyle: "solid",
    alignItems: "center",
    justifyContent: "center",
  },
});

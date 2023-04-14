import React from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import Colors from "../styles/colors";
import imgPlaceHolder from "../assets/images/user_boy.png";
// import ImagePicker, { openPicker } from "react-native-image-crop-picker";
import { Caption, Paragraph, Surface, Title } from "react-native-paper";
import { Entypo } from "@expo/vector-icons";
import { useState } from "react";

function ProfileScreeenTwo() {
  const [profile, setProfile] = useState(null);

  // const imagePick = () => {
  //   ImagePicker.openPicker({
  //     width: 400,
  //     height: 400,
  //     cropping: true,
  //   }).then((image) => {
  //     console.log(image);
  //     setProfile(image.path);
  //   });
  // };

  function imagePick() {
    console.log("Pressed");
  }

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.imgContainer}>
          <Image
            style={styles.image}
            source={profile ? { uri: profile } : imgPlaceHolder}
          />
          <TouchableOpacity
            onPress={imagePick}
            style={{ alignItems: "flex-end", top: -10 }}
          >
            <Entypo name="pencil" size={20} color={Colors.primaryPurple} />
          </TouchableOpacity>
        </View>
        <View style={styles.textContainer}>
          <Title>Chinonso Okoli</Title>
          <Caption>leokingluthers@gmail.com</Caption>
        </View>
      </View>
      {/*<View style={styles.userInfo}>*/}
      {/*  <Surface style={styles.bio}>*/}
      {/*    <Title>Bio</Title>*/}
      {/*    <Paragraph numberOfLines={4}>leokingluthers@gmail.com</Paragraph>*/}
      {/*  </Surface>*/}
      {/*</View>*/}
    </View>
  );
}

export default ProfileScreeenTwo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileContainer: {
    flex: 0.8,
    justifyContent: "center",
    alignItems: "center",
  },
  imgContainer: {},
  textContainer: {
    alignItems: "center",
  },
  image: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderColor: Colors.primaryPurple,
    borderWidth: 3,
  },
  userInfo: {
    flex: 1,
  },
  bio: {
    borderRadius: 10,
    padding: 16,
    margin: 16,
  },
});

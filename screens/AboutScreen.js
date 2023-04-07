import { StyleSheet, View } from "react-native";
import { Header } from "../styles/text";
import TextString from "../components/ui/TextString";
import Colors from "../styles/colors";
import { useEffect, useState } from "react";

function AboutScreen() {
  const [aboutText, setAboutText] = useState("");

  useEffect(() => {
    setAboutText(
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,\n" +
        "molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum\n" +
        "numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium\n" +
        "optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis\n" +
        "obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam\n" +
        "nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit,\n" +
        "tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit,\n" +
        "quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos \n" +
        "sapiente officiis modi at sunt excepturi expedita sint? Sed quibusdam\n" +
        "recusandae alias error harum maxime adipisci amet laborum. Perspiciatis \n" +
        "minima nesciunt dolorem! Officiis iure rerum voluptates a cumque velit \n" +
        "quibusdam sed amet tempora. Sit laborum ab, eius fugit doloribus tenetur \n" +
        "fugiat, temporibus enim commodi iusto libero magni deleniti quod quam \n" +
        "consequuntur! Commodi minima excepturi repudiandae velit hic maxime\n" +
        "doloremque. Quaerat provident commodi consectetur veniam similique ad \n" +
        "earum omnis ipsum saepe, voluptas, hic voluptates pariatur est explicabo \n" +
        "fugiat, dolorum eligendi quam cupiditate excepturi mollitia maiores labore \n" +
        "suscipit quas? Nulla, placeat. Voluptatem quaerat non architecto ab laudantium\n" +
        "modi minima sunt esse temporibus sint culpa, recusandae aliquam numquam \n" +
        "totam ratione voluptas quod exercitationem fuga. Possimus quis earum veniam \n" +
        "quasi aliquam eligendi, placeat qui corporis!"
    );
  });

  return (
    <View style={rootStyles.rootContainer}>
      <View style={Header.container}>
        <TextString textStyle={Header.text}>About</TextString>
      </View>
      <View style={aboutSectionStyles.container}>
        <View style={aboutSectionStyles.lokateText}>
          <TextString
            textStyle={{ color: Colors.primaryDarkBlue, fontSize: 30 }}
          >
            LOKATE
          </TextString>
        </View>
        <View style={aboutSectionStyles.content}>
          <TextString
            textStyle={{ color: Colors.primaryBlack, flexWrap: "wrap" }}
          >
            {aboutText}
          </TextString>
        </View>
      </View>
    </View>
  );
}

export default AboutScreen;

const rootStyles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primaryGrey,
  },
});

const aboutSectionStyles = StyleSheet.create({
  container: {
    position: "absolute",
    top: "20%",
    width: "80%",
    height: "70%",
    backgroundColor: Colors.primaryWhite,
  },
  content: {
    position: "absolute",
    top: "25%",
    padding: "5%",
    flexWrap: "wrap",
  },
  lokateText: {
    position: "absolute",
    top: "10%",
    left: "40%",
    justifyContent: "center",
    alignItems: "center",
  },
});

import * as React from "react";
import { Stack } from "expo-router";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { useContext } from "react";
import { bruhContext } from "./_layout.js";
import ColorPicker from "react-native-wheel-color-picker";
import { Themes } from "../assets/Themes/index.js";

let width = Dimensions.get("window").width;
let height = Dimensions.get("window").height;

export default function Game() {
  const { paddleColor1, setPaddleColor1, paddleColor2, setPaddleColor2 } =
    useContext(bruhContext);

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ header: () => null }} />
      <View style={styles.paddle1Info}>
        <Text style={styles.innerPaddleInfo}>Paddle 1 Hue:</Text>
        <Text style={styles.innerPaddleInfo}>{paddleColor1}</Text>
      </View>

      <ColorPicker
        color={paddleColor1}
        style={styles.colorPicker1}
        thumbSize={40}
        sliderSize={40}
        noSnap={true}
        row={false}
        onColorChangeComplete={setPaddleColor1}
      />

      <View style={styles.paddle2Info}>
        <Text style={styles.innerPaddleInfo}>Paddle 2 Hue:</Text>
        <Text style={styles.innerPaddleInfo}>{paddleColor2}</Text>
      </View>
      <ColorPicker
        color={paddleColor2}
        style={styles.colorPicker2}
        thumbSize={40}
        sliderSize={40}
        noSnap={true}
        row={false}
        onColorChangeComplete={setPaddleColor2}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: height,
    backgroundColor: Themes.colors.background,
  },
  colorPicker1: {
    position: "absolute",
    top: height / 16,
    width: width / 2,
    height: height / 3,
    left: width / 4,
  },
  colorPicker2: {
    position: "absolute",
    top: height / 1 / 2,
    width: width / 2,
    height: height / 3,
    marginLeft: width / 4,
  },
  paddle1Info: {
    flex: 1,
    position: "absolute",
    top: height / 7,
    left: width / 30,
    width: width / 5,
    height: width / 5,
  },
  paddle2Info: {
    flex: 1,
    position: "absolute",
    top: height / 1.72,
    left: width / 30,
    width: width / 5,
    height: width / 5,
  },
  innerPaddleInfo: {
    textAlign: "center",
    color: Themes.colors.text,
    fontFamily: Themes.fonts.primary,
    fontWeight: "bold",
    marginBottom: 12,
  },
});

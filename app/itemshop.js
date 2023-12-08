import * as React from "react";
import { Stack } from "expo-router";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { useContext } from "react";
import { bruhContext } from "./_layout.js";
import ColorPicker from "react-native-wheel-color-picker";
import { Themes } from "../assets/Themes/index.js";
import Slider from "@react-native-community/slider"; // Source: https://github.com/callstack/react-native-slider/tree/main

let width = Dimensions.get("window").width;
let height = Dimensions.get("window").height;

export default function Game() {
  const {
    paddleColor1,
    setPaddleColor1,
    paddleColor2,
    setPaddleColor2,
    difficulty,
    setDifficulty,
  } = useContext(bruhContext);

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ header: () => null }} />

      <View style={styles.paddle1Info}>
        <Text style={styles.innerInfo}>Paddle 1 Hue:</Text>
        <Text style={styles.innerInfo}>{paddleColor1}</Text>
      </View>
      <ColorPicker
        color={paddleColor1}
        style={styles.colorPicker1}
        thumbSize={40}
        sliderSize={40}
        noSnap={true}
        row={false}
        onColorChange={setPaddleColor1}
        onColorChangeComplete={setPaddleColor1}
      />

      <View style={styles.paddle2Info}>
        <Text style={styles.innerInfo}>Paddle 2 Hue:</Text>
        <Text style={styles.innerInfo}>{paddleColor2}</Text>
      </View>
      <ColorPicker
        color={paddleColor2}
        style={styles.colorPicker2}
        thumbSize={40}
        sliderSize={40}
        noSnap={true}
        row={false}
        onColorChange={setPaddleColor2}
        onColorChangeComplete={setPaddleColor2}
      />

      <View style={styles.difficultyInfo}>
        <Text style={styles.innerInfo}>Pong AI Difficulty:</Text>
        <Text style={styles.innerInfo}>{difficulty}</Text>
      </View>
      <Slider
        style={styles.difficultySlider}
        minimumValue={1}
        maximumValue={10}
        minimumTrackTintColor={Themes.colors.darkAccent}
        maximumTrackTintColor={Themes.colors.lightAccent}
        step={1}
        value={5}
        onValueChange={setDifficulty}
        onSlidingComplete={setDifficulty}
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
    top: height / 20,
    width: width / 2,
    height: height / 3,
    left: width / 4,
  },
  colorPicker2: {
    position: "absolute",
    top: (height / 20) * 9,
    width: width / 2,
    height: height / 3,
    marginLeft: width / 4,
  },
  paddle1Info: {
    flex: 1,
    position: "absolute",
    top: height / 20 + height / 12,
    left: width / 30,
    width: width / 5,
    height: width / 5,
  },
  paddle2Info: {
    flex: 1,
    position: "absolute",
    top: (height / 20) * 9 + height / 12,
    left: width / 30,
    width: width / 5,
    height: width / 5,
  },
  innerInfo: {
    textAlign: "center",
    color: Themes.colors.text,
    fontFamily: Themes.fonts.primary,
    fontWeight: "bold",
    marginBottom: 12,
  },
  difficultySlider: {
    position: "absolute",
    top: (height / 6) * 5,
    width: width / 2,
    height: height / 3,
    marginLeft: width / 4,
  },
  difficultyInfo: {
    flex: 1,
    position: "absolute",
    top: (height / 6) * 5 - height / 30,
    left: width / 30,
    width: width / 5,
    height: width / 5,
  },
});

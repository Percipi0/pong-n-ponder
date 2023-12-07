import * as React from "react";
import { WebView } from "react-native-webview";
import { useLocalSearchParams, Stack } from "expo-router";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  Pressable,
  Image,
  View,
  FlatList,
  Dimensions,
  ActivityIndicator,
  LogBox,
  TextInput,
  Alert,
  Screen,
} from "react-native";
import { useContext } from "react";
import { TestContext } from "../utils/TestContext.js";
import { bruhContext } from "./_layout.js";
import ColorPicker from "react-native-wheel-color-picker";

async function getRoom() {
  const data = await Room.loadOrCreate(id, username, socket);
  console.log(data);
}

export default function Game() {
  const params = useLocalSearchParams();
  console.log(params);

  const { paddleColor1, setPaddleColor1, paddleColor2, setPaddleColor2 } =
    useContext(bruhContext);

  return (
    <View>
      <Text>{paddleColor1}</Text>
      <Text>{paddleColor2}</Text>

      <ColorPicker
        thumbSize={40}
        sliderSize={40}
        noSnap={true}
        row={true}
        onColorChangeComplete={setPaddleColor1}
      />
      <ColorPicker
        style={styles.colorPicker1}
        thumbSize={40}
        sliderSize={40}
        noSnap={true}
        row={true}
        onColorChangeComplete={setPaddleColor2}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  colorPicker1: {
    marginTop: 500,
  },
});

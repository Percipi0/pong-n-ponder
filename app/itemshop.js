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

async function getRoom() {
  const data = await Room.loadOrCreate(id, username, socket);
  console.log(data);
}

export default function Game() {
  const params = useLocalSearchParams();
  console.log(params);

  return (
    <View>
      <Text>hi</Text>
    </View>
  );
}

import { Stack } from "expo-router/";
import { useLocalSearchParams } from "expo-router";
import { Themes } from "../assets/Themes/index.js";
import { Dimensions } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

let width = Dimensions.get("window").width;
let height = Dimensions.get("window").height;

import { Tabs, useRouter } from "expo-router";

import { Platform, View, ScrollView, Pressable } from "react-native";

import { createContext, useState } from "react";

export const bruhContext = createContext();

export default function Layout() {
  const [paddleColor1, setPaddleColor1] = useState(Themes.colors.VSOrange);
  const [paddleColor2, setPaddleColor2] = useState(Themes.colors.VSGreen);

  const router = useRouter();

  return (
    <bruhContext.Provider
      value={{ paddleColor1, setPaddleColor1, paddleColor2, setPaddleColor2 }}
    >
      <Tabs
        screenOptions={{
          tabBarHideOnKeyboard: true,
          tabBarActiveTintColor: Themes.colors.VSOrange,
          tabBarInactiveTintColor: "white",
          tabBarLabelStyle: { fontFamily: Themes.fonts.primary },
          tabBarStyle: [
            {
              position: "absolute",
              backgroundColor: Themes.colors.background,
              borderTopWidth: 2,
              borderTopColor: Themes.colors.lightAccent,
              paddingBottom: Platform.OS === "ios" ? height / 40 : height / 100,
              paddingTop: Platform.OS === "ios" ? height / 180 : height / 200,
              height: height / 12,
            },
            null,
          ],
        }}
      >
        <Tabs.Screen
          name="about"
          options={{
            title: "Synopsis",
            headerTitle: "Synopsis",
            tabBarLabel: "Synopsis",
            tabBarIcon: () => (
              <AntDesign
                name="questioncircleo"
                size={24}
                color={Themes.colors.lightAccent}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="index"
          options={{
            title: "Ponder",
            headerTitle: "Ponder",
            tabBarLabel: "Ponder",
            tabBarIcon: () => (
              <AntDesign
                name="rest"
                size={24}
                color={Themes.colors.lightAccent}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="itemshop"
          options={{
            title: "Boutique",
            headerTitle: "Boutique",
            tabBarLabel: "Boutique",
            tabBarIcon: () => (
              <Ionicons
                name="md-shirt-outline"
                size={24}
                color={Themes.colors.lightAccent}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="pong"
          options={{
            href: null,
            tabBarStyle: { display: "none" },
          }}
        />
      </Tabs>
    </bruhContext.Provider>
  );
}

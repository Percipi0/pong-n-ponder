import { Stack } from "expo-router/";
import { useLocalSearchParams } from "expo-router";
import { Themes } from "../assets/Themes/index.js";
import { Dimensions } from "react-native";
import { AntDesign } from "@expo/vector-icons";

let width = Dimensions.get("window").width;
let height = Dimensions.get("window").height;

import { Tabs } from "expo-router";

import { Platform, View, ScrollView } from "react-native";

export default function Layout() {
  return (
    <>
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
          name="pong"
          options={{
            title: "Boutique",
            headerTitle: "Boutique",
            tabBarLabel: "Boutique",
            tabBarIcon: () => (
              <AntDesign
                name="shoppingcart"
                size={24}
                color={Themes.colors.lightAccent}
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
}

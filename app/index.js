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
  AppState,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useState, useEffect, useRef, createRef } from "react";
import { Themes } from "../assets/Themes/index.js";
import { Stack } from "expo-router/stack";
import { Link, useRouter, Tabs } from "expo-router/";
import { Drawer } from "expo-router/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import apiRequest from "../utils/apirequest.js";
import io from "socket.io-client";
import Room from "../utils/room.js";
import * as Updates from "expo-updates";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { philosophers } from "../utils/philosophers.js";

let width = Dimensions.get("window").width;
let height = Dimensions.get("window").height;
let URL = "http://10.31.11.154:1930";

export const socket = io(URL);
const keyboardVerticalOffset = Platform.OS === "ios" ? 50 : -height / 3.78;
const keyboardVerticalOffset2 = Platform.OS === "ios" ? 50 : -height / 2;

export default function App() {
  LogBox.ignoreAllLogs(true);

  const [username, onChangeName] = useState(null);
  const [id, onChangeId] = useState(null);
  const [room, setRoom] = useState(null);
  const [curMessage, onChangeMessageBox] = useState(null);
  const [philosopher, onChangePhilosopher] = useState("");
  const router = useRouter();

  //used to clear message input box upon submit
  messageInput = createRef();

  //used to add philosopher name to input box
  usernameInput = createRef();

  //connect event handler
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server");
    });

    return () => {
      socket.off("connect");
    };
  }, []);
  // I am logan and I am a huge nerd
  //room update event handler
  useEffect(() => {
    socket.on("roomUpdate", (msg) => {
      if (msg["id"] === id) {
        if (msg["message"] === "player2 joined") {
          console.log(msg);
          updateRoom(socket);
          /*router.push({
            pathname: "/pong",
            params: {
              curUser: username,
              player1: room.player1,
              player2: room.player2,
              socket: socket,
            },
          });*/
        } else if (msg["message"] === "room updated") {
          updateRoom(socket);
        }
      }
    });

    return () => {
      socket.off("roomUpdate");
    };
  }, [id]);

  //room update event handler
  useEffect(() => {
    socket.on("playerLost", async (msg) => {
      if (id === null || id === "") return;
      if (msg === id) {
        Alert.alert("Your fellow philosopher departed!");
        setTimeout(async () => {
          await Room.delete(id);
          Updates.reloadAsync();
        }, 2000);
      }
    });

    return () => {
      socket.off("playerLost");
    };
  }, [id]);

  //ensure user input is well-formed. if it is, run getRoom()
  function testInput() {
    if (username === null || username === "") {
      Alert.alert("Your username cannot be empty!");
      return;
    }

    //change check back to === 6 later
    if (id === null || id.length <= 0) {
      Alert.alert("Room ID must be between 1 and 6 characters long!");
      return;
    }

    getRoom();
    return;
  }

  //make new room and sync data with server
  async function getRoom() {
    const data = await Room.loadOrCreate(id, username, socket);
    if (data === "name already taken!" || data === "room is full!") return;
    setRoom(data);

    return;
  }

  //call this function when we need to refresh our room
  async function updateRoom() {
    let data = await Room.update(id, socket);
    setRoom(data);
    console.log(data);
  }

  //define message object
  const Message = ({ message, sender, notification }) => {
    return (
      <View style={styles.message}>
        {notification === false ? (
          <Text
            style={
              sender === username ? styles.player1Sender : styles.player2Sender
            }
          >
            {sender + ": "}
            <Text style={styles.messageContent}>{message}</Text>
          </Text>
        ) : (
          <Text style={styles.notification}>{sender + " " + message}</Text>
        )}
      </View>
    );
  };

  //take user text input, add to messages flatlist, send to server
  async function sendMessage() {
    messageInput.current.clear();
    onChangeMessageBox("");
    if (curMessage === null || curMessage === "") {
      Alert.alert("Your message cannot be empty! Or can it?");
      return;
    }
    let newRoom = await Room.sendMessageAndUpdate(
      id,
      username,
      curMessage,
      socket
    );
    setRoom(newRoom);
  }

  //rendering function for messages flatlist
  const renderItem = ({ item }) => (
    <Message
      message={item.message}
      sender={item.sender}
      notification={item.notification}
    />
  );

  //display room particulars when info button is clicked
  function infoAlert() {
    Alert.alert(
      "Particulars",
      "Room ID: " +
        id +
        "\n" +
        "Ponderer 1: " +
        room.player1 +
        "\n" +
        "Ponderer 2: " +
        room.player2
    );
  }

  //get name from philosopher array, then populate username textinput component
  function getPhilosopher() {
    let myPhilosopher =
      philosophers[Math.floor(Math.random() * philosophers.length)];
    //console.log(myPhilosopher);
    usernameInput.current.clear();
    onChangeName(myPhilosopher);
    onChangePhilosopher(myPhilosopher);
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ header: () => null }} />
      {room === null ? (
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "position"}
          keyboardVerticalOffset={keyboardVerticalOffset2}
          style={styles.joinRoomContainer}
        >
          <Text style={styles.joinRoomPrompt}>Enter a moniker:</Text>
          <TextInput
            selectionColor={Themes.colors.text}
            maxLength={12}
            style={styles.joinRoomInput}
            onChangeText={onChangeName}
            autoCorrect={false}
            placeholder={philosopher}
            placeholderTextColor={Themes.colors.text}
            ref={usernameInput}
          ></TextInput>
          <Pressable onPress={getPhilosopher} style={styles.diceWrapper}>
            <MaterialCommunityIcons
              name="dice-multiple-outline"
              size={24}
              color="black"
              style={styles.dice}
            />
          </Pressable>
          <Text style={styles.joinRoomPrompt}>Enter a room ID:</Text>
          <TextInput
            selectionColor={Themes.colors.text}
            maxLength={6}
            style={styles.joinRoomInput}
            onChangeText={onChangeId}
            autoCorrect={false}
          ></TextInput>
          <Pressable onPress={testInput} style={styles.joinRoomBtn}>
            <Text style={styles.joinRoomBtnText}>Begin</Text>
          </Pressable>
        </KeyboardAvoidingView>
      ) : null}
      {room != null ? (
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "padding"}
          keyboardVerticalOffset={keyboardVerticalOffset}
          style={styles.keyboardAvoidingView}
        >
          <View style={styles.promptWrapper}>
            <Text style={styles.prompt}>{room.chat.prompt}</Text>
          </View>

          <Pressable
            style={styles.exitWrapper}
            onPress={() => {
              Updates.reloadAsync();
            }}
          >
            <AntDesign style={styles.exit} name="logout" />
          </Pressable>

          <Pressable style={styles.infoWrapper} onPress={infoAlert}>
            <AntDesign style={styles.info} name="infocirlce" />
          </Pressable>

          <FlatList
            style={styles.messages}
            data={room.chat.messages}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            inverted={true}
          />

          <View style={styles.inputContainer}>
            <Link
              asChild
              style={styles.playLink}
              href={{
                pathname: "/pong",
                params: {
                  curUser: username,
                  player1: room.player1,
                  player2: room.player2,
                  roomId: id,
                  socket: socket,
                },
              }}
            >
              <Pressable style={styles.chatButton}>
                <MaterialCommunityIcons
                  name="gamepad-square-outline"
                  style={styles.chatButtonInner}
                />
              </Pressable>
            </Link>
            <TextInput
              selectionColor={Themes.colors.text}
              ref={messageInput}
              style={styles.chatInput}
              onChangeText={onChangeMessageBox}
              maxLength={500}
            ></TextInput>
            <Pressable onPress={sendMessage} style={styles.chatButton}>
              <AntDesign style={styles.chatButtonInner} name="right" />
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Themes.colors.background,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    width: width,
  },
  joinRoomContainer: {
    flex: 1,
    flexDirection: "column",
    marginTop: height / 3,
    //height: height,
    //width: width,
    justifyContent: "center",
    marginLeft: width / 14.5,
  },
  joinRoomPrompt: {
    color: Themes.colors.text,
    fontFamily: Themes.fonts.primary,
    fontSize: width / 20,
    paddingBottom: height / 50,
    paddingTop: height / 40,
  },
  joinRoomInput: {
    width: width / 2.1,
    marginBottom: height / 10,
    borderRadius: 5,
    height: height / 30,
    backgroundColor: Themes.colors.background,
    color: Themes.colors.text,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: Themes.colors.lightAccent,
    paddingLeft: 5,
    fontFamily: Themes.fonts.primary,
  },
  joinRoomBtn: {
    marginTop: -height / 16,
    width: width / 4,
    height: height / 20,
    backgroundColor: "red",
    borderRadius: 5,
    backgroundColor: Themes.colors.background,
    borderColor: Themes.colors.lightAccent,
    borderWidth: 2,
    marginLeft: width / 9,
  },
  joinRoomBtnText: {
    textAlign: "center",
    verticalAlign: "middle",
    lineHeight: height / 25,
    fontFamily: Themes.fonts.primary,
    color: Themes.colors.text,
  },
  diceWrapper: {
    width: height / 30,
    height: height / 30,
    backgroundColor: "blue",
    marginTop: -height / 7.48,
    marginLeft: width / 2,
    justifyContent: "center",
    borderRadius: 20,
    backgroundColor: Themes.colors.background,
    borderColor: Themes.colors.lightAccent,
    borderWidth: 2,
  },
  dice: {
    color: "white",
    fontSize: width * 0.04,
    textAlign: "center",
    //marginRight: -width / 1.8,
    //marginTop: -height / 7.7,
  },
  messages: {
    backgroundColor: Themes.colors.background,
    width: width,
    height: Platform.OS === "ios" ? height * 0.62 : height * 0.6,
    marginTop: Platform.OS === "ios" ? height / 70 : height / 70,
    borderWidth: 2,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderColor: Themes.colors.lightAccent,
    color: "white",
    paddingTop: 1,
    paddingBottom: 1,
    //minHeight: Platform.OS === "ios" ? 0 : height * 0.6,
  },
  message: {
    color: "white",
    //justifyContent: "space-between",
    //flexShrink: 1,
    //alignItems: "center",
    //verticalAlign: "middle",
    width: width,
    //height: height / 10,
    //minHeight: 20,
    paddingTop: height / 200,
    paddingBottom: height / 200,
    flex: 1,
    justifyContent: "flex-start",
    flexDirection: "row",
    marginLeft: width / 40,
    maxWidth: width,
  },
  messageContent: {
    position: "relative",
    color: Themes.colors.text,
    fontSize: 15,
    fontFamily: Themes.fonts.primary,
  },
  player1Sender: {
    fontFamily: Themes.fonts.primary,
    color: Themes.colors.VSOrange,
    marginRight: width / 40,
  },
  player2Sender: {
    fontFamily: Themes.fonts.primary,
    color: Themes.colors.VSGreen,
    marginRight: width / 40,
  },
  promptWrapper: {
    //backgroundColor: "green",
    marginTop: height / 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: width / 10,
    marginRight: width / 10,
    minHeight: height / 15,
  },
  prompt: {
    textAlign: "center",
    fontWeight: "bold",
    color: Themes.colors.text,
    fontSize: 18,
    //color: "#80FFAF",
    fontFamily: Themes.fonts.primary,
  },
  chatRoomHeader: {
    flex: 1,
    flexDirection: "row",
    marginLeft: width / 35,
    marginRight: width / 35,
    position: "absolute",
    justifyContent: "center",
    color: "white",
    left: 0,
    right: 0,
    bottom: 8,
  },
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    marginTop: Platform.OS === "ios" ? height * 0.01 : height * 0.01,
    //marginBottom: Platform.OS === "ios" ? -height / 5.5 : 0,
    //marginLeft: width * 0.05,
    minPadding: 2,
  },
  chatInput: {
    width: width * 0.6,
    height: width * 0.1,
    backgroundColor: Themes.colors.background,
    color: Themes.colors.text,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: Themes.colors.lightAccent,
    paddingLeft: 5,
    fontFamily: Themes.fonts.primary,
  },
  chatButton: {
    marginLeft: width * 0.03,
    marginRight: width * 0.03,
    width: width * 0.1,
    height: width * 0.1,
    padding: 0,
    backgroundColor: Themes.colors.background,
    borderColor: Themes.colors.lightAccent,
    borderWidth: 2,
    borderRadius: 20,
    justifyContent: "center",
  },
  chatButtonInner: {
    color: "white",
    fontSize: width * 0.05,
    textAlign: "center",
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  infoWrapper: {
    position: "absolute",
    top: height / 15,
    right: width / 40,
  },
  info: {
    color: Themes.colors.lightAccent,
    fontSize: width * 0.05,
    fontFamily: Themes.fonts.primary,
  },
  exitWrapper: {
    position: "absolute",
    top: height / 15,
    left: width / 40,
  },
  exit: {
    color: Themes.colors.lightAccent,
    fontSize: width * 0.05,
    fontFamily: Themes.fonts.primary,
  },
  notification: {
    fontSize: 15,
    fontFamily: Themes.fonts.primary,
    fontStyle: "italic",
    color: "grey",
  },
});

import apiRequest from "./apirequest.js";

export default class Room {
  //returns a Room instance, creating the Room if necessary
  static async loadOrCreate(roomId, player, socket) {
    try {
      let data = await apiRequest("GET", "/rooms/" + roomId);
      let curRoom = new Room(data);

      if (curRoom.player2 === "") {
        let data = await apiRequest("PATCH", "/rooms/" + roomId, {
          player1: curRoom.player1,
          player2: player,
        });
        curRoom = new Room(data);
        socket.emit("roomUpdate", {
          id: roomId,
          message: "player2 joined",
        });
        return curRoom;
      }
      return curRoom;
    } catch (error) {
      if (
        (error.message === "room is full!") |
        (error.message === "name already taken!")
      ) {
        alert(error.message);
        return error.message;
      }
      let data = await apiRequest("POST", "/rooms", {
        id: roomId,
        player1: player,
        player2: "",
        game: null,
      });
      let curRoom = new Room(data, socket);
      socket.emit("roomUpdate", {
        id: roomId,
        message: "player1 joined",
      });
      return curRoom;
    }
  }

  static async update(roomId, socket) {
    let data = await apiRequest("GET", "/update/" + roomId);
    console.log(data);
    let curRoom = new Room(data, socket);
    return curRoom;
  }

  static async setUpdate(roomId, player1, player2, game, chat) {
    let data = await apiRequest("PATCH", "/room_update/" + roomId, {
      id: roomId,
      player1: player1,
      player2: player2,
      game: game,
      chat: chat,
    });
    let curRoom = new Room(data);
    curRoom.socket.emit("roomUpdate", {
      id: roomId,
      message: "room updated",
    });
  }

  static async sendMessageAndUpdate(roomId, sender, message, socket) {
    let data = await apiRequest("PATCH", "/room_update_message/" + roomId, {
      id: roomId,
      sender: sender,
      message: message,
    });
    let curRoom = new Room(data, socket);
    curRoom.socket.emit("roomUpdate", {
      id: roomId,
      message: "room updated",
    });
    return curRoom;
  }

  static async pongUpdate(roomId, sender, message, socket) {
    let data = await apiRequest("PATCH", "/room_update_game/" + roomId, {
      id: roomId,
      sender: sender,
      message: message,
    });
    let curRoom = new Room(data, socket);

    curRoom.socket.emit("roomUpdate", {
      id: roomId,
      message: "room updated",
    });
    return curRoom;
  }

  static async delete(roomId) {
    await apiRequest("DELETE", "/rooms/" + roomId);
  }

  constructor(data, socket) {
    this.socket = socket;
    this.roomId = data["id"];
    this.player1 = data["player1"];
    this.player2 = data["player2"];
    this.game = data["game"];
    this.chat = data["chat"];
  }
}

import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  PanResponder,
  Animated,
} from "react-native";
import Constants from "../utils/Constants";
import { GameEngine } from "react-native-game-engine";
import Matter from "matter-js";
import Physics from "../utils/Physics";
import Renderer from "../utils/Renderer";

import { colors } from "../assets/Themes/colors.js";
import { Stack } from "expo-router/stack";
import { useLocalSearchParams } from "expo-router";
import { useState, useEffect } from "react";
import io from "socket.io-client";
import Room from "../utils/room.js";
//import socket from "./index.js";

const URL = "http://10.31.11.154:1930";

const socket = io(URL, { transports: ["websocket"] });

class Pong extends Component {
  // Sets up physics engine, mouse tracker, and renderable objects
  constructor(props) {
    super(props);
    this.curUser = props.curUser;
    this.player1 = props.player1;
    this.player2 = props.player2;
    this.roomId = props.roomId;
    this.moveTally = 0;
    this.gameEngine = null;
    this.entities = this.setupWorld();
    this.leftPaddlePosition = new Animated.ValueXY({
      x: Constants.LEFT_PADDLE_X,
      y: Constants.PADDLE_Y_START,
    });
    this.rightPaddlePosition = new Animated.ValueXY({
      x: Constants.RIGHT_PADDLE_X,
      y: Constants.PADDLE_Y_START,
    });
    this.physicsProps = {
      curUser: this.curUser,
      player1: this.player1,
      player2: this.player2,
      leftPaddlePosition: this.leftPaddlePosition,
      rightPaddlePosition: this.rightPaddlePosition,
    };
    // Touch detection
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        let fingerY = gesture.moveY;
        const minY = Constants.WALL_HEIGHT - Constants.PADDLE_HEIGHT / 2;
        const maxY = Constants.MAX_HEIGHT - Constants.WALL_HEIGHT;
        if (fingerY < minY) fingerY = minY;
        else if (fingerY > maxY) fingerY = maxY;
        if (this.curUser === this.player1) {
          Animated.spring(this.leftPaddlePosition, {
            toValue: { x: Constants.LEFT_PADDLE_X, y: fingerY },
            useNativeDriver: false,
          }).start();
        } else if (this.curUser === this.player2) {
          Animated.spring(this.rightPaddlePosition, {
            toValue: { x: Constants.RIGHT_PADDLE_X, y: fingerY },
            useNativeDriver: false,
          }).start();
        }
        Animated.spring(this.leftPaddlePosition, {
          toValue: { x: Constants.LEFT_PADDLE_X, y: gesture.moveY },
          useNativeDriver: false,
        }).start();
        //console.log(this.entities.leftPaddle.body.position.y);
        /*console.log(
          this.entities.leftPaddle.body.position.x +
            ", " +
            this.entities.leftPaddle.body.position.y
        );*/

        //send paddle position to server
        this.moveTally++;
        if (this.moveTally === 50) {
          sendUpdate(
            this.roomId,
            this.curUser,
            this.entities.leftPaddle.body.position.y.toFixed(2),
            0
          );
          this.moveTally = 0;
        }
      },
    });
    this.state = {
      running: false,
      p1ready: true, // TODO: Should be false once multiplayer communication is finished
      p2ready: true, // TODO: Should be false once multiplayer communication is finished
      p1score: 0,
      p2score: 0,
      ballSpeed: Constants.NORMAL_BALL_SPEED,
    };
  }

  /**
   * Defines engine, world, and objects,
   * and houses engine-dependent functions
   * @returns rendered physics and objects
   */
  setupWorld = () => {
    let engine = Matter.Engine.create({ enableSleeping: false });
    engine.gravity.scale = 0; // Disables gravity
    let world = engine.world;
    let floor = Matter.Bodies.rectangle(
      Constants.MAX_WIDTH / 2,
      Constants.MAX_HEIGHT - 25,
      Constants.MAX_WIDTH,
      Constants.WALL_HEIGHT,
      { isStatic: true }
    );
    let ceiling = Matter.Bodies.rectangle(
      Constants.MAX_WIDTH / 2,
      25,
      Constants.MAX_WIDTH,
      50,
      { isStatic: true }
    );
    let leftPaddle = Matter.Bodies.rectangle(
      Constants.LEFT_PADDLE_X,
      Constants.PADDLE_Y_START,
      Constants.PADDLE_WIDTH,
      Constants.PADDLE_HEIGHT,
      { label: "leftPaddle", isStatic: true }
    );
    let rightPaddle = Matter.Bodies.rectangle(
      Constants.RIGHT_PADDLE_X,
      Constants.PADDLE_Y_START,
      Constants.PADDLE_WIDTH,
      Constants.PADDLE_HEIGHT,
      { label: "rightPaddle", isStatic: true }
    );
    let leftGoal = Matter.Bodies.rectangle(
      0,
      Constants.MAX_HEIGHT / 2,
      1,
      Constants.MAX_HEIGHT,
      { label: "leftGoal", isStatic: true }
    );
    let rightGoal = Matter.Bodies.rectangle(
      Constants.MAX_WIDTH,
      Constants.MAX_HEIGHT / 2,
      1,
      Constants.MAX_HEIGHT,
      { label: "rightGoal", isStatic: true }
    );
    let ball = Matter.Bodies.rectangle(
      Constants.BALL_X_START,
      Constants.BALL_Y_START,
      Constants.BALL_LENGTH,
      Constants.BALL_LENGTH,
      { label: "ball", friction: 0, frictionAir: 0, frictionStatic: 0 }
    );

    Matter.World.add(world, [
      floor,
      ceiling,
      leftPaddle,
      rightPaddle,
      leftGoal,
      rightGoal,
      ball,
    ]);

    Matter.Events.on(engine, "afterUpdate", async (event) => {
      /*console.log(
        "Ball Position: (" +
          this.entities.ball.body.position.x +
          ", " +
          this.entities.ball.body.position.y +
          ")"
      );*/
    });

    /**
     * When two objects collide,
     * check if one of the objects is the ball.
     * If one of the objects is the ball,
     * bounce the ball off the object it hit
     * or reset the ball.
     */
    Matter.Events.on(engine, "collisionStart", (event) => {
      const pairs = event.pairs;

      // Iterates through all collision pairs this frame just in case multiple things collided
      for (const pair of pairs) {
        let collision = [pair.bodyA, pair.bodyB];

        /**
         * If ball hit something,
         * ensure collision[0] = object ball hit
         * and ensure collision[1] = ball.
         *
         * Since ball is rendered last,
         * this should never be needed,
         * but just in case...
         */
        if (collision[0].label === "ball") {
          const temp = collision[1]; // Temp store object ball hit
          collision[1] = collision[0]; // Set collision[1] = ball
          collision[0] = temp; // Set collision[0] = object ball hit
        }

        if (collision[1].label === "ball") {
          if (collision[0].label === "leftPaddle") {
            this.bounceBall(collision[0], collision[1], 1); // Bounce right
          } else if (collision[0].label === "rightPaddle") {
            this.bounceBall(collision[0], collision[1], -1); // Bounce left
          } else if (collision[0].label === "leftGoal") {
            this.setState({ p2score: this.state.p2score + 1 });
            this.resetBall(true, collision[0], collision[1]); // Reset ball & bounce right
          } else if (collision[0].label === "rightGoal") {
            this.setState({ p1score: this.state.p1score + 1 });
            this.resetBall(false, collision[0], collision[1]); // Reset ball & bounce left
          } else {
            // ball hit ceiling/floor
            this.bounceBall(
              collision[0],
              collision[1],
              ball.velocity.x,
              -ball.velocity.y
            ); // Maintain horizontal movement and flip vertical movement
          }
        }
      }
    });

    return {
      physics: { engine: engine, world: world },
      floor: {
        body: floor,
        dimensions: [Constants.MAX_WIDTH, Constants.WALL_HEIGHT],
        color: colors.lightAccent,
        renderer: Renderer,
      },
      ceiling: {
        body: ceiling,
        dimensions: [Constants.MAX_WIDTH, 50],
        color: colors.lightAccent,
        renderer: Renderer,
      },
      leftPaddle: {
        body: leftPaddle,
        dimensions: [Constants.PADDLE_WIDTH, Constants.PADDLE_HEIGHT],
        color: colors.lightAccent,
        renderer: Renderer,
      },
      rightPaddle: {
        body: rightPaddle,
        dimensions: [Constants.PADDLE_WIDTH, Constants.PADDLE_HEIGHT],
        color: colors.lightAccent,
        renderer: Renderer,
      },
      leftGoal: {
        body: leftGoal,
        dimensions: [1, Constants.MAX_HEIGHT],
        renderer: Renderer,
      },
      rightGoal: {
        body: rightGoal,
        dimensions: [1, Constants.MAX_HEIGHT],
        renderer: Renderer,
      },
      ball: {
        body: ball,
        dimensions: [Constants.BALL_LENGTH, Constants.BALL_LENGTH],
        color: colors.darkAccent,
        renderer: Renderer,
      },
    };
  };
  /**
   * Given an object,
   * the ball that hit it,
   * an xDirection to bounce the ball,
   * (optionally) the yDirection to bounce the ball,
   * and (optionally) the speed the ball should go,
   * bounce the ball off the object.
   * @param {Matter.Body} object
   * @param {Matter.Body} ball
   * @param {int} xDirection
   * @param {int} yDirection
   * @param {number} speed
   */
  bounceBall = (
    object,
    ball,
    xDirection,
    yDirection = false,
    speed = this.state.ballSpeed
  ) => {
    if (!yDirection) {
      const paddleHeight = object.bounds.max.y - object.bounds.min.y;
      const relativeHitPosition =
        (paddleHeight / 2 + ball.position.y - object.position.y) / paddleHeight;
      yDirection = this.calculateYDirection(relativeHitPosition);
    }
    Matter.Body.setVelocity(ball, {
      x: xDirection,
      y: yDirection + Math.random(),
    });
    this.setState({ ballSpeed: this.state.ballSpeed + 1 });
    if (this.state.ballSpeed > Constants.MAX_BALL_SPEED) {
      this.setState({ ballSpeed: Constants.MAX_BALL_SPEED });
    }
    Matter.Body.setSpeed(ball, speed);
  };

  /**
   * Given the ball's relative hit position to the paddle it hit,
   * return the yDirection it should bounce towards.
   * @param {number} relativeHitPosition
   * @returns {int} yDirection
   */
  calculateYDirection = (relativeHitPosition) => {
    if (relativeHitPosition < 1 / 3) {
      return -1; // Angle up
    } else if (relativeHitPosition < 2 / 3) {
      return 0; // Angle straight
    } else {
      return 1; // Angle down
    }
  };

  /**
   * Given whether or not the ball hit the left goal
   * and the ball that hit a goal,
   * reset the ball.
   * @param {bool} ballHitLeftGoal
   * @param {Matter.Body} object
   * @param {Matter.Body} ball
   */
  resetBall = (ballHitLeftGoal, object, ball) => {
    let xLocation = 2 / 3;
    let yLocation = 1 / 3;
    let xDirection = -1;
    let yDirection = 2;

    if (ballHitLeftGoal) {
      xLocation /= 2;
      xDirection *= -1;
    }

    if (Math.random() < 0.5) {
      yLocation *= 2;
      yDirection *= -1;
    }
    Matter.Body.setPosition(ball, {
      x: Constants.MAX_WIDTH * xLocation,
      y: Constants.MAX_HEIGHT * yLocation,
    });
    this.setState({ ballSpeed: Constants.NORMAL_BALL_SPEED });
    this.bounceBall(object, ball, xDirection, yDirection);
  };

  start = () => {
    if (this.curUser === this.player1) {
      this.setState({ p1ready: true });
    } else if (this.curUser === this.player2) {
      this.setState({ p2ready: true });
    }
    if (this.state.p1ready && this.state.p2ready) {
      this.setState({
        running: true,
      });
      this.bounceBall(
        this.entities.leftPaddle.body,
        this.entities.ball.body,
        1,
        1,
        Constants.NORMAL_BALL_SPEED / 2
      );
    }
  };

  render() {
    let startText;
    if (!this.player2) startText = "No opponent available...";
    else if (this.curUser === this.player1) {
      if (this.state.p1ready) startText = "Waiting for opponent...";
      else startText = "Press to start";
    } else if (this.curUser === this.player2) {
      if (this.state.p2ready) startText = "Waiting for opponent...";
      else startText = "Press to start";
    }
    return (
      <View style={styles.container} {...this.panResponder.panHandlers}>
        <GameEngine
          entities={this.entities}
          ref={(ref) => {
            this.gameEngine = ref;
          }}
          running={this.state.running}
          style={styles.game}
          systems={[Physics(this.physicsProps)]}
        >
          <StatusBar hidden={true} />
        </GameEngine>
        <View style={styles.scoreBoard}>
          <Text style={styles.score}>
            {this.state.p1score} - {this.state.p2score}
          </Text>
        </View>
        {!this.state.running && (
          <TouchableOpacity onPress={this.start} style={styles.startButton}>
            <View style={styles.start}>
              <Text style={styles.startText}>{startText}</Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

async function sendUpdate(roomId, curUser, ballX, ballY) {
  await Room.sendMovementAndUpdate(roomId, curUser, ballX, ballY, socket);
}

export default function playPong() {
  const params = useLocalSearchParams();

  const [roomId, setRoomId] = useState(params.roomId);
  const [curUser, setCurUser] = useState(params.curUser);
  const [player1, setPlayer1] = useState(params.player1);
  const [player2, setPlayer2] = useState(params.player2);

  //console.log(curUser);
  //console.log(">.<");
  //console.log(socket);

  //room update event handler
  useEffect(() => {
    socket.on("roomUpdate", (msg) => {
      if (msg["id"] === roomId) {
        if (msg["message"] === "player2 joined") {
          //console.log(msg);
          //console.log("hiiiiii");
          updateGame();
        } else if (msg["message"] === "room updated") {
          updateGame();
        }
      }
    });

    return () => {
      socket.off("roomUpdate");
    };
  }, []);

  //call this function when we need to refresh our room
  async function updateGame() {
    let data = await Room.update(roomId, socket);
    //console.log(">.<");
    //console.log(data);
    setPlayer1(data.player1);
    setPlayer2(data.player2);
  }

  //main components
  return (
    <>
      <Stack.Screen options={{ header: () => null }} />
      <Text>{player1}</Text>
      <Text>{player2}</Text>
      <Pong
        key={player2}
        curUser={curUser}
        player1={player1}
        player2={player2}
        roomId={roomId}
      ></Pong>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
  },
  game: {
    bottom: Constants.MARGIN,
    left: Constants.MARGIN,
    position: "absolute",
    right: Constants.MARGIN,
    top: Constants.MARGIN,
  },
  score: {
    color: colors.text,
    fontSize: 50,
    position: "absolute",
    top: 50,
  },
  scoreBoard: {
    alignItems: "center",
  },
  start: {
    alignItems: "center",
    backgroundColor: "black",
    bottom: Constants.MARGIN,
    justifyContent: "center",
    left: Constants.MARGIN,
    opacity: 0.8,
    position: "absolute",
    right: Constants.MARGIN,
    top: Constants.MARGIN,
  },
  startButton: {
    bottom: Constants.MARGIN,
    flex: 1,
    left: Constants.MARGIN,
    position: "absolute",
    right: Constants.MARGIN,
    top: Constants.MARGIN,
  },
  startText: {
    color: "white",
    fontSize: 48,
  },
});

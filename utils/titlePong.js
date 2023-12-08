import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { GameEngine } from "react-native-game-engine";
import Matter from "matter-js";
import titlePhysics from "../utils/titlePhysics";
import Renderer from "../utils/Renderer";
import titleConstants from "./titleConstants.js";

import { colors } from "../assets/Themes/colors.js";
import { Stack } from "expo-router/stack";
import { useRouter } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import { Themes } from "../assets/Themes/index.js";

class TitlePong extends Component {
  // Sets up physics engine, mouse tracker, and renderable objects
  constructor(props) {
    super(props);
    this.gameEngine = null;
    this.entities = this.setupWorld();
    this.state = {
      running: false,
      ballSpeed: titleConstants.NORMAL_BALL_SPEED,
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
      titleConstants.MAX_WIDTH / 2,
      titleConstants.FLOOR_HEIGHT,
      titleConstants.MAX_WIDTH,
      titleConstants.WALL_HEIGHT,
      { isStatic: true }
    );
    let ceiling = Matter.Bodies.rectangle(
      titleConstants.MAX_WIDTH / 2,
      titleConstants.ROOF_HEIGHT,
      titleConstants.MAX_WIDTH,
      titleConstants.WALL_HEIGHT,
      { isStatic: true }
    );
    let leftPaddle = Matter.Bodies.rectangle(
      titleConstants.LEFT_PADDLE_X,
      titleConstants.PADDLE_Y_START,
      titleConstants.PADDLE_WIDTH,
      titleConstants.PADDLE_HEIGHT,
      { label: "leftPaddle", isStatic: true }
    );
    let rightPaddle = Matter.Bodies.rectangle(
      titleConstants.RIGHT_PADDLE_X,
      titleConstants.PADDLE_Y_START,
      titleConstants.PADDLE_WIDTH,
      titleConstants.PADDLE_HEIGHT,
      { label: "rightPaddle", isStatic: true }
    );
    let ball = Matter.Bodies.rectangle(
      titleConstants.BALL_X_START,
      titleConstants.BALL_Y_START,
      titleConstants.BALL_LENGTH,
      titleConstants.BALL_LENGTH,
      { label: "ball", friction: 0, frictionAir: 0, frictionStatic: 0 }
    );

    Matter.World.add(world, [floor, ceiling, leftPaddle, rightPaddle, ball]);

    /**
     * When two objects collide,
     * check if one of the objects is the ball.
     * If one of the objects is the ball,
     * bounce the ball off the object it hit.
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
            this.bounceBall(collision[1], 1, ball.velocity.y); // Bounce right
          } else if (collision[0].label === "rightPaddle") {
            this.bounceBall(collision[1], -1, ball.velocity.y); // Bounce left
          } else {
            // ball hit ceiling/floor
            this.bounceBall(collision[1], ball.velocity.x, -ball.velocity.y);
          }
        }
      }
    });

    return {
      physics: { engine: engine, world: world },
      floor: {
        body: floor,
        dimensions: [titleConstants.MAX_WIDTH, titleConstants.WALL_HEIGHT],
        renderer: Renderer,
      },
      ceiling: {
        body: ceiling,
        dimensions: [titleConstants.MAX_WIDTH, titleConstants.WALL_HEIGHT],
        renderer: Renderer,
      },
      leftPaddle: {
        body: leftPaddle,
        dimensions: [titleConstants.PADDLE_WIDTH, titleConstants.PADDLE_HEIGHT],
        renderer: Renderer,
      },
      rightPaddle: {
        body: rightPaddle,
        dimensions: [titleConstants.PADDLE_WIDTH, titleConstants.PADDLE_HEIGHT],
        renderer: Renderer,
      },
      ball: {
        body: ball,
        dimensions: [titleConstants.BALL_LENGTH, titleConstants.BALL_LENGTH],
        color: colors.darkAccent,
        text: "'n",
        renderer: Renderer,
      },
    };
  };
  /**
   * Given a ball that hit an object,
   * an xDirection to bounce the ball,
   * and the yDirection to bounce the ball,
   * bounce the ball off the object.
   * @param {Matter.Body} ball
   * @param {int} xDirection
   * @param {int} yDirection
   */
  bounceBall = (ball, xDirection, yDirection) => {
    Matter.Body.setVelocity(ball, {
      x: xDirection,
      y: yDirection,
    });
  };

  start = () => {
    this.setState({
      running: true,
    });
    this.bounceBall(this.entities.ball.body, 1, 1);
  };

  render() {
    if (!this.state.running) this.start();
    return (
      <View style={styles.container}>
        <GameEngine
          entities={this.entities}
          ref={(ref) => {
            this.gameEngine = ref;
          }}
          running={this.state.running}
          style={styles.game}
          systems={[titlePhysics()]}
        ></GameEngine>
      </View>
    );
  }
}

export default function playPong() {
  const params = useLocalSearchParams();
  const isFocused = useIsFocused();

  const router = useRouter();

  const [roomId, setRoomId] = useState(params.roomId);
  const [curUser, setCurUser] = useState(params.curUser);
  const [player1, setPlayer1] = useState(params.player1);
  const [player2, setPlayer2] = useState(params.player2);

  //main components

  if (isFocused) {
    return (
      <>
        <Stack.Screen options={{ header: () => null }} />
        <TitlePong
          key={player2}
          curUser={curUser}
          player1={player1}
          player2={player2}
          roomId={roomId}
        />
      </>
    );
  } else return null;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
  },
  game: {
    bottom: titleConstants.MARGIN,
    left: titleConstants.MARGIN,
    position: "absolute",
    right: titleConstants.MARGIN,
    top: titleConstants.MARGIN,
  },
  start: {
    alignItems: "center",
    backgroundColor: "black",
    bottom: titleConstants.MARGIN,
    justifyContent: "center",
    left: titleConstants.MARGIN,
    opacity: 0.8,
    position: "absolute",
    right: titleConstants.MARGIN,
    top: titleConstants.MARGIN,
  },
  startButton: {
    bottom: titleConstants.MARGIN,
    flex: 1,
    left: titleConstants.MARGIN,
    position: "absolute",
    right: titleConstants.MARGIN,
    top: titleConstants.MARGIN,
  },
  startText: {
    color: "white",
    fontSize: 48,
  },
  backButton: {
    width: titleConstants.MAX_WIDTH / 5,
    height: titleConstants.WALL_HEIGHT / 1.5,
    position: "absolute",
    justifyContent: "flex-end",
    zIndex: 9,
    flex: 1,
    left: -titleConstants.MAX_WIDTH / 100,
    top: 0,
    paddingBottom: 10,
  },
  backIcon: {
    color: Themes.colors.background,
    fontSize: titleConstants.MAX_WIDTH * 0.08,
    textAlign: "center",
  },
});

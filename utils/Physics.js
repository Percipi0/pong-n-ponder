import Matter from "matter-js";
import Constants from "./Constants";
import randomIntFromInterval from "./randomNumber";
import { Animated } from "react-native";

const Physics =
  (physicsProps) =>
  (entities, { touches, time }) => {
    let engine = entities.physics.engine;
    let leftPaddle = entities.leftPaddle.body;
    let rightPaddle = entities.rightPaddle.body;
    let ball = entities.ball.body;
    let yMin = rightPaddle.position.y;
    let yMax = rightPaddle.position.y;

    if (ball.position.y <= rightPaddle.position.y) {
      if (Math.random() < 0) {
        yMin -= 20;
      }
    } else {
      if (Math.random() < 0.5) {
        yMax += 20;
      }
    }
    if (rightPaddle.position.y < Constants.WALL_HEIGHT) {
      yMin = Constants.WALL_HEIGHT;
    } else if (rightPaddle.position.y > Constants.MAX_Y) {
      yMax = Constants.MAX_Y;
    }
    Matter.Body.setPosition(rightPaddle, {
      x: Constants.RIGHT_PADDLE_X,
      y: randomIntFromInterval(yMin, yMax),
    });

    touches
      .filter((t) => t.type === "move")
      .forEach((t) => {
        Matter.Body.setPosition(leftPaddle, {
          x: Constants.LEFT_PADDLE_X,
          y: physicsProps.leftPaddlePosition.y._value,
        });
      });

    Matter.Engine.update(engine, time.delta);

    return entities;
  };

export default Physics;

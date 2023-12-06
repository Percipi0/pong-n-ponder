import Matter from "matter-js";
import Constants from "./Constants";

const Physics =
  (physicsProps) =>
  (entities, { touches, time }) => {
    let engine = entities.physics.engine;
    let leftPaddle = entities.leftPaddle.body;
    let rightPaddle = entities.rightPaddle.body;
    let curUser = physicsProps.curUser;
    let player1 = physicsProps.player1;
    let player2 = physicsProps.player2;

    touches
      .filter((t) => t.type === "move")
      .forEach((t) => {
        if (curUser === player1) {
          console.log("P1 Physics");
          Matter.Body.setPosition(leftPaddle, {
            x: Constants.LEFT_PADDLE_X,
            y: physicsProps.leftPaddlePosition.y._value,
          });
        } else if (curUser === player2) {
          console.log("P2 Physics");
          Matter.Body.setPosition(rightPaddle, {
            x: Constants.RIGHT_PADDLE_X,
            y: physicsProps.rightPaddlePosition.y._value,
          });
        }
      });

    Matter.Engine.update(engine, time.delta);

    return entities;
  };

export default Physics;

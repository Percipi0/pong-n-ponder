import Matter from "matter-js";
import Constants from "./Constants";

const Physics =
  (leftPaddlePosition) =>
  (entities, { touches, time }) => {
    let engine = entities.physics.engine;
    let leftPaddle = entities.leftPaddle.body;
    let rightPaddle = entities.rightPaddle.body;

    touches
      .filter((t) => t.type === "move")
      .forEach((t) => {
        Matter.Body.setPosition(leftPaddle, {
          x: Constants.LEFT_PADDLE_X,
          y: leftPaddlePosition.y._value,
        });
      });

    Matter.Engine.update(engine, time.delta);

    return entities;
  };

export default Physics;

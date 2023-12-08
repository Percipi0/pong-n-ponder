import Matter from "matter-js";
import titleConstants from "./titleConstants";
import randomIntFromInterval from "./randomNumber";

const titlePhysics =
  () =>
  (entities, { touches, time }) => {
    let engine = entities.physics.engine;

    Matter.Engine.update(engine, time.delta);

    return entities;
  };

export default titlePhysics;

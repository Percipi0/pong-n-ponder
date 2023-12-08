import { Dimensions } from "react-native";

// These are set outside export because multiple Constants require them.
const screenWidth = Dimensions.get("screen").width;
const screenHeight = Dimensions.get("screen").height;
const wallHeight = screenHeight / 5;
const paddleHeight = 100;
const divisor = 4;

export default titleConstants = {
  MAX_WIDTH: screenWidth,
  MAX_HEIGHT: screenHeight,
  WALL_HEIGHT: wallHeight,
  MARGIN: 0,

  LEFT_PADDLE_X: screenWidth / divisor,
  RIGHT_PADDLE_X: (screenWidth / divisor) * (divisor - 1),
  PADDLE_Y_START: screenHeight / 2 - paddleHeight / 2,
  PADDLE_HEIGHT: screenHeight,
  PADDLE_WIDTH: 25,
  MAX_Y: screenHeight - wallHeight + paddleHeight / 4,

  BALL_X_START: screenWidth / 3,
  BALL_Y_START: screenHeight / 3,
  BALL_LENGTH: 30,
  NORMAL_BALL_SPEED: 3,

  AI_SPEED: 15,

  ROOF_HEIGHT: 150,
  FLOOR_HEIGHT: 600,
};

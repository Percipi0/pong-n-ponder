// Source: https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
const randomIntFromInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export default randomIntFromInterval;

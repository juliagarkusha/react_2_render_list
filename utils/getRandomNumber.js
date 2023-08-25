var getRandomNumber = function getRandomNumber() {
  var min = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var max = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;
  return Math.floor(Math.random() * (max - min) + min);
};

export default getRandomNumber;
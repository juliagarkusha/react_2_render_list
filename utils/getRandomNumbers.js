var getRandomNumbers = function getRandomNumbers() {
  var min = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var max = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 999;
  var length = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

  var diff = max - min + 1;
  var validLength = diff < length ? diff : length;
  var numbers = [];
  while (numbers.length < validLength) {
    var random = Math.round(Math.random() * (max - min) + min);

    if (!numbers.includes(random)) {
      numbers.push(random);
    }
  }

  return length === 1 ? numbers : numbers;
};

export default getRandomNumbers;
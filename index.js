var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _ReactDOM = ReactDOM,
    createRoot = _ReactDOM.createRoot;
var _React = React,
    useEffect = _React.useEffect,
    useState = _React.useState,
    useMemo = _React.useMemo;


var domContainer = document.querySelector('#root');
var root = createRoot(domContainer);

var getRandomElement = function getRandomElement(elements) {
  return elements[Math.floor(Math.random() * (elements.length - 1))];
};

var animals = [{ type: 'turtle', icon: '\uD83D\uDC22' }, { type: 'octopus', icon: '\uD83D\uDC19' }, { type: 'fish', icon: '\uD83D\uDC20' }, { type: 'flamingo', icon: '\uD83E\uDDA9' }, { type: 'penguin', icon: '\uD83D\uDC27' }];

var Animals = function Animals() {
  var _useState = useState(animals.map(function (_, index) {
    return index;
  })),
      _useState2 = _slicedToArray(_useState, 2),
      inactiveAnimals = _useState2[0],
      setInactiveAnimals = _useState2[1];

  var animalListClassName = useMemo(function () {
    var result = [];

    if (inactiveAnimals.length <= animals.length * 0.5) {
      result.push('animals_list__inProgress');
    }

    if (!inactiveAnimals.length) {
      result.push('animals_list__done');
    }

    return result.join(' ');
  }, [inactiveAnimals.length]);

  useEffect(function () {
    var interval = setInterval(function () {
      setInactiveAnimals(function (prevState) {
        if (!prevState.length) {
          return animals.map(function (_, index) {
            return index;
          });
        }

        var nextActiveAnimalsIndex = getRandomElement(prevState);

        return prevState.filter(function (inactiveIndex) {
          return inactiveIndex !== nextActiveAnimalsIndex;
        });
      });
    }, 2000);

    return function () {
      clearInterval(interval);
    };
  }, []);

  return React.createElement(
    'table',
    { className: animalListClassName },
    React.createElement(
      'tbody',
      null,
      animals.map(function (animal, index) {
        var animalClassName = ['animal'];
        if (!inactiveAnimals.includes(index)) {
          animalClassName.push('animal__active');
        }

        return React.createElement(
          'tr',
          { key: animal.type, className: animalClassName.join(' ') },
          Object.keys(animal).map(function (animalKey) {
            return React.createElement(
              'td',
              { key: animalKey },
              animal[animalKey]
            );
          })
        );
      })
    )
  );
};

var App = React.createElement(Animals, null);

root.render(App);
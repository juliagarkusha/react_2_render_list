const { createRoot } = ReactDOM;
const { useEffect, useState, useMemo } = React;

const domContainer = document.querySelector('#root');
const root = createRoot(domContainer);

const getRandomElement = (elements) => elements[Math.floor(Math.random() * (elements.length - 1))];

const animals = [
  {type: `turtle`, icon: `🐢`},
  {type: `octopus`, icon: `🐙`},
  {type: `fish`, icon: `🐠`},
  {type: `flamingo`, icon: `🦩`},
  {type: `penguin`, icon: `🐧`}
];

const Animals = () => {
  const [ inactiveAnimals, setInactiveAnimals ] = useState(animals.map((_, index) => index));

  const animalListClassName = useMemo(() => {
    const result = [];

    if(inactiveAnimals.length <= animals.length * 0.5) {
      result.push('animals_list__inProgress');
    }

    if(!inactiveAnimals.length) {
      result.push('animals_list__done');
    }

    return result.join(' ');
  }, [inactiveAnimals.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      setInactiveAnimals((prevState) => {
        if(!prevState.length) {
          return animals.map((_, index) => index);
        }

        const nextActiveAnimalsIndex = getRandomElement(prevState);

        return prevState.filter(inactiveIndex => inactiveIndex !== nextActiveAnimalsIndex);
      })
    }, 2000);

    return () => {
      clearInterval(interval);
    }
  }, [])

  return (
    <table className={animalListClassName}>
      <tbody>
      {animals.map((animal, index) => {
        const animalClassName = ['animal'];
        if(!inactiveAnimals.includes(index)) {
          animalClassName.push('animal__active');
        }

        return (
          <tr key={animal.type} className={animalClassName.join(' ')}>
            {Object.keys(animal).map((animalKey) => {
              return (
                <td key={animalKey}>{animal[animalKey]}</td>
              )
            })}
          </tr>
        )
      })}
      </tbody>
    </table>
  )
}

const App = (<Animals />)

root.render(App);

import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const randomFoodContext = createContext();

const ExploreFoodProvider = ({ children }) => {
  const [randomFood, setRandomFood] = useState([]);

  // Falta pegar o id da receitar e colocar no history

  useEffect(() => {
    const getRandomFood = async () => {
      try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
        const data = await response.json();
        console.log(data);
        setRandomFood(data.meals);
      } catch (error) {
        throw new Error(error.message);
      }
    };
    getRandomFood();
  }, []);

  return (
    <randomFoodContext.Provider value={ { randomFood, getRandomFood } }>
      {children}
    </randomFoodContext.Provider>
  );
};

ExploreFoodProvider.protoType = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default ExploreFoodProvider;

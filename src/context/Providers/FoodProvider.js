import React, { useState, useEffect, createContext, useContext } from 'react';
import PropTypes from 'prop-types';
import { getMeals, getFoodCategories } from '../../services/index';

export const FoodContext = createContext();

export default function FoodProvider({ children }) {
  const [splicedFoods, setSplicedFoods] = useState([]); // primeiros doze itens
  const [categories, setCategories] = useState([]);
  const [isClick, setIsClick] = useState();

  useEffect(() => {
    const firstMeals = async () => {
      const info = await getMeals();
      const category = await getFoodCategories();
      setCategories(category);
      setSplicedFoods(info);
    };
    firstMeals();
  }, []);

  const allInformations = {
    splicedFoods,
    setSplicedFoods,
    categories,
    isClick,
    setIsClick,
  };

  return (
    <FoodContext.Provider value={ allInformations }>
      {children}
    </FoodContext.Provider>
  );
}

export const useDataFood = () => useContext(FoodContext);

FoodProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

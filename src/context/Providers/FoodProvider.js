import React, { useState, useEffect, createContext } from 'react';
import PropTypes from 'prop-types';
import { getMeals, getFoodCategories } from '../../services/index';

export const FoodContext = createContext();

export default function FoodProvider({ children }) {
  const [splicedFoods, setSplicedFoods] = useState([]); // primeiros doze itens
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const firstMeals = async () => {
      const info = await getMeals();
      const category = await getFoodCategories();
      setCategories(category);
      setSplicedFoods(info);
    };
    firstMeals();
  }, []);

  return (
    <FoodContext.Provider value={ { splicedFoods, categories } }>
      {children}
    </FoodContext.Provider>
  );
}

FoodProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

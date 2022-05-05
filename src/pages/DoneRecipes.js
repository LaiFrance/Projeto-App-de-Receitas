import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import DoneRecipesCard from '../components/DoneRecipesCard';
import '../style/doneRecipes.css';

export default function DoneRecipes() {
  const [originalRecipes, setOriginalRecipes] = useState([]);

  const doneRecipes = [
    {
      id: '52771',
      type: 'food',
      nationality: 'Italian',
      category: 'Vegetarian',
      alcoholicOrNot: '',
      name: 'Spicy Arrabiata Penne',
      image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
      doneDate: '23/06/2020',
      tags: ['Pasta', 'Curry'],
    },
    {
      id: '178319',
      type: 'drink',
      nationality: '',
      category: 'Cocktail',
      alcoholicOrNot: 'Alcoholic',
      name: 'Aquamarine',
      image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
      doneDate: '23/06/2020',
      tags: [],
    },
  ];

  useEffect(() => {
    setOriginalRecipes(doneRecipes);
  }, []);

  const handleAllBtn = () => {
    setOriginalRecipes(doneRecipes);
  };

  const handleDrinksBtn = () => {
    const drinks = doneRecipes.filter((item) => item.type === 'drink');
    setOriginalRecipes(drinks);
  };

  const handleFoodsBtn = () => {
    const foods = doneRecipes.filter((item) => item.type === 'food');
    setOriginalRecipes(foods);
  };

  return (
    <div>
      <div className="header-container">
        <Header pageName="Done Recipes" />
        <nav>
          <button
            data-testid="filter-by-food-btn"
            type="button"
            onClick={ handleFoodsBtn }
          >
            Food
          </button>
          <button
            data-testid="filter-by-drink-btn"
            type="button"
            onClick={ handleDrinksBtn }
          >
            Drinks
          </button>
          <button
            data-testid="filter-by-all-btn"
            type="button"
            onClick={ handleAllBtn }
          >
            All
          </button>
        </nav>
      </div>

      <div className="recipes-container">
        {originalRecipes ? originalRecipes.map((recipe, index) => (
          <DoneRecipesCard key={ index } recipe={ recipe } index={ index } />
        )) : ''}
      </div>
    </div>
  );
}

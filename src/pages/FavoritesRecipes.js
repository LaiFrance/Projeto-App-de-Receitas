import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import DoneRecipesCard from '../components/DoneRecipesCard';

export default function FavoritesRecipes() {
  const [favorites, setFavorites] = useState([]);

  const favoriteRecipes = [
    {
      id: '52771',
      type: 'food',
      nationality: 'Italian',
      category: 'Vegetarian',
      alcoholicOrNot: '',
      name: 'Spicy Arrabiata Penne',
      image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    },
    {
      id: '178319',
      type: 'drink',
      nationality: '',
      category: 'Cocktail',
      alcoholicOrNot: 'Alcoholic',
      name: 'Aquamarine',
      image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    },
  ];

  useEffect(() => {
    setFavorites(favoriteRecipes);
  }, []);

  const addToFavorites = (rcp) => {
    setFavorites((prev) => [...prev, rcp]);
    localStorage.setItem('favoriteRecipes', JSON.stringify([...favorites, rcp]));
  };

  const removeFromFavorites = (rcp) => {
    const removeFav = favorites.filter((receita) => receita.id !== rcp.id);
    console.log(removeFav);
    setFavorites(removeFav);
    localStorage.setItem('favoriteRecipes', JSON.stringify(removeFav));
  };

  const handleAllBtn = () => {
    setFavorites(favoriteRecipes);
  };

  const handleDrinksBtn = () => {
    const drinks = favoriteRecipes.filter((item) => item.type === 'drink');
    setFavorites(drinks);
  };

  const handleFoodsBtn = () => {
    const foods = favoriteRecipes.filter((item) => item.type === 'food');
    setFavorites(foods);
  };

  return (
    <div>
      <div className="header-container">
        <Header pageName="Favorite Recipes" />
      </div>
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
      <div className="recipes-container">
        {favorites ? favorites.map((recipe, index) => (
          <DoneRecipesCard
            key={ index }
            addToFavorites={ addToFavorites }
            removeFromFavorites={ removeFromFavorites }
            recipe={ recipe }
            index={ index }
            favorites={ favorites }
          />
        )) : ''}
      </div>
    </div>
  );
}

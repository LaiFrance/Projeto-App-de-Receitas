import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import DoneRecipesCard from '../components/DoneRecipesCard';

export default function FavoritesRecipes() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const getFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setFavorites([...getFavorites]);
  }, []);

  const addToFavorites = (rcp) => {
    setFavorites((prev) => [...prev, rcp]);
    localStorage.setItem('favoriteRecipes', JSON.stringify([...favorites, rcp]));
  };

  const removeFromFavorites = (rcp) => {
    const removeFav = favorites.filter((receita) => receita.id !== rcp.id);
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

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getDrinkById } from '../services/index';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

export default function DrinksInProgress() {
  const [drinkInProgress, setDrinkinProgress] = useState([]);
  const [copied, setCopied] = useState(false);
  const [favorited, setFavorited] = useState(false);
  const [allowBtn, setAllowBtn] = useState(true);
  const [ingredients, setIngredients] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const handleDrink = async () => {
      const drink = await getDrinkById(id);
      const ingr = [
        drink[0].strIngredient1, drink[0].strIngredient2,
        drink[0].strIngredient3, drink[0].strIngredient4, drink[0].strIngredient5,
        drink[0].strIngredient6, drink[0].strIngredient7, drink[0].strIngredient8,
        drink[0].strIngredient9, drink[0].strIngredient10, drink[0].strIngredient11,
        drink[0].strIngredient12, drink[0].strIngredient13,
        drink[0].strIngredient14, drink[0].strIngredient15];

      setDrinkinProgress(drink);
      setIngredients(ingr);
    };
    handleDrink();
  }, []);

  const addToFavorites = () => {
    if (drinkInProgress.length > 0 && allowBtn) {
      const obj = {
        id,
        type: 'drink',
        nationality: '',
        category: drinkInProgress[0].strCategory,
        alcoholicOrNot: drinkInProgress[0].strAlcoholic,
        name: drinkInProgress[0].strDrink,
        image: drinkInProgress[0].strDrinkThumb,
      };
      const getFavorites = localStorage.getItem('favoriteRecipes') || [];
      localStorage.setItem('favoriteRecipes', JSON.stringify([...getFavorites, obj]));
    }
    setFavorited(true);
    setAllowBtn(false);
  };

  const shareDrinks = () => {
    const URL = `http://localhost:3000/foods/${id}`;
    navigator.clipboard.writeText(URL);
    setCopied(!copied);
  };

  return (
    <div>
      {drinkInProgress.length > 0 ? drinkInProgress.map((rcp, index) => (
        <div key={ index }>
          <img
            className="recipe-photo"
            src={ rcp.strDrinkThumb }
            data-testid="recipe-photo"
            alt={ `imagem de ${rcp.strDrink}` }
          />
          <span data-testid="recipe-title">{ rcp.strDrink }</span>
          {copied ? (
            <button
              className="shareBtn"
              type="button"
              onClick={ shareDrinks }
              data-testid="share-btn"
            >
              Link copied!
            </button>
          ) : (
            <div>
              <button
                type="button"
                className="shareBtn"
                onClick={ shareDrinks }
              >
                <img
                  data-testid="share-btn"
                  src={ shareIcon }
                  alt="share"
                />
              </button>
            </div>
          )}
          <button type="button" onClick={ addToFavorites }>
            {!favorited ? (
              <img src={ whiteHeartIcon } data-testid="favorite-btn" alt="white heart" />
            ) : (
              <img src={ blackHeartIcon } data-testid="favorite-btn" alt="black heart" />
            )}
          </button>
          <span data-testid="recipe-category">{rcp.strCategory}</span>
          <ul>
            {ingredients.length > 0 ? ingredients.map((item, ind) => (
              item !== null && item !== '' && (
                <li key={ ind } data-testid={ `${ind}-ingredient-step` }>
                  <label htmlFor={ item }>
                    { item }
                    <input type="checkbox" name={ item } />
                  </label>
                </li>)
            )) : ''}
          </ul>
          <span className="leia" data-testid="instructions">{ rcp.strInstructions }</span>
          <button type="button" data-testid="finish-recipe-btn">Finish recipe</button>
        </div>

      )) : 'No meal in progress'}
    </div>
  );
}

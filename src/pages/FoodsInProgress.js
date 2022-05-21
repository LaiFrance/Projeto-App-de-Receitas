import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMealById } from '../services/index';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

export default function FoodsInProgress() {
  const [mealInProgress, setMealinProgress] = useState([]);
  const [copied, setCopied] = useState(false);
  const [favorited, setFavorited] = useState(false);
  const [allowBtn, setAllowBtn] = useState(true);
  const [ingredients, setIngredients] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const handleMeal = async () => {
      const meal = await getMealById(id);
      const ingr = [
        meal[0].strIngredient1, meal[0].strIngredient2,
        meal[0].strIngredient3, meal[0].strIngredient4, meal[0].strIngredient5,
        meal[0].strIngredient6, meal[0].strIngredient7, meal[0].strIngredient8,
        meal[0].strIngredient9, meal[0].strIngredient10, meal[0].strIngredient11,
        meal[0].strIngredient12, meal[0].strIngredient13,
        meal[0].strIngredient14, meal[0].strIngredient15, meal[0].strIngredient16,
        meal[0].strIngredient17, meal[0].strIngredient18, meal[0].strIngredient19,
        meal[0].strIngredient20];

      setMealinProgress(meal);
      setIngredients(ingr);
    };
    handleMeal();
  }, []);

  const addToFavorites = () => {
    if (mealInProgress.length > 0 && allowBtn) {
      const obj = {
        id: [id],
        type: 'food',
        nationality: mealInProgress[0].strArea,
        category: mealInProgress[0].strCategory,
        alcoholicOrNot: '',
        name: mealInProgress[0].strMeal,
        image: mealInProgress[0].strMealThumb,
      };
      const getFavorites = localStorage.getItem('favoriteRecipes');
      localStorage.setItem('favoriteRecipes', JSON.stringify([...getFavorites, obj]));
    }
    setFavorited(true);
    setAllowBtn(false);
  };

  const shareFoods = (mealid) => {
    const URL = `http://localhost:3000/foods/${mealid}`;
    navigator.clipboard.writeText(URL);
    setCopied(!copied);
  };

  return (
    <div>
      {mealInProgress.length > 0 ? mealInProgress.map((rcp, index) => (
        <div key={ index }>
          <img
            className="recipe-photo"
            src={ rcp.strMealThumb }
            data-testid="recipe-photo"
            alt={ `imagem de ${rcp.strMeal}` }
          />
          <span data-testid="recipe-title">{ rcp.strMeal }</span>
          {copied ? (
            <button
              className="shareBtn"
              type="button"
              onClick={ () => shareFoods(id) }
              data-testid="share-btn"
            >
              Link copied!
            </button>
          ) : (
            <div>
              <button
                type="button"
                className="shareBtn"
                onClick={ () => shareFoods(id) }
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
          <span data-testid="recipe-category">{ rcp.strCategory }</span>
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

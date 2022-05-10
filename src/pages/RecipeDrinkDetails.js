import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import Header from '../components/Header';
import Recommended from '../components/Recomended';

export default function SingleCocktail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const redirect = () => {
    history.push(`${history.location.pathname}/in-progress`);
  };
  const [cocktail, setCocktail] = useState(null);
  const [doneRecipes, setDoneRecipes] = useState([]);

  const unite = (arr1, arr2) => {
    // r= resultado, e= elemento, i= índice
    const l3 = arr1.reduce((r, e, i) => {
      r.push(`${e} - ${arr2[i]}`);
      return r;
    }, []);
    return l3;
  };

  useEffect(() => {
    setLoading(true);
    async function getCocktail() {
      try {
        const response = await fetch(
          `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`,
        );
        const data = await response.json();

        if (data.drinks) {
          const {
            strDrink: name, strDrinkThumb: image,
            strCategory: category, strGlass: glass,
            strInstructions: instructions, strAlcoholic: info,
            strIngredient1, strIngredient2, strIngredient3, strIngredient4,
            strIngredient5,
            strMeasure1, strMeasure2, strMeasure3,
            strMeasure4, strMeasure5, strMeasure6, strMeasure7,
            strMeasure8, strMeasure9, strMeasure10, strMeasure11, strMeasure12,
            strMeasure13, strMeasure14,
          } = data.drinks[0];
          const ingredients = [
            strIngredient1, strIngredient2, strIngredient3, strIngredient4,
            strIngredient5,
          ];
          const measure = [
            strMeasure1, strMeasure2, strMeasure3, strMeasure4, strMeasure5,
            strMeasure6, strMeasure7, strMeasure8, strMeasure9, strMeasure10,
            strMeasure11, strMeasure12, strMeasure13, strMeasure14,
          ];
          const ingredientsReduced = unite(ingredients, measure);
          const newCocktail = {
            name,
            image,
            info,
            category,
            glass,
            instructions,
            ingredientsReduced,
          };
          setCocktail(newCocktail);
        } else {
          setCocktail(null);
        }
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }
    getCocktail();
  }, [id]);

  useEffect(() => {
    const receitasFeitas = JSON.parse(localStorage.getItem('doneRecipes'));
    setDoneRecipes(receitasFeitas);
  }, []);

  if (loading) {
    return <h2 className="section-title">Loading...</h2>;
  }
  if (!cocktail) {
    return <h2 className="section-title">nenhum Drink aqui </h2>;
  }
  const {
    name,
    image,
    // category,
    info,
    instructions,
  } = cocktail;
  return (
    <section className="sectioncocktail-section">

      <div className="header-container">
        <Header pageName="Explore Foods" />
      </div>

      <img
        data-testid="recipe-photo"
        className="drink-image"
        src={ image }
        alt={ name }
      />
      <div className="drink-info">
        <h1 data-testid="recipe-title">
          {name}
        </h1>
        <h2 data-testid="recipe-category">{info}</h2>
        <button
          data-testid="share-btn"
          type="button"
        >
          <img src={ shareIcon } alt="shareIcon" />

        </button>
        <button
          className="favorite-btn"
          data-testid="favorite-btn"
          type="button"
          src={ whiteHeartIcon }
        >
          <img src={ whiteHeartIcon } alt="favorite" />
          <img src={ blackHeartIcon } alt="favoritee" />
        </button>

        <div data-testid="0-ingredient-name-and-measure">
          <h2>ingredients :</h2>
          <ul>
            {cocktail && cocktail.ingredientsReduced.map((elem, index) => (
              elem !== ' -  ' && (
                <li key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
                  <label htmlFor={ elem }>
                    { elem }
                    <input type="checkbox" name={ elem } />
                  </label>
                </li>
              )))}
          </ul>

        </div>
        <h2> instructions:</h2>
        <p data-testid="instructions">
          {instructions}
        </p>
        {doneRecipes?.some((rcp) => rcp === algo) ? '' : (
          <button
            data-testid="start-recipe-btn"
            type="button"
            className="start-recipe-btn"
            onClick={ redirect }
          >
            Start Recipe
          </button>
        )}
      </div>
      <Recommended />
    </section>

  );
}

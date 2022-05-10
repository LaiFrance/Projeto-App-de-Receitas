import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import Header from '../components/Header';
import Recommended from '../components/Recomended';

export default function SingleCocktail() {
  const { id } = useParams();
  const history = useHistory();
  const [cocktail, setCocktail] = useState(null);
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [original, setOriginal] = useState([]);
  const [copied, setCopied] = useState(false);
  const [favorited, setFavorited] = useState(false);

  const redirect = () => {
    const getRcps = JSON.parse(localStorage.getItem('inProgressRecipes')) || {
      cocktails: {},
      meals: {},
    };
    localStorage.setItem('inProgressRecipes',
      JSON.stringify({ ...getRcps, cocktails: { ...getRcps.cocktails, [id]: [] } }));

    history.push(`/drinks/${id}/in-progress`);
  };

  const unite = (arr1, arr2) => {
    // r= resultado, e= elemento, i= índice
    const l3 = arr1.reduce((r, e, i) => {
      r.push(`${e} - ${arr2[i]}`);
      return r;
    }, []);
    return l3;
  };

  useEffect(() => {
    async function getCocktail() {
      try {
        const response = await fetch(
          `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`,
        );
        const data = await response.json();
        setOriginal(data.drinks[0]);

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
      } catch (error) {
        console.log(error);
      }
    }
    getCocktail();
  }, [id]);

  useEffect(() => {
    const receitasFeitas = JSON.parse(localStorage.getItem('doneRecipes'));
    setDoneRecipes(receitasFeitas);
    const getFavorites = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const isFavorite = getFavorites.some((item) => item.id === id);
    setFavorited(isFavorite);
  }, []);
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
  const shareDrinks = () => {
    const URL = `http://localhost:3000/drinks/${id}`;
    navigator.clipboard.writeText(URL);
    setCopied(!copied);
  };
  const removeFromFavorites = (rcpid) => {
    const getFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const removeFav = getFavorites.filter((receita) => receita.id !== rcpid);
    localStorage.setItem('favoriteRecipes', JSON.stringify(removeFav));
    setFavorited(!favorited);
  };
  const addToFavorites = () => {
    if (original) {
      const obj = {
        id,
        type: 'drink',
        nationality: '',
        category: original.strCategory,
        alcoholicOrNot: original.strAlcoholic,
        name: original.strDrink,
        image: original.strDrinkThumb,
      };
      const getFavorites = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
      localStorage.setItem('favoriteRecipes', JSON.stringify([...getFavorites, obj]));
    }
    setFavorited(!favorited);
  };
  return (
    <section className="sectioncocktail-section">

      <div className="header-container">
        <Header pageName="Explore Drinks" />
      </div>

      <img
        data-testid="recipe-photo"
        className="drink-image"
        src={ image }
        alt={ name }
      />
      <h1 data-testid="recipe-title">
        {name}
      </h1>
      <h2 data-testid="recipe-category">{info}</h2>

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

      {!favorited ? (
        <button type="button" onClick={ addToFavorites }>
          <img src={ whiteHeartIcon } data-testid="favorite-btn" alt="white heart" />
        </button>
      ) : (
        <button
          type="button"
          onClick={ () => removeFromFavorites(id) }
        >
          <img src={ blackHeartIcon } data-testid="favorite-btn" alt="black heart" />
        </button>
      )}

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
      <Recommended />
      {doneRecipes === null ? (
        <button
          data-testid="start-recipe-btn"
          type="button"
          className="start-recipe-btn"
          onClick={ redirect }
        >
          Start Recipe
          {/* {rcpProgress[id] ? 'Start Recipe' : 'Continue Recipe'} */}
        </button>
      ) : ''}
    </section>

  );
}

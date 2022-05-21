import React, { useEffect, useState } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import Header from '../components/Header';
import '../style/foodDetails.css';
import Recommended from '../components/Recomended';

export default function RecipeMealDetails() {
  const { id } = useParams();
  const history = useHistory();
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [meals, setmeals] = useState(null);
  const [original, setOriginal] = useState([]);
  const [copied, setCopied] = useState(false);
  const [favorited, setFavorited] = useState(false);
  // const [rcpProgress, setRcpProgress] = useState([]);

  const redirect = () => {
    const getRcps = JSON.parse(localStorage.getItem('inProgressRecipes')) || {
      cocktails: {},
      meals: {},
    };
    localStorage.setItem('inProgressRecipes',
      JSON.stringify({ ...getRcps, meals: { ...getRcps.meals, [id]: [] } }));

    history.push(`${history.location.pathname}/in-progress`);
  };

  const unite = (arr1, arr2) => {
    // r= resultado, e= elemento, i= índice
    const arr3 = arr1.reduce((r, e, i) => {
      r.push(`${e} - ${arr2[i]}`);
      return r;
    }, []);
    return arr3;
  };
  // useEffect(() => {
  //   const getRcps = JSON.parse(localStorage.getItem('inProgressRecipes'));
  //   if (getRcps) {
  //     setRcpProgress(getRcps.meals);
  //   }
  // }, []);
  useEffect(() => {
    async function getMeal() {
      try {
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
        );
        const data = await response.json();
        setOriginal(data.meals[0]);
        // const ingredient = data.meals[0]['strIngredient1'];
        const {
          strMeal: name, strMealThumb: image, strCategory: category, strArea: area,
          strInstructions: instructions, strIngredient1, strIngredient2,
          strIngredient3, strIngredient4, strIngredient5,
          strIngredient6, strIngredient7, strIngredient8,
          strIngredient9, strIngredient10,
          strIngredient11, strIngredient12, strIngredient13, strIngredient14,
          strIngredient15, strMeasure1, strMeasure2, strMeasure3,
          strMeasure4, strMeasure5, strMeasure6, strMeasure7,
          strMeasure8, strMeasure9, strMeasure10, strMeasure11, strMeasure12,
          strMeasure13, strMeasure14, strMeasure15, strYoutube: youtube,
        } = data.meals[0];
        const ingrd = [
          strIngredient1, strIngredient2,
          strIngredient3, strIngredient4, strIngredient5, strIngredient6,
          strIngredient7, strIngredient8, strIngredient9,
          strIngredient10, strIngredient11, strIngredient12, strIngredient13,
          strIngredient14, strIngredient15];
        const measure = [
          strMeasure1, strMeasure2, strMeasure3, strMeasure4, strMeasure5,
          strMeasure6, strMeasure7, strMeasure8, strMeasure9, strMeasure10,
          strMeasure11, strMeasure12, strMeasure13, strMeasure14, strMeasure15,
        ];
        const ingredientsReduced = unite(ingrd, measure);
        const newFood = { name,
          image,
          category,
          area,
          instructions,
          ingredientsReduced,
          youtube };
        setmeals(newFood);
      } catch (error) {
        console.log(error);
      }
    }
    getMeal();
  }, [id]);

  useEffect(() => {
    const receitasFeitas = JSON.parse(localStorage.getItem('doneRecipes'));
    setDoneRecipes(receitasFeitas);
    const getFavorites = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const isFavorite = getFavorites.some((item) => item.id === id);
    setFavorited(isFavorite);
  }, []);
  if (!meals) {
    return <Link to="/home" className="btn btn-primary">back home</Link>;
  }
  const {
    name,
    image,
    category,
    instructions,
    youtube,
  } = meals;
  const shareFoods = () => {
    const URL = `http://localhost:3000/foods/${id}`;
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
        type: 'food',
        nationality: original.strArea,
        category: original.strCategory,
        alcoholicOrNot: '',
        name: original.strMeal,
        image: original.strMealThumb,
      };
      const getFavorites = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
      localStorage.setItem('favoriteRecipes', JSON.stringify([...getFavorites, obj]));
    }
    setFavorited(!favorited);
  };

  return (
    <section className="sectionmeals-section">
      <div className="header-container-drinks">
        <Header pageName="Explore Foods" />
      </div>

      <img
        className="recipe-photo"
        data-testid="recipe-photo"
        src={ image }
        alt={ name }
      />

      <div className="name-buttons">
        <h2 data-testid="recipe-title">{name}</h2>

        {copied ? (
          <button
            className="shareBtn"
            type="button"
            onClick={ shareFoods }
            data-testid="share-btn"
          >
            Link copied!
          </button>
        ) : (
          <div>
            <button
              type="button"
              className="shareBtn"
              onClick={ shareFoods }
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
        <h3 data-testid="recipe-category">{category}</h3>
      </div>

      <div>
        <h2>ingredients :</h2>
        <ul>
          {meals && meals.ingredientsReduced.map((elem, index) => (
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
      <h2>instructions:</h2>
      <p className="leia" data-testid="instructions">
        {instructions}
      </p>
      <section
        data-testid="video"
        className="details-containers"
      >
        <h2 className="recipe-subtitle">Video</h2>
        <iframe
          src={ youtube.replace('watch?v=', 'embed/') }
          allowFullScreen
          title="recipeVideo"
        />
      </section>
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

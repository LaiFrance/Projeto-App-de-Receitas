import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import BarraInferior from '../components/BarraInferior';
import Header from '../components/Header';
import Recommended from '../components/Recomended';

export default function SingleCocktail() {
  const { id } = useParams();
  const [loading, setLoading] = React.useState(false);
  const history = useHistory();
  const redirect = () => {
    history.push(`${history.location.pathname}/in-progress`);
  };
  const [cocktail, setCocktail] = React.useState(null);

  React.useEffect(() => {
    setLoading(true);
    async function getCocktail() {
      try {
        const response = await fetch(
          `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`,
        );
        const data = await response.json();
        // console.log(data);

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
          const newCocktail = {
            name,
            image,
            info,
            category,
            glass,
            instructions,
            ingredients,
            measure,
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
    ingredients,
    measure,
  } = cocktail;
  return (
    <section className="sectioncocktail-section">
      {/* <Link to="/drinks" className="btn btn-primary">
        back home
      </Link> */}
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

        {/* <div className="drink">
          <p data-testid="recipe-category">
            {category}
          </p>
          <p>
            {info}
          </p>
        </div> */}

        <div data-testid="0-ingredient-name-and-measure">
          <h2>ingredients :</h2>
          <ul>
            {ingredients.map((elem, index) => (
              elem ? <li key={ index }>{elem}</li> : null))}
            <ul>
              {measure.map((elem, index) => (
                elem ? <li key={ index }>{elem}</li> : null))}
            </ul>
          </ul>

        </div>
        <h2> instructions:</h2>
        <p data-testid="instructions">
          {instructions}
        </p>
        <button
          data-testid="start-recipe-btn"
          type="button"
          className="start-recipe-btn"
          onClick={ redirect }
        >
          Continue Recipe

        </button>
      </div>
      <Recommended />
      <BarraInferior />
    </section>

  );
}

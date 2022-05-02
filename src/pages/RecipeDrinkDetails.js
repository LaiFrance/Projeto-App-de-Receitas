import React from 'react';
import { useParams, Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import '../style/drinkDetails.css';

export default function SingleCocktail() {
  const { id } = useParams();

  const [loading, setLoading] = React.useState(false);

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
            strDrink: name,
            strDrinkThumb: image,
            strCategory: category,
            strGlass: glass,
            strInstructions: instructions,
            strAlcoholic: info,
            strIngredient1,
            strIngredient2,
            strIngredient3,
            strIngredient4,
            strIngredient5,
          } = data.drinks[0];
          const ingredients = [
            strIngredient1,
            strIngredient2,
            strIngredient3,
            strIngredient4,
            strIngredient5,
          ];
          const newCocktail = {
            name,
            image,
            info,
            category,
            glass,
            instructions,
            ingredients,
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
    category,
    info,
    instructions,
    ingredients,
  } = cocktail;
  return (
    <section className="sectioncocktail-section">
      <Link to="/drinks" className="btn btn-primary">
        back home
      </Link>
      <h2 data-testid="recipe-title" className="section-title">{name}</h2>
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
      </button>
      <div className="drink">
        <img
          data-testid="recipe-photo"
          className="drink-image"
          src={ image }
          alt={ name }
        />
        <div className="drink-info">
          <p>
            {name}
          </p>
          <p data-testid="recipe-category">
            {category}
          </p>
          <p>
            {info}
          </p>

          <h2>ingredients :</h2>
          <ul data-testid="0-ingredient-name-and-measure">
            {ingredients.map((item, index) => (
              item ? <li key={ index }>{item}</li> : null))}
          </ul>
          <h2> instructions:</h2>
          <p data-testid="instructions">
            {instructions}
          </p>
        </div>
        <button
          data-testid="start-recipe-btn"
          type="button"
          className="start-recipe-btn"
        >
          Iniciar Receita

        </button>
      </div>
    </section>
  );
}

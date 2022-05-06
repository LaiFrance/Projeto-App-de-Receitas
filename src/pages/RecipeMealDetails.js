import React from 'react';
import { useParams, Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import BarraInferior from '../components/BarraInferior';
import Header from '../components/Header';
import '../style/foodDetails.css';
import Recommended from '../components/Recomended';

export default function RecipeMealDetails() {
  const { id } = useParams();

  const [loading, setLoading] = React.useState(false);

  const [meals, setmeals] = React.useState(null);

  React.useEffect(() => {
    setLoading(true);
    async function getMeal() {
      try {
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
        );
        const data = await response.json();
        console.log(data.meals);
        if (data.meals) {
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
            strMeasure13, strMeasure14, strYoutube: youtube,
          } = data.meals[0];
          const ingredients = [
            strIngredient1, strIngredient2,
            strIngredient3, strIngredient4, strIngredient5, strIngredient6,
            strIngredient7, strIngredient8, strIngredient9,
            strIngredient10, strIngredient11, strIngredient12, strIngredient13,
            strIngredient14, strIngredient15];
          const measure = [
            strMeasure1, strMeasure2, strMeasure3, strMeasure4, strMeasure5,
            strMeasure6, strMeasure7, strMeasure8, strMeasure9, strMeasure10,
            strMeasure11, strMeasure12, strMeasure13, strMeasure14,
          ];
          const newFood = { name,
            image,
            category,
            area,
            instructions,
            ingredients,
            measure,
            youtube };
          setmeals(newFood);
        } else {
          setmeals(null);
        }
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }
    getMeal();
  }, [id]);
  if (loading) {
    return <h2 className="section-title">Loading...</h2>;
  }
  if (!meals) {
    return <Link to="/home" className="btn btn-primary">back home</Link>;
  }
  const {
    name,
    image,
    category,
    instructions,
    ingredients,
    measure,
    youtube,
  } = meals;

  return (
    <section className="sectionmeals-section">
      {/* <Link to="/foods" className="btn btn-primary">
      back meals
    </Link> */}
      <div className="header-container">
        <Header pageName="Explore Foods" />
      </div>

      <img
        data-testid="recipe-photo"
        src={ image }
        alt={ name }
      />

      <div className="name-buttons">
        <h2 data-testid="recipe-title">{name}</h2>
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
          <img id="favorite-white" src={ whiteHeartIcon } alt="favorite" />
          <img id="favorite-black" src={ blackHeartIcon } alt="favoritee" />

        </button>
        <h3 data-testid="recipe-category">{category}</h3>
      </div>
      <div className="Meal-ingredients">
        <h2>ingredients :</h2>
        <div data-testid="0-ingredient-name-and-measure">
          <ul>
            {ingredients.map((elem, index) => (
              elem ? <li key={ index }>{elem}</li> : null))}
            {measure.map((elem, index) => (
              elem ? <li key={ index }>{elem}</li> : null))}
          </ul>

        </div>
      </div>
      <h2>instructions:</h2>
      <p data-testid="instructions">
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
      <button
        data-testid="start-recipe-btn"
        type="button"
        className="start-recipe-btn"
      >
        Iniciar Receita
      </button>
      <Recommended />
      <BarraInferior />
    </section>
  );
}

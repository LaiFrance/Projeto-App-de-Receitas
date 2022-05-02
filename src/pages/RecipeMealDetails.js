import React from 'react';
import { useParams, Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
// import RecipeVideoDetails from '../components/RecipeVideoDetails';
import '../style/foodDetails.css';

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
        // console.log(data);
        if (data.meals) {
          const {
            strMeal: name, strMealThumb: image, strCategory: category, strArea: area,
            strInstructions: instructions, strIngredient1, strIngredient2,
            strIngredient3, strIngredient4, strIngredient5,
            strIngredient6, strIngredient7, strIngredient8,
            strIngredient9, strIngredient10,
            strIngredient11, strIngredient12, strIngredient13, strIngredient14,
            strIngredient15,
            strYoutube: youtube,
          } = data.meals[0];
          const ingredients = [
            strIngredient1, strIngredient2,
            strIngredient3, strIngredient4,
            strIngredient5, strIngredient6,
            strIngredient7,
            strIngredient8,
            strIngredient9,
            strIngredient10,
            strIngredient11,
            strIngredient12,
            strIngredient13,
            strIngredient14,
            strIngredient15,
          ];
          const newFood = { name,
            image,
            category,
            area,
            instructions,
            ingredients,
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
    area,
    instructions,
    ingredients,
    youtube,
  } = meals;

  return (
    <section className="sectionmeals-section">
      <Link to="/foods" className="btn btn-primary">
        back meals
      </Link>
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
      <h1 data-testid="recipe-title">{name}</h1>
      <div className="Meal-image">
        <img
          data-testid="recipe-photo"
          src={ image }
          alt={ name }
        />
        <div className="info">
          <p>
            {name}
          </p>
          <p data-testid="recipe-category">
            {category}
          </p>
          <p>
            {area}
          </p>
          <h2>ingredients :</h2>
          <ul>
            {ingredients.map((elem, index) => (
              elem ? <li key={ index }>{elem}</li> : null))}
          </ul>
          <h2>instructions:</h2>
          <p data-testid="instructions">
            {instructions}
          </p>
        </div>
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
      </div>
    </section>
  );
}

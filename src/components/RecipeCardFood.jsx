import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function RecipeCardFood({ recipe, index }) {
  return (
    <Link
      className="recipe-card"
      data-testid={ `${index}-recipe-card` }
      to={ `/foods/${recipe.idMeal}` }
    >
      <h3 className="card-name" data-testid={ `${index}-card-name` }>{recipe.strMeal}</h3>
      <img
        className="card-img"
        data-testid={ `${index}-card-img` }
        src={ recipe.strMealThumb }
        alt={ recipe.strMeal }
      />
      <h3 className="card-name" data-testid={ `${index}-card-name` }>{recipe.strMeal}</h3>
    </Link>
  );
}

RecipeCardFood.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.string).isRequired,
  index: PropTypes.number.isRequired,
};

export default RecipeCardFood;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

export default function DoneRecipesCard({ recipe, index,
  addToFavorites, removeFromFavorites, favorites }) {
  const [copied, setCopied] = useState(false);

  const shareFoods = (id) => {
    const URL = `http://localhost:3000/foods/${id}`;
    navigator.clipboard.writeText(URL);
    setCopied(!copied);
  };

  const shareDrinks = (id) => {
    const URL = `http://localhost:3000/drinks/${id}`;
    navigator.clipboard.writeText(URL);
    setCopied(!copied);
  };
  return (
    <div>
      {recipe && recipe.type === 'food' ? (
        <div key={ index } className="recipe-card">
          <Link to={ `/foods/${recipe.id}` }>
            <img
              data-testid={ `${index}-horizontal-image` }
              src={ recipe.image }
              alt={ `imagem de ${recipe.name}` }
            />
          </Link>
          <div>
            <Link to={ `/foods/${recipe.id}` }>
              <h3 data-testid={ `${index}-horizontal-name` }>{recipe.name}</h3>
            </Link>
            <span
              data-testid={ `${index}-horizontal-top-text` }
            >
              {`${recipe.nationality} - ${recipe.category}`}
            </span>
            <br />
            <span
              data-testid={ `${index}-horizontal-done-date` }
            >
              {recipe.doneDate}
            </span>
            {copied ? (
              <button
                className="shareBtn"
                type="button"
                onClick={ () => shareFoods(recipe.id) }
                data-testid={ `${index}-horizontal-share-btn` }
              >
                Link copied!
              </button>
            ) : (
              <div>
                <button
                  type="button"
                  className="shareBtn"
                  onClick={ () => shareFoods(recipe.id) }
                >
                  <img
                    data-testid={ `${index}-horizontal-share-btn` }
                    src={ shareIcon }
                    alt="share"
                  />
                </button>
              </div>
            )}
            {favorites?.find((fav) => fav.id === recipe.id) ? (
              <button
                type="button"
                onClick={ () => removeFromFavorites(recipe) }
              >
                <img
                  src={ blackHeartIcon }
                  data-testid={ `${index}-horizontal-favorite-btn` }
                  alt="favorited"
                />
              </button>
            ) : (
              <button
                type="button"
                onClick={ () => addToFavorites(recipe) }
              >
                <img
                  src={ whiteHeartIcon }
                  data-testid={ `${index}-horizontal-favorite-btn` }
                  alt="not favorite yet"
                />
              </button>
            )}
            {recipe.tags?.length > 0 && recipe.tags.slice(0, 2).map((tag) => (
              <span
                key={ tag }
                data-testid={ `${index}-${tag}-horizontal-tag` }
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      ) : (
        <div key={ index } className="recipe-card">
          <Link to={ `/drinks/${recipe.id}` }>
            <img
              data-testid={ `${index}-horizontal-image` }
              src={ recipe.image }
              alt={ `imagem de ${recipe.name}` }
            />
          </Link>
          <div>
            <Link to={ `/drinks/${recipe.id}` }>
              <h3 data-testid={ `${index}-horizontal-name` }>{recipe.name}</h3>
            </Link>
            <span
              data-testid={ `${index}-horizontal-top-text` }
            >
              {`${recipe.category} - ${recipe.alcoholicOrNot}`}
            </span>
            <br />
            <span
              data-testid={ `${index}-horizontal-done-date` }
            >
              {recipe.doneDate}
            </span>
            <div>
              {copied ? (
                <button
                  className="shareBtn"
                  type="button"
                  onClick={ () => shareDrinks(recipe.id) }
                >
                  Link copied!

                </button>
              ) : (
                <div>
                  <button
                    className="shareBtn"
                    type="button"
                    onClick={ () => shareDrinks(recipe.id) }
                  >
                    <img
                      data-testid={ `${index}-horizontal-share-btn` }
                      src={ shareIcon }
                      alt="share"
                    />
                  </button>
                </div>
              )}
              {favorites?.find((fav) => fav.id === recipe.id) ? (
                <button
                  type="button"
                  onClick={ () => removeFromFavorites(recipe) }
                >
                  <img
                    src={ blackHeartIcon }
                    data-testid={ `${index}-horizontal-favorite-btn` }
                    alt="favorited"
                  />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={ () => addToFavorites(recipe) }
                >
                  <img
                    src={ whiteHeartIcon }
                    data-testid={ `${index}-horizontal-favorite-btn` }
                    alt="not favorite yet"
                  />
                </button>
              )}

            </div>
            {recipe.tags?.length > 0 && recipe.tags.map((drinktag) => (
              <span
                key={ drinktag }
                data-testid={ `${index}-${drinktag}-horizontal-tag` }
              >
                {drinktag}
              </span>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}

DoneRecipesCard.defaultProps = {
  addToFavorites: undefined,
  removeFromFavorites: undefined,
  favorites: undefined,
};

DoneRecipesCard.propTypes = {
  recipe: PropTypes.shape({
    type: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string,
    category: PropTypes.string,
    image: PropTypes.string,
    alcoholicOrNot: PropTypes.string,
    doneDate: PropTypes.string,
    nationality: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  index: PropTypes.number.isRequired,
  addToFavorites: PropTypes.func,
  removeFromFavorites: PropTypes.func,
  favorites: PropTypes.arrayOf(PropTypes.object),
};

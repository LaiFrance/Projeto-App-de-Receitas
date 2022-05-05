import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import '../style/doneRecipes.css';

export default function DoneRecipes() {
  const [copied, setCopied] = useState(false);
  const [originalRecipes, setOriginalRecipes] = useState([]);

  const doneRecipes = [
    {
      id: '52771',
      type: 'food',
      nationality: 'Italian',
      category: 'Vegetarian',
      alcoholicOrNot: '',
      name: 'Spicy Arrabiata Penne',
      image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
      doneDate: '23/06/2020',
      tags: ['Pasta', 'Curry'],
    },
    {
      id: '178319',
      type: 'drink',
      nationality: '',
      category: 'Cocktail',
      alcoholicOrNot: 'Alcoholic',
      name: 'Aquamarine',
      image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
      doneDate: '23/06/2020',
      tags: [],
    },
  ];

  useEffect(() => {
    setOriginalRecipes(doneRecipes);
  }, []);

  const handleAllBtn = () => {
    setOriginalRecipes(doneRecipes);
  };

  const handleDrinksBtn = () => {
    const drinks = doneRecipes.filter((item) => item.type === 'drink');
    setOriginalRecipes(drinks);
  };

  const handleFoodsBtn = () => {
    const foods = doneRecipes.filter((item) => item.type === 'food');
    setOriginalRecipes(foods);
  };

  // const clipboard = useClipboard();

  const shareFoods = (id) => {
    const URL = `http://localhost:3000/foods/${id}`;
    // clipboard.copy(URL);
    console.log(URL);
    navigator.clipboard.writeText(URL);
    setCopied(!copied);
  };

  const shareDrinks = (id) => {
    const URL = `http://localhost:3000/drinks/${id}`;
    // clipboard.copy(URL);
    console.log(URL);
    navigator.clipboard.writeText(URL);
    setCopied(!copied);
  };

  return (
    <div>
      <div className="header-container">
        <Header pageName="Done Recipes" />
        <nav>
          <button
            data-testid="filter-by-food-btn"
            type="button"
            onClick={ handleFoodsBtn }
          >
            Food
          </button>
          <button
            data-testid="filter-by-drink-btn"
            type="button"
            onClick={ handleDrinksBtn }
          >
            Drinks
          </button>
          <button
            data-testid="filter-by-all-btn"
            type="button"
            onClick={ handleAllBtn }
          >
            All
          </button>
        </nav>
      </div>

      <div className="recipes-container">
        {originalRecipes ? originalRecipes.map((recipe, index) => (
          // <DnFoodRecipesCard recipe={recipe} index={index}/>
          recipe.type === 'food' ? (
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
                )}
                {recipe.tags.length > 0 && recipe.tags.slice(0, 2).map((tag) => (
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
                {copied ? (
                  <button
                    className="shareBtn"
                    type="button"
                    onClick={ () => shareDrinks(recipe.id) }
                  >
                    Link copied!

                  </button>
                ) : (
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
                )}
                {recipe.tags.length > 0 && recipe.tags.map((drinktag) => (
                  <span
                    key={ drinktag }
                    data-testid={ `${index}-${drinktag}-horizontal-tag` }
                  >
                    {drinktag}
                  </span>
                ))}
              </div>
            </div>
          )
        )) : ''}
      </div>
    </div>
  );
}

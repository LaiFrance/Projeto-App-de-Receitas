import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDataFood } from '../context/Providers/FoodProvider';
import { useDataDrinks } from '../context/Providers/DrinksProvider';

export default function BarraBusca() {
  const { push } = useHistory();
  const { isClick } = useDataFood();
  const { splicedDrinks, setSplicedDrinks } = useDataDrinks();
  const [search, setSearch] = useState();
  const [inputText, setInputText] = useState();

  const getRadioApi = async () => {
    let apiSelect = '';
    if (search === 'ingredient') {
      apiSelect = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${inputText}`;
    }
    if (search === 'name') {
      apiSelect = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputText}`;
    }
    if (search === 'letter' && inputText.length > 1) {
      return global.alert('Your search must have only 1 (one) character');
    }
    if (search === 'letter') {
      apiSelect = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${inputText}`;
    }
    const response = await fetch(apiSelect);
    const data = await response.json();
    if (!data.drinks) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
    return data.drinks ? setSplicedDrinks(data.drinks) : setSplicedDrinks([]);
  };

  useEffect(() => {
    if (splicedDrinks.length === 1) {
      push(`/drinks/${splicedDrinks[0].idDrink}`);
    }
  }, [splicedDrinks]);

  return (
    <div>
      <div className="searchInput">
        {isClick && <input
          type="text"
          data-testid="search-input"
          onChange={ ({ target }) => setInputText(target.value) }
        />}
      </div>
      <label htmlFor="busca">
        <input
          type="radio"
          name="busca"
          value="ingredient"
          data-testid="ingredient-search-radio"
          onChange={ ({ target }) => setSearch(target.value) }
        />
        Ingredient
      </label>
      <label htmlFor="busca">
        <input
          type="radio"
          name="busca"
          value="name"
          data-testid="name-search-radio"
          onChange={ ({ target }) => setSearch(target.value) }
        />
        Name
      </label>
      <label htmlFor="busca">
        <input
          type="radio"
          name="busca"
          value="letter"
          data-testid="first-letter-search-radio"
          onChange={ ({ target }) => setSearch(target.value) }
        />
        First letter
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ () => {
          getRadioApi();
        } }
      >
        Search
      </button>
    </div>
  );
}

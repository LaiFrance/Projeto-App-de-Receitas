import React, { useState } from 'react';
import { useDataFood } from '../context/Providers/FoodProvider';

export default function BarraBusca() {
  const { isClick, setSplicedFoods } = useDataFood();
  const [search, setSearch] = useState();
  const [inputText, setInputText] = useState();

  const getRadioApi = async () => {
    let apiSelect = '';
    if (search === 'ingredient') {
      apiSelect = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${inputText}`;
    }
    if (search === 'name') {
      apiSelect = `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputText}`;
    }
    if (search === 'letter') {
      apiSelect = `https://www.themealdb.com/api/json/v1/1/search.php?f=${inputText}`;
    }
    if (search === 'letter' && inputText.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    }
    const response = await fetch(apiSelect);
    const data = await response.json();
    console.log(data.meals);
    return setSplicedFoods(data.meals);
  };

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
        onClick={ () => getRadioApi() }
      >
        Search
      </button>
      {/* {apiRadio.map((e) => <p key={ e }>{e}</p>)} */}
    </div>
  );
}

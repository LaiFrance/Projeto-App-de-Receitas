import React, { useEffect, useState } from 'react';
import BarraInferior from '../components/BarraInferior';
import RecipeCardFood from '../components/RecipeCardFood';
import '../style/explorebyArea.css';

export default function ExploreFoodsNationalities() {
  const [areadeorigem, setareadeorigem] = useState('All');
  const [filtraArea, setfiltraArea] = useState([]);
  const [areaList, setareaList] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      if (areadeorigem === 'All') {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
        const data = await response.json();
        setfiltraArea(data.meals);
      } else {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${areadeorigem}`);
        const data = await response.json();
        setfiltraArea(data.meals);
      }
    };
    fetchData();
  }, [areadeorigem]);
  useEffect(() => {
    const fetchAreas = async () => {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
      const data = await response.json();
      console.log(data);
      setareaList(data.meals);
    };
    fetchAreas();
  }, []);

  const doze = 12;
  return (
    <div className="dropdownmenu">
      <div className="explore-origin">
        <select
          className="explore-by-area-dropdown"
          data-testid="explore-by-nationality-dropdown"
          onChange={ (event) => setareadeorigem(event.target.value) }
        >
          <option
            className="areafood"
            value="All"
            data-testid="All-option"
          >
            All
          </option>
          {areaList.map((origin) => (
            <option
              className="areafood"
              data-testid={ `${origin.strArea}-option` }
              key={ origin.strArea }
              value={ origin.strArea }
            >
              {origin.strArea}
            </option>
          ))}
        </select>
        <section className="recipes-list">
          {filtraArea.map((meal, index) => {
            if (index < doze) {
              return (
                <RecipeCardFood key={ meal.idMeal } recipe={ meal } index={ index } />
              );
            }
            return null;
          })}
        </section>
      </div>
      <BarraInferior />
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import RecipeCardFood from './RecipeCardFood';

export default function Recommended() {
  const [meals] = useState('All');
  const [recomendamos, setrecomendamos] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      if (meals === 'All') {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
        const data = await response.json();
        setrecomendamos(data.meals);
      } else {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${meals}`);
        const data = await response.json();
        setrecomendamos(data.meals);
      }
    };
    fetchData();
  }, [meals]);

  const seis = 5;
  return (

    <section data-testid="0-recomendation-card" className="recipes-list">
      <h1 data-testid="0-recomendation-title">
        Recomendation:
        {recomendamos.map((meal, index) => {
          if (index <= seis) {
            return (
              <RecipeCardFood key={ meal.idMeal } recipe={ meal } index={ index } />

            );
          }
          return null;
        })}
      </h1>
    </section>
  );
}

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

  const seis = 6;
  return (
    <section data-testid="0-recomendation-card" className="container">
      <h2>Recomendations</h2>
      <div className="carousel" data-testid="0-recomendation-title">
        {recomendamos.map((meal, index) => {
          if (index <= seis) {
            return (
              <RecipeCardFood key={ meal.idMeal } recipe={ meal } index={ index } />
            );
          }
          return null;
        })}
      </div>
    </section>
  );
}

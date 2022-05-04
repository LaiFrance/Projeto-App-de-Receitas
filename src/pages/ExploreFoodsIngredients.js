import React from 'react';
import BarraInferior from '../components/BarraInferior';
import Header from '../components/Header';

export default function ExploreFoodsIngredients() {
  return (
    <div>
      <div className="header-container">
        <Header pageName="Explore Ingredients" />
      </div>
      <BarraInferior />
    </div>

  );
}

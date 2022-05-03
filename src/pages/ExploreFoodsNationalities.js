import React from 'react';
import BarraInferior from '../components/BarraInferior';
import Header from '../components/Header';

export default function ExploreFoodsNationalities() {
  return (
    <div>
      <div className="header-container">
        <Header pageName="Explore Nationalities" />
      </div>

      <BarraInferior />
    </div>

  );
}

import React, { useContext } from 'react';
import Context from '../context/Context';
import BarraInferior from '../components/BarraInferior';

export default function Foods() {
  const foods = useContext(Context);
  console.log(foods);
  return (
    <div>
      <h2>Foods</h2>
      <BarraInferior />
    </div>

  );
}

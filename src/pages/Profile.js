import React from 'react';
import { useHistory } from 'react-router-dom';
import BarraInferior from '../components/BarraInferior';

export default function Profile() {
  const history = useHistory();
  const logOff = () => {
    history.push('/');
  };

  const favoriteBtn = () => {
    history.push('/favorite-recipes');
  };

  const doneBtn = () => {
    history.push('/done-recipes');
  };

  return (
    <div>
      <h2>Profile</h2>
      {/* E-mail do usuário visível */}
      <form action="POST">
        <input
          type="text"
          data-testid="email-input"
          placeholder="Email"
          name="email"
          id="email"
        />

        {/* Criação de 3 botões: Done, Recipe, Logout */}
        <button
          type="button"
          data-testid="btn-done-recipe"
          name="Done Recipes"
          value="btn1"
          placeholder="Done Recipes"
          onClick={ doneBtn }
        >
          Receitas feitas
        </button>
        <button
          type="button"
          name="Favorite Recipes"
          data-testid="btn-favorite-recipe"
          value="btn2"
          placeholder="Favorite Recipes"
          onClick={ favoriteBtn }
        >
          Receitas favoritas
        </button>
        <button
          type="button"
          data-testid="btn-logout"
          name="Logout"
          value="btn3"
          placeholder="Logout"
          onClick={ logOff }
        >
          Logout
        </button>
      </form>
      <BarraInferior />
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import BarraInferior from '../components/BarraInferior';

export default function Profile() {
  const [email, setEmail] = useState('');
  const history = useHistory();

  useEffect(() => {
    const emailInStorage = JSON.parse(localStorage.getItem('user'));
    setEmail(emailInStorage.email);
  }, []);

  const logOff = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('mealsToken');
    localStorage.removeItem('cocktailsToken');
    localStorage.removeItem('doneRecipes');
    localStorage.removeItem('favoriteRecipes');
    localStorage.removeItem('inProgressRecipes');

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
        {email !== undefined ? (
          <span data-testid="profile-email">
            {email}
          </span>
        ) : ''}

        {/* Criação de 3 botões: Done, Recipe, Logout */}
        <button
          type="button"
          data-testid="profile-done-btn"
          onClick={ doneBtn }
        >
          Done Recipes
        </button>
        <button
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ favoriteBtn }
        >
          Favorite Recipes
        </button>
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ logOff }
        >
          Logout
        </button>
      </form>
      <BarraInferior />
    </div>
  );
}

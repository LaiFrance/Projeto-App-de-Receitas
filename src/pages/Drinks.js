import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { DrinkContext } from '../context/Providers/DrinksProvider';
import BarraInferior from '../components/BarraInferior';
import CategoryBtn from '../components/CategoryBtn';
import { searchDrinkByCategory } from '../services/index';
import Header from '../components/Header';

export default function Drinks() {
  const [toggleState, setToggleState] = useState(false);
  const [drinks, setDrinks] = useState([]);
  const [prevCategory, setPrevCategory] = useState('');
  const history = useHistory();

  const { splicedDrinks, categories } = useContext(DrinkContext);

  useEffect(() => {
    setDrinks(splicedDrinks);
  }, [splicedDrinks]);

  const handleAllBtn = () => {
    setPrevCategory('');
    setDrinks(splicedDrinks);
    setToggleState(false);
  };

  const handleRedirectDrinkCard = (id) => {
    history.push(`/drinks/${id}`);
  };

  const handleCategoryBtn = async (category) => {
    if (prevCategory !== category) {
      // Após ter clicado em um botão de categoria, e clicar direto em outro,
      // cai nessa verificação, que muda de uma categoria para a outra.
      // tendo como parametro a comparação da categoria atual e anterior.
      setPrevCategory(category);
      setToggleState(!toggleState);
      const drinksbyCategory = await searchDrinkByCategory(category);
      setDrinks(drinksbyCategory);
      return;
    }
    if (prevCategory === category) {
      // quando clicado em uma categoria, e depois clicar na mesma categoria,
      // irá cair nessa condição, para que renderize todas as categorias novamente.
      setPrevCategory('');
      setToggleState(!toggleState);
      setDrinks(splicedDrinks);
      return;
    }
    if (toggleState === false) {
      // Ao clicar pela primeira vez no botão da categoria,
      // cai primeiramente nessa verificação
      setPrevCategory(category);
      setToggleState(!toggleState);
      const drinksbyCategory = await searchDrinkByCategory(category);
      setDrinks(drinksbyCategory);
    }
  };

  console.log(drinks);
  return (
    <div>
      <div className="header-container">
        <Header pageName="Drinks" />
      </div>
      <CategoryBtn data={ categories } func={ handleCategoryBtn } all={ handleAllBtn } />
      {drinks.length > 0 ? drinks.map((drink, index) => (
        <div
          key={ index }
          data-testid={ `${index}-recipe-card` }
        >
          <button
            type="button"
            name={ drink.idDrink }
            onClick={ (e) => { handleRedirectDrinkCard(e.target.name); } }
          >
            <img
              className="recipe-card-image"
              data-testid={ `${index}-card-img` }
              src={ drink.strDrinkThumb }
              alt={ `imagem de ${drink.strDrink}` }
            />
          </button>

          <p data-testid={ `${index}-card-name` }>{drink.strDrink}</p>
        </div>
      )) : ''}
      <BarraInferior />
    </div>

  );
}

import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FoodContext } from '../context/Providers/FoodProvider';
import BarraInferior from '../components/BarraInferior';
import CategoryBtn from '../components/CategoryBtn';
import { searchFoodByCategory } from '../services/index';
import '../style/foodPage.css';
import Header from '../components/Header';
import BarraBuscaFood from '../components/BarraBuscaFood';

export default function Foods() {
  const [toggleState, setToggleState] = useState(false);
  const [foods, setFoods] = useState([]);
  const [prevCategory, setPrevCategory] = useState('');
  const { splicedFoods, categories } = useContext(FoodContext);

  useEffect(() => {
    setFoods(splicedFoods);
  }, [splicedFoods]);

  const handleAllBtn = () => {
    setPrevCategory('');
    setFoods(splicedFoods);
    setToggleState(false);
  };

  const handleCategoryBtn = async (category) => {
    if (prevCategory !== category) {
      // Após ter clicado em um botão de categoria, e clicar direto em outro,
      // cai nessa verificação, que muda de uma categoria para a outra.
      // tendo como parametro a comparação da categoria atual e anterior.
      setPrevCategory(category);
      setToggleState(!toggleState);
      const foodsByCategory = await searchFoodByCategory(category);
      setFoods(foodsByCategory);
      return;
    }
    if (prevCategory === category) {
      // quando clicado em uma categoria, e depois clicar na mesma categoria,
      // irá cair nessa condição, para que renderize todas as categorias novamente.
      setPrevCategory('');
      setToggleState(!toggleState);
      setFoods(splicedFoods);
      return;
    }
    if (toggleState === false) {
      // Ao clicar pela primeira vez no botão da categoria,
      // cai primeiramente nessa verificação
      setPrevCategory(category);
      setToggleState(!toggleState);
      const foodsByCategory = await searchFoodByCategory(category);
      setFoods(foodsByCategory);
    }
  };

  const doze = 12;
  return (
    <div className="container-foods">
      <div className="header-container" />
      <Header pageName="Foods" />
      <div>
        <BarraBuscaFood />
      </div>
      <CategoryBtn
        data={ categories }
        func={ handleCategoryBtn }
        all={ handleAllBtn }
      />
      {(foods && foods.length > 0) ? foods.map((food, index) => (
        index < doze && (
          <Link
            data-testid={ `${index}-recipe-card` }
            key={ index }
            to={ `/foods/${food.idMeal}` }
          >
            <img
              className="recipe-card-image"
              data-testid={ `${index}-card-img` }
              src={ food.strMealThumb }
              alt={ `imagem de ${food.strMeal}` }
            />
            <p data-testid={ `${index}-card-name` }>{food.strMeal}</p>
          </Link>
        )
      )) : ''}
      <BarraInferior />
    </div>
  );
}

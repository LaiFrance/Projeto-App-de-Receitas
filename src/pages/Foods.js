import React, { useContext, useState, useEffect } from 'react';
import { FoodContext } from '../context/Providers/FoodProvider';
import BarraInferior from '../components/BarraInferior';
import CategoryBtn from '../components/CategoryBtn';
import { searchFoodByCategory } from '../services/index';

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

  return (
    <div>
      <h2>Foods</h2>
      <CategoryBtn data={ categories } func={ handleCategoryBtn } all={ handleAllBtn } />
      {foods.length > 0 ? foods.map((food, index) => (
        <div key={ index } data-testid={ `${index}-recipe-card` }>
          <img
            data-testid={ `${index}-card-img` }
            src={ food.strMealThumb }
            alt={ `imagem de ${food.strMeal}` }
          />
          <p data-testid={ `${index}-card-name` }>{food.strMeal}</p>
        </div>
      )) : ''}
      <BarraInferior />
    </div>
  );
}

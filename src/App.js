import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import Foods from './pages/Foods';
import Drinks from './pages/Drinks';
import Explore from './pages/Explore';
import ExploreFoods from './pages/ExploreFoods';
import ExploreDrinks from './pages/ExploreDrinks';
import ExploreDrinksIngredients from './pages/ExploreDrinksIngredients';
import ExploreFoodsIngredients from './pages/ExploreFoodsIngredients';
import ExploreFoodsNationalities from './pages/ExploreFoodsNationalities';
import Profile from './pages/Profile';
import FoodProvider from './context/Providers/FoodProvider';
import DrinksProvider from './context/Providers/DrinksProvider';
import RecipeDrinkDetails from './pages/RecipeDrinkDetails';
import RecipeMealDetails from './pages/RecipeMealDetails';
import FavoritesRecipes from './pages/FavoritesRecipes';
import DoneRecipes from './pages/DoneRecipes';
import NotFound from './pages/Notfound';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <FoodProvider>
          <DrinksProvider>
            <Route path="/" exact component={ Login } />
            <Route path="/foods" exact component={ Foods } />
            <Route path="/drinks" exact component={ Drinks } />
            <Route path="/explore" exact component={ Explore } />
            <Route path="/explore/foods" exact component={ ExploreFoods } />
            <Route path="/explore/drinks" exact component={ ExploreDrinks } />
            <Route
              path="/drinks/:id"
              exact
              component={ RecipeDrinkDetails }
            />
            <Route
              path="/foods/:id"
              exact
              component={ RecipeMealDetails }
            />
            <Route
              path="/explore/foods/ingredients"
              exact
              component={ ExploreFoodsIngredients }
            />
            <Route
              path="/explore/drinks/ingredients"
              exact
              component={ ExploreDrinksIngredients }
            />
            <Route
              path="/explore/foods/nationalities"
              exact
              component={ ExploreFoodsNationalities }
            />
            <Route path="/profile" exact component={ Profile } />
            <Route path="/favorite-recipes" exact component={ FavoritesRecipes } />
            <Route path="/done-recipes" exact component={ DoneRecipes } />
            <Route path="/explore/drinks/nationalities" exact component={ NotFound } />
          </DrinksProvider>
        </FoodProvider>
      </Switch>
    </BrowserRouter>
  );
}

export default App;

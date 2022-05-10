export async function getFoodCategories() {
  const cinco = 5;
  const URL = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  const request = await fetch(URL);
  const response = await request.json();
  const categories = response.meals.slice(0, cinco);
  return categories;
}

export async function getDrinkCategories() {
  const cinco = 5;
  const URL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  const request = await fetch(URL);
  const response = await request.json();
  const categories = response.drinks.slice(0, cinco);
  return categories;
}

export async function getMeals() {
  const doze = 12;
  const URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const request = await fetch(URL);
  const response = await request.json();
  const newFoods = response.meals.slice(0, doze);
  return newFoods;
}

export async function getDrinks() {
  const doze = 12;
  const URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const request = await fetch(URL);
  const response = await request.json();
  const newDrinks = response.drinks.slice(0, doze);
  return newDrinks;
}

export async function searchFoodByCategory(category) {
  const doze = 12;
  const URL = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
  const request = await fetch(URL);
  const response = await request.json();
  const foods = response.meals.slice(0, doze);
  return foods;
}

export async function searchDrinkByCategory(category) {
  const doze = 12;
  const URL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;
  const request = await fetch(URL);
  const response = await request.json();
  const drinks = response.drinks.slice(0, doze);
  return drinks;
}

export const listAllIngredients = async () => {
  const response = await fetch(
    'https://www.themealdb.com/api/json/v1/1/list.php?i=list',
  );
  const data = await response.json();
  return data.meals;
};

export const listAllIngredientsDrinks = async () => {
  const response = await fetch(
    'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list',
  );
  const data = await response.json();
  return data.drinks;
};

export const getMealById = async (id) => {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
  );
  const data = await response.json();
  return data.meals;
};

export const getDrinkById = async (id) => {
  const response = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`,
  );
  const data = await response.json();
  return data.drinks;
};

export default getDrinks = async () => {
  try {
    const URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    const request = await fetch(URL);
    const response = await request.json();
    return response;
  } catch (err) {
    throw new Error(err.message);
  }
};

import React from 'react';
import PropTypes from 'prop-types';

export default function CategoryBtn({ data, func: handleCategoryBtn }) {
  return (
    <div>
      <button type="button">All</button>
      {data.length > 0 && data.map((category, index) => (
        <button
          onClick={ (e) => handleCategoryBtn(e.target.name) }
          key={ index }
          name={ category.strCategory }
          data-testid={ `${category.strCategory}-category-filter` }
          type="button"
        >
          {category.strCategory}

        </button>
      ))}
    </div>
  );
}

CategoryBtn.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  func: PropTypes.func.isRequired,

};

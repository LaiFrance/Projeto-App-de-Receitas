import React from 'react';
import PropTypes from 'prop-types';

export default function CategoryBtn({ data }) {
  return (
    <div>
      <button type="button">All</button>
      {data.length > 0 && data.map((category, index) => (
        <button
          key={ index }
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
};

import React from 'react';
import { CATEGORIES } from '../utils/helpers';

const CategoryFilter = ({ selectedCategory, onSelectCategory }) => {
  return (
    <div className="blog-filter">
      {CATEGORIES.map((category) => (
        <button
          key={category}
          className={`blog-filter__pill${
            selectedCategory === category ? ' blog-filter__pill--active' : ''
          }`}
          onClick={() => onSelectCategory(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
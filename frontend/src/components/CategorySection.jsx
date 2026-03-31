import React from "react";

const CategorySection = ({categories,selectedCategory,onCategoryChange,}) => {
  return (
     <div className="flex gap-4 mb-6 justify-center flex-wrap">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`px-4 py-2 rounded ${
            selectedCategory === category
              ? "bg-orange-500 text-white"
              : "bg-gray-200"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};


export default CategorySection;

import { useState } from "react";
import PropTypes from "prop-types";
import "../index.css";

const RecipeCard = ({ info }) => {
  const [showMoreIngredients, setShowMoreIngredients] = useState(false);
  const [showMoreCategories, setShowMoreCategories] = useState(false);

  const maxIngredientsToShow = 3;
  const maxCategoriesToShow = 3;

  const handleShowMoreIngredients = () => {
    setShowMoreIngredients(!showMoreIngredients);
  };

  const handleShowMoreCategories = () => {
    setShowMoreCategories(!showMoreCategories);
  };

  return (
    <div
      className="recipe-card border border-gray-200 rounded-xl p-6 m-3 bg-gradient-to-r from-blue-50 via-white to-green-50 shadow-xl transform transition-transform hover:scale-105 hover:shadow-2xl cursor-pointer w-80 overflow-hidden"
      style={{ height: "500px" }}
    >
      {info.image && (
        <img
          src={info.image || "default-image.jpg"}
          alt={info.title}
          className="w-full h-44 object-cover rounded-t-xl mb-4 shadow-md"
        />
      )}
      <h2 className="text-2xl font-bold text-gray-900 hover:text-green-700 transition-colors duration-300 mb-2">
        {info.title}
      </h2>
      <p className="text-gray-600 text-sm mb-4 italic">
        {info.desc || "No description available"}
      </p>
      <div className="mt-2 text-sm text-gray-800">
        <strong>Rating:</strong> {info.rating ? info.rating.toFixed(1) : "N/A"}
      </div>

      {info.categories && info.categories.length > 0 && (
        <div className="mt-3">
          <strong className="text-sm text-gray-800">Categories:</strong>
          <ul className="max-h-20 overflow-y-auto mt-1">
            {info.categories
              .slice(0, maxCategoriesToShow)
              .map((category, index) => (
                <li key={index} className="text-sm text-gray-700">
                  {category}
                </li>
              ))}
            {info.categories.length > maxCategoriesToShow && (
              <li>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleShowMoreCategories();
                  }}
                  className="text-blue-600 underline text-sm mt-1 hover:text-blue-400 transition duration-200"
                >
                  {showMoreCategories ? "Show Less" : "Show More"}
                </button>
                {showMoreCategories && (
                  <ul className="mt-1">
                    {info.categories
                      .slice(maxCategoriesToShow)
                      .map((category, index) => (
                        <li key={index} className="text-sm text-gray-700">
                          {category}
                        </li>
                      ))}
                  </ul>
                )}
              </li>
            )}
          </ul>
        </div>
      )}

      {info.ingredients && info.ingredients.length > 0 && (
        <div className="mt-3">
          <strong className="text-sm text-gray-800">Ingredients:</strong>
          <ul className="max-h-20 overflow-y-auto mt-1">
            {info.ingredients
              .slice(0, maxIngredientsToShow)
              .map((ingredient, index) => (
                <li key={index} className="text-sm text-gray-700">
                  {ingredient}
                </li>
              ))}
            {info.ingredients.length > maxIngredientsToShow && (
              <li>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleShowMoreIngredients();
                  }}
                  className="text-blue-600 underline text-sm mt-1 hover:text-blue-400 transition duration-200"
                >
                  {showMoreIngredients ? "Show Less" : "Show More"}
                </button>
                {showMoreIngredients && (
                  <ul className="mt-1">
                    {info.ingredients
                      .slice(maxIngredientsToShow)
                      .map((ingredient, index) => (
                        <li key={index} className="text-sm text-gray-700">
                          {ingredient}
                        </li>
                      ))}
                  </ul>
                )}
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

RecipeCard.propTypes = {
  info: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    desc: PropTypes.string,
    image: PropTypes.string,
    rating: PropTypes.number,
    categories: PropTypes.arrayOf(PropTypes.string),
    ingredients: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

RecipeCard.defaultProps = {
  info: {
    desc: "No description available",
    rating: "N/A",
    categories: [],
    ingredients: [],
  },
};

export default RecipeCard;

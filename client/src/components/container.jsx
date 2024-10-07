import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import summaryApi from "../api/index";
import CategoryFilter from "./RecipeFilter";
import "../index.css";

const RecipeContainer = () => {
  const [recipes, setRecipes] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState({});
  const [searchInput, setSearchInput] = useState("");
  const itemsPerPage = 8;
  const { searchQuery, setSearchQuery } = useOutletContext();

  useEffect(() => {
    const fetchRecipes = async () => {
      setError(null);
      try {
        const searchParams = new URLSearchParams({
          page: currentPage,
          size: itemsPerPage,
        });

        // Only append search query if searchInput or searchQuery is present
        if (searchInput) {
          searchParams.append("q", searchInput);
        } else if (searchQuery) {
          searchParams.append("q", searchQuery);
        }

        if (filter && Object.keys(filter).length > 0) {
          Object.entries(filter).forEach(([key, value]) => {
            if (Array.isArray(value)) {
              value.forEach((val) => searchParams.append(key, val));
            } else if (value) {
              searchParams.append(key, value);
            }
          });
        }

        const url = `${
          summaryApi.recipeURL.url
        }/search?${searchParams.toString()}`;
        console.log("Fetching from URL:", url);

        const response = await fetch(url, {
          method: summaryApi.recipeURL.method,
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched data:", data);

        setRecipes(data.recipes || []);
        setTotalPages(Math.ceil(data.total / itemsPerPage));
      } catch (error) {
        console.error("Error fetching recipes:", error);
        setError(error.message || "An error occurred");
        setRecipes([]);
      }
    };

    fetchRecipes();
  }, [currentPage, searchQuery, filter, searchInput]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleKeywordFilterChange = (selectedKeywords) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      categories: selectedKeywords.length > 0 ? selectedKeywords : undefined,
    }));
  };

  const handleSearchButtonClick = () => {
    console.log("Search button clicked with input:", searchInput);

    setSearchQuery(searchInput.trim() === "" ? "" : searchInput);
    setCurrentPage(1);
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gradient-to-r from-green-300 via-white to-blue-300 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">
        Recipe Collection
      </h1>

      <div className="mb-4 flex items-center">
        <input
          type="text"
          placeholder="Search for a recipe..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="border rounded-lg px-4 py-2 mr-2"
        />
        {/* <button
          onClick={handleSearchButtonClick}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Search
        </button> */}
      </div>

      <CategoryFilter onFilterChange={handleKeywordFilterChange} />

      {error && <div className="text-red-500 mt-4">{error}</div>}
      {!error && (
        <div className="overflow-x-auto mt-6 w-full">
          {recipes.length > 0 ? (
            <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
              <thead className="bg-green-600 text-white">
                <tr>
                  <th className="border px-6 py-3 text-left text-lg font-semibold">
                    Title
                  </th>
                  <th className="border px-6 py-3 text-left text-lg font-semibold">
                    Description
                  </th>
                  <th className="border px-6 py-3 text-left text-lg font-semibold">
                    Rating
                  </th>
                  <th className="border px-6 py-3 text-left text-lg font-semibold">
                    Categories
                  </th>
                  <th className="border px-6 py-3 text-left text-lg font-semibold">
                    Ingredients
                  </th>
                </tr>
              </thead>
              <tbody>
                {recipes.map((recipe, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-100 transition duration-300"
                  >
                    <td className="border px-6 py-4 text-gray-800">
                      {recipe._source?.title || recipe.title}
                    </td>
                    <td className="border px-6 py-4 text-gray-600">
                      {recipe._source?.desc ||
                        recipe.desc ||
                        "No description available"}
                    </td>
                    <td className="border px-6 py-4 text-gray-800">
                      {recipe._source?.rating?.toFixed(1) || "N/A"}
                    </td>
                    <td className="border px-6 py-4 text-gray-800">
                      {recipe._source?.categories?.join(", ") || "N/A"}
                    </td>
                    <td className="border px-6 py-4 text-gray-800">
                      {recipe._source?.ingredients?.join(", ") || "N/A"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-500 text-lg mt-4">No recipes found.</p>
          )}
        </div>
      )}
      {recipes.length > 0 && (
        <div className="flex items-center mt-8">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="mr-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg bg-white hover:bg-gray-200 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Prev
          </button>
          <span className="mx-4 px-4 py-2 text-lg font-semibold text-gray-800">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="ml-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg bg-white hover:bg-gray-200 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default RecipeContainer;

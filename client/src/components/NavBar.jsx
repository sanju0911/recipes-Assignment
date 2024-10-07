import { FaSearch } from "react-icons/fa";
import { useState, useEffect } from "react";

function NavBar({ onSearch, onFilterChange }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [selectedKeywords, setSelectedKeywords] = useState(["All"]);

  const keywords = [
    "Healthy",
    "Garlic",
    "Herb",
    "Salad",
    "Egg",
    "Chicken",
    "Vegetarian",
  ];

  useEffect(() => {
    if (selectedKeywords.length === 0) {
      setSelectedKeywords(["All"]);
    }
  }, [selectedKeywords]);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      onSearch(searchQuery); 
      setSearchQuery(""); 
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch(); // Search when "Enter" is pressed
    }
  };

  const handleFilterToggle = () => {
    setFiltersVisible(!filtersVisible);
  };

  const handleKeywordChange = (keyword) => {
    if (keyword === "All") {
      setSelectedKeywords(["All"]);
      onFilterChange([]);
    } else {
      let updatedKeywords = selectedKeywords.includes(keyword)
        ? selectedKeywords.filter((k) => k !== keyword)
        : [...selectedKeywords.filter((k) => k !== "All"), keyword];

      if (updatedKeywords.length === 0) {
        updatedKeywords = ["All"];
      }

      setSelectedKeywords(updatedKeywords);
      onFilterChange(updatedKeywords.filter((k) => k !== "All"));
    }
  };

  return (
    <nav className="bg-gradient-to-r from-purple-600 to-indigo-500 shadow-lg fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto h-16 flex items-center justify-between px-4">
        {/* Brand Name */}
        <div className="text-white font-bold text-2xl">
          <strong>Uniquerecipes</strong>
        </div>

        {/* Search Bar */}
        <div className="flex items-center w-full max-w-lg border-2 border-white rounded-full p-2 bg-white shadow-lg mx-4">
          <input
            type="text"
            placeholder="Search for recipes..."
            className="w-full px-4 py-2 rounded-l-full outline-none focus:ring-2 focus:ring-purple-400 transition duration-200"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Update state on input change
            onKeyDown={handleKeyDown} // Trigger search on Enter key press
          />
          <button
            onClick={handleSearch} // Trigger search on button click
            className="flex items-center justify-center h-10 w-10 bg-red-600 rounded-full hover:bg-red-700 transition duration-200"
          >
            <FaSearch className="text-white" />
          </button>
        </div>

        {/* Filters Toggle Button */}
        <div className="relative">
          <button
            onClick={handleFilterToggle}
            className="text-white text-lg mx-4 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition duration-200"
          >
            {filtersVisible ? "Hide Filters" : "Show Filters"}
          </button>

          {/* Filter Options Dropdown */}
          {filtersVisible && (
            <div className="absolute top-16 right-0 bg-white shadow-lg rounded-lg p-4 z-10 w-64">
              <h3 className="font-bold text-lg mb-2">Filters</h3>
              <div className="grid grid-cols-1 gap-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    value="All"
                    checked={selectedKeywords.includes("All")}
                    onChange={() => handleKeywordChange("All")}
                    className="form-checkbox h-5 w-5 text-blue-600 rounded transition duration-200"
                  />
                  <span className="ml-2 text-gray-800">All</span>
                </label>
                {keywords.map((keyword) => (
                  <label key={keyword} className="flex items-center">
                    <input
                      type="checkbox"
                      value={keyword}
                      checked={selectedKeywords.includes(keyword)}
                      onChange={() => handleKeywordChange(keyword)}
                      className="form-checkbox h-5 w-5 text-blue-600 rounded transition duration-200"
                    />
                    <span className="ml-2 text-gray-800">{keyword}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile/Placeholder */}
        <div className="text-white text-2xl cursor-pointer">
          <strong>sanjay janardhan</strong>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;

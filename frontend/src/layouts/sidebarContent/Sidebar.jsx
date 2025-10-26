import { useContext, useState } from "react";
import { ProductContext } from "../../context/ProductContext";

function Sidebar() {
  const { filters, setFilters, categories, defaultPriceRange } = useContext(ProductContext);

  function handleSelectFilter(e) {
    setFilters({ ...filters, category: e.target.value });
  }
  function handlePriceChange(e) {
    const { id, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      priceRange: { ...prev.priceRange, [id]: Number(value) },
    }));
  }

  function handleRestFilter(){
    const newFilter = {
      category: "All",
      priceRange: { min: defaultPriceRange.min, max: defaultPriceRange.max },
    }
    setFilters(newFilter);
  }

  return (
    <aside
      id="sidebar"
      className="w-64 h-screen bg-gray-50 dark:bg-gray-800 p-4 overflow-y-auto"
      aria-label="Filter Sidebar"
    >
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Filters
      </h2>
      {/* Category Select */}
      <div className="mb-6">
        <label
          htmlFor="category"
          className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Category
        </label>
        <select
          id="category"
          value={filters.category}
          onChange={handleSelectFilter}
          className="w-full p-2 text-gray-900 bg-white border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
        >
          <option value="All">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          Price Range
        </label>
        <div className="flex space-x-2">
          <input
            type="number"
            placeholder="Min"
            id="min"
            value={filters.priceRange.min}
            min={defaultPriceRange.min}
            max={defaultPriceRange.max}
            onChange={handlePriceChange}
            className="w-1/2 p-2 text-gray-900 bg-white border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
          />
          <input
            type="number"
            id="max"
            placeholder="Max"
            value={filters.priceRange.max}
            min={defaultPriceRange.min}
            max={defaultPriceRange.max}
            onChange={handlePriceChange}
            className="w-1/2 p-2 text-gray-900 bg-white border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
          />
        </div>
      </div>

      {/* Apply Button */}
      <button
        onClick={handleRestFilter}
        className="w-full p-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Reset Filter
      </button>
    </aside>
  );
}

export default Sidebar;

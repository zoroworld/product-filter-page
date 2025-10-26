import React, { createContext, useEffect, useState } from "react";

export const ProductContext = createContext();

export default function ProductProvider({ children, products = [] }) {
  const [filters, setFilters] = useState({
    category: "All",
    priceRange: { min: 0, max: 0 },
  });
  const [filterProducts, setFilterProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [defaultPriceRange, setDefaultPriceRange] = useState({
    min: 0,
    max: 0,
  });

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // you can change this number

  function getCategory(products) {
    let newCategories = [];
    newCategories = [...new Set(products.map((p) => p.category.name))];
    setCategories(newCategories);
  }
  const handleFilterProducts = (products) => {
    let updated = [...products];
    // console.log(filters.category)
    if (filters.category !== "All") {
      updated = updated.filter((p) => p.category.name === filters.category);
    }

    updated = updated.filter(
      (p) =>
        p.price >= filters.priceRange.min && p.price <= filters.priceRange.max
    );
    return updated;
  };

  function getPriceRange(products) {
    if (!products.length) return;

    const prices = products.map((p) => p.price);
    const min = Math.min(...prices);
    const max = Math.max(...prices);

    setDefaultPriceRange({ min, max });

    // Initialize filter priceRange only once if it's still 0
    setFilters((prev) => {
      if (prev.priceRange.min === 0 && prev.priceRange.max === 0) {
        return { ...prev, priceRange: { min, max } };
      }
      return prev;
    });
  }
  useEffect(() => {
    getPriceRange(products);
    getCategory(products);
  }, [products]);

  useEffect(() => {
    setFilterProducts(handleFilterProducts(products));
    setCurrentPage(1);
  }, [products, filters]);

  //   pagination

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filterProducts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(filterProducts.length / itemsPerPage);

  const nextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const prevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <ProductContext.Provider
      value={{
        filterProducts,
        currentProducts,
        filters,
        setFilters,
        defaultPriceRange,
        categories,
        currentPage,
        totalPages,
        nextPage,
        prevPage,
        goToPage,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

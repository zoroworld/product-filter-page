import React, { useContext } from "react";
import Card from "../../components/Card";
import { ProductContext } from "../../context/ProductContext";

function Content() {
  const {
    currentProducts,
    filterProducts,
    currentPage,
    totalPages,
    nextPage,
    prevPage,
    goToPage,
  } = useContext(ProductContext);

  return (
    <>
      {currentProducts.length === 0 ? (
        <p>No products available.</p>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {currentProducts.map((p) => {
            const data = {
              id: p.id,
              name: p.name,
              price: p.price,
              category: p.category,
              description: p.description,
            };

            return <Card key={p.id} data={data} />;
          })}
        </div>
      )}
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-6">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, index) => {
            const page = index + 1;
            return (
              <button
                key={page}
                onClick={() => goToPage(page)}
                className={`px-3 py-1 border rounded ${
                  currentPage === page ? "bg-blue-500 text-white" : ""
                }`}
              >
                {page}
              </button>
            );
          })}
        </div>
      )}
    </>
  );
}

export default Content;

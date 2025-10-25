import React from "react";
import Card from "../../components/Card";

function Content({ products }) {
  return (
    <>
      {products.length === 0 ? (
        <p>No products available.</p>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {products.map((p) => {
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
    </>
  );
}

export default Content;

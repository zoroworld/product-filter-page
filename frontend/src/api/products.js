const API_URL = import.meta.env.VITE_API_URL;

export const getProducts = async () => {
  try {
    const res = await fetch(`${API_URL}/shop/products/`, {
      credentials: "include", // send session cookies
    });
    if (!res.ok) throw new Error("Failed to fetch products");
    return await res.json();
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const getProductById = async (id) => {
  try {
    const res = await fetch(`${API_URL}/shop/products/${id}/`, {
      credentials: "include",
    });
    if (!res.ok) throw new Error("Failed to fetch product");
    return await res.json();
  } catch (err) {
    console.error(err);
    return null;
  }
};

// Add more product APIs like create, update, delete if needed

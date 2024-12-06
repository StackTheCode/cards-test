export const createProduct = async (productData) => {
    try {
      const response = await fetch("https://fakestoreapi.com/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });
      const createdProduct = await response.json();
      return createdProduct;
    } catch (error) {
      console.error("Error creating product:", error);
      throw error;
    }
  };
  
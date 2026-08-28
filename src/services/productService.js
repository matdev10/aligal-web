const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:4000/api";

const wait = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export async function getProducts() {
  const maxAttempts = 3;

  let lastError;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const response = await fetch(
        `${API_URL}/products`
      );

      if (!response.ok) {
        throw new Error(
          `Error al obtener productos. HTTP ${response.status}`
        );
      }

      return await response.json();

    } catch (error) {
      lastError = error;

      if (attempt < maxAttempts) {
        await wait(800);
      }
    }
  }

  throw lastError;
}
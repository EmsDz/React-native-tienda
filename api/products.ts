import products from '../assets/products.json';

export async function listProducts() {
  return products;
}

export async function fetchProductById(id: number) {
  console.log(id);
  return products.find((item) => item.id == id);
}
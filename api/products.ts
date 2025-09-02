import AsyncStorage from '@react-native-async-storage/async-storage';
import products from '../assets/products.json';

type product = {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  deleted: boolean;
};

export async function listProducts() {
  try {
    const jsonValue = await AsyncStorage.getItem('@deleted_products');
    const deletedProductsList: number[] = jsonValue != null ? JSON.parse(jsonValue) : [];

    console.log(deletedProductsList);

    const jsonValueProducts = await AsyncStorage.getItem('@products');
    const storedProducts: product[] = jsonValueProducts != null ? JSON.parse(jsonValueProducts) : [];
    console.log(storedProducts);

    products.forEach((product) => storedProducts.push(product));

    return storedProducts.filter((item) => !deletedProductsList.includes(item.id));
  } catch (_) {
    return [];
  }
}

export async function fetchProductById(id: number) {
  console.log(id);
  return products.find((item) => item.id == id);
}

export async function UpdateProduct(product: product) {
  try {
    // Get current products from AsyncStorage
    const jsonValue = await AsyncStorage.getItem('@products');
    const storedProducts: product[] = jsonValue != null ? JSON.parse(jsonValue) : [];

    // Find index of the product to update
    const index = storedProducts.findIndex((p) => p.id === product.id);
    if (index !== -1) {
      // Update the product
      storedProducts[index] = product;
      // Save updated list back to AsyncStorage
      await AsyncStorage.setItem('@products', JSON.stringify(storedProducts));
      console.log('Product updated and saved to AsyncStorage.');
    } else {
      console.log('Product not found.');
    }
  } catch (e) {
    console.log('Error updating product:', e);
  }
}

export async function CreateProduct(product: product) {
  try {
    // Get current products from AsyncStorage
    const jsonValue = await AsyncStorage.getItem('@products');
    const storedProducts: product[] = jsonValue != null ? JSON.parse(jsonValue) : [];
    console.log(product);

    // Add new product to the list
    storedProducts.push(product);

    // Save updated list back to AsyncStorage
    await AsyncStorage.setItem('@products', JSON.stringify(storedProducts));
    console.log('Product created and saved to AsyncStorage.');
  } catch (e) {
    console.log('Error saving product:', e);
  }
}

export async function DeleteProduct(id: number) {

  try {
    const jsonValue = await AsyncStorage.getItem('@deleted_products');
    const deletedProductsList: number[] = jsonValue != null ? JSON.parse(jsonValue) : [];

    deletedProductsList.push(id);

    const jsonNewValue = JSON.stringify(deletedProductsList);
    await AsyncStorage.setItem('@deleted_products', jsonNewValue);
  } catch (e) { }

  console.log('JSON file modified successfully.');
}
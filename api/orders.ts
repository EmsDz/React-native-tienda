import AsyncStorage from '@react-native-async-storage/async-storage';

// Define types for delivery information
export type DeliveryInfo = {
  name: string;
  address: string;
  city: string;
  zipCode: string;
  phone: string;
  notes?: string;
};

export async function createOrder(items: any[], deliveryInfo?: DeliveryInfo) {

  console.log('Items:', JSON.stringify(items));
  console.log('Delivery Info:', JSON.stringify(deliveryInfo));

  try {
    // Create new order object
    const newOrder = {
      id: Date.now().toString(), // unique ID
      items,
      deliveryInfo,
      createdAt: new Date().toISOString(),
    };

    // Get existing orders from storage
    const existingOrders = await AsyncStorage.getItem('orders');
    const parsedOrders = existingOrders ? JSON.parse(existingOrders) : [];

    // Add new order
    const updatedOrders = [...parsedOrders, newOrder];

    // Save back to AsyncStorage
    await AsyncStorage.setItem('orders', JSON.stringify(updatedOrders));

    return newOrder; // return the created order
  } catch (error) {
    console.error('Error saving order:', error);
    throw error;
  }
};

export const getOrders = async () => {
  const orders = await AsyncStorage.getItem('orders');
  return orders ? JSON.parse(orders) : [];
};

export const clearOrders = async () => {
  await AsyncStorage.removeItem('orders');
};



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

  // Todo: mock api
  try { } catch (error) { }
}

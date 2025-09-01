import React from 'react';
import { Text } from '@/components/ui/text';
import { Box } from '@/components/ui/box';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Heading } from '@/components/ui/heading';
import { Button, ButtonText } from '@/components/ui/button';

type OrderItem = {
  product: {
    id: number;
    name: string;
    price: number;
  };
  quantity: number;
};

type OrderReviewProps = {
  name: string;
  address: string;
  city: string;
  zipCode: string;
  phone: string;
  notes?: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  onBack: () => void;
  onPlaceOrder: () => void;
  isProcessing: boolean;
};

export const OrderReview = ({
  name,
  address,
  city,
  zipCode,
  phone,
  notes,
  items,
  subtotal,
  shipping,
  total,
  onBack,
  onPlaceOrder,
  isProcessing,
}: OrderReviewProps) => {
  return (
    <>
      {/* Delivery Information Summary */}
      <Box className="bg-white p-4 rounded-lg mb-4">
        <HStack className="justify-between mb-2">
          <Heading size="md">Delivery Information</Heading>
          <Button
            variant="link"
            onPress={onBack}
            className="h-auto py-0"
          >
            <ButtonText className="text-sm">Edit</ButtonText>
          </Button>
        </HStack>

        <VStack space="xs" className="mt-2">
          <Text className="font-bold">{name}</Text>
          <Text>{address}</Text>
          <Text>{city}, {zipCode}</Text>
          <Text>Phone: {phone}</Text>
          {notes && <Text className="italic">Notes: {notes}</Text>}
        </VStack>
      </Box>

      {/* Payment Method */}
      <Box className="bg-white p-4 rounded-lg mb-4">
        <Heading size="md" className="mb-4">Payment Method</Heading>
        <Box className="p-3 border border-primary-300 rounded-md bg-primary-50">
          <Text className="font-bold">Cash on Delivery</Text>
          <Text className="text-sm text-typography-600">Pay with cash when your order is delivered</Text>
        </Box>
      </Box>

      {/* Order Summary */}
      <Box className="bg-white p-4 rounded-lg mb-6">
        <Heading size="md" className="mb-4">Order Summary</Heading>

        {items.map((item, index) => (
          <HStack key={index} className="justify-between mb-2">
            <Text>
              {item.product.name} x {item.quantity}
            </Text>
            <Text>${(item.product.price * item.quantity).toFixed(2)}</Text>
          </HStack>
        ))}

        <Box className="h-px bg-gray-200 my-3" />

        <HStack className="justify-between mb-2">
          <Text>Subtotal</Text>
          <Text>${subtotal.toFixed(2)}</Text>
        </HStack>

        <HStack className="justify-between mb-2">
          <Text>Shipping</Text>
          <Text>${shipping.toFixed(2)}</Text>
        </HStack>

        <Box className="h-px bg-gray-200 my-3" />

        <HStack className="justify-between">
          <Text className="font-bold">Total</Text>
          <Text className="font-bold">${total.toFixed(2)}</Text>
        </HStack>
      </Box>

      <HStack space="md" className="mb-4">
        <Button
          variant="outline"
          onPress={onBack}
          className="flex-1"
        >
          <ButtonText>Back</ButtonText>
        </Button>
        <Button
          onPress={onPlaceOrder}
          isDisabled={isProcessing}
          className="flex-1"
        >
          <ButtonText>
            {isProcessing ? 'Processing...' : 'Place Order'}
          </ButtonText>
        </Button>
      </HStack>
    </>
  );
};

export default OrderReview;

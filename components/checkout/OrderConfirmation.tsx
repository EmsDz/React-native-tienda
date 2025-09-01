import React from 'react';
import { Text } from '@/components/ui/text';
import { Box } from '@/components/ui/box';
import { VStack } from '@/components/ui/vstack';
import { Heading } from '@/components/ui/heading';
import { Button, ButtonText } from '@/components/ui/button';
import { CheckIcon } from '@/components/icons';

type OrderConfirmationProps = {
  orderNumber: string;
  name: string;
  address: string;
  city: string;
  zipCode: string;
  phone: string;
  total: number;
  onFinish: () => void;
};

export const OrderConfirmation = ({
  orderNumber,
  name,
  address,
  city,
  zipCode,
  phone,
  total,
  onFinish,
}: OrderConfirmationProps) => {
  return (
    <Box className="bg-white p-6 rounded-lg items-center">
      <Box className="w-20 h-20 rounded-full bg-success-100 items-center justify-center mb-4">
        <CheckIcon size="xl" className="text-success-500" />
      </Box>

      <Heading size="lg" className="mb-2 text-center">Order Confirmed!</Heading>
      <Text className="text-center mb-4">Your order {orderNumber} has been placed successfully.</Text>

      <VStack className="w-full bg-gray-50 p-4 rounded-lg mb-6">
        <Text className="font-bold mb-2">Delivery Details:</Text>
        <Text>{name}</Text>
        <Text>{address}</Text>
        <Text>{city}, {zipCode}</Text>
        <Text>Phone: {phone}</Text>
      </VStack>

      <Text className="text-center mb-6">
        We will deliver your order to the address you provided. You'll pay ${total.toFixed(2)} in cash upon delivery.
      </Text>

      <Button
        onPress={onFinish}
        className="w-full"
      >
        <ButtonText>Continue Shopping</ButtonText>
      </Button>
    </Box>
  );
};

export default OrderConfirmation;

import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import { Text } from '@/components/ui/text';
import { useCart } from '@/store/cartStore';
import { FlatList, Alert } from 'react-native';
import { Button, ButtonText } from '@/components/ui/button';
import { Redirect, useRouter } from 'expo-router';
import { useAuth } from '@/store/authStore';

export default function CartScreen() {
  const items = useCart((state: any) => state.items);
  const router = useRouter();
  const isLoggedIn = useAuth((state: any) => !!state.token);

  const onCheckout = async () => {
    if (!isLoggedIn) {
      Alert.alert('Login Required', 'Please log in to complete your order.', [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Login', onPress: () => router.push('/login') }
      ]);
      return;
    }
    // Navigate to checkout screen instead of creating order directly
    router.push('/checkout');
  };

  if (items.length === 0) {
    return <Redirect href={'/'} />;
  }

  // Calculate total price
  const totalPrice = items.reduce(
    (sum: number, item: any) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <VStack className="flex-1 bg-background-50 p-4">
      <Text className="text-xl font-bold mb-4">Your Cart</Text>

      <FlatList
        data={items}
        className="flex-1"
        contentContainerClassName="gap-2"
        renderItem={({ item }) => (
          <HStack className="bg-white p-4 rounded-lg mb-2 items-center">
            <VStack space="sm" className="flex-1">
              <Text bold className="truncate">{item.product.name}</Text>
              <Text>${item.product.price.toFixed(2)}</Text>
            </VStack>
            <HStack className="items-center">
              <Text className="text-typography-500 mr-2">Qty: {item.quantity}</Text>
            </HStack>
          </HStack>
        )}
      />

      {/* Order Summary */}
      <VStack className="bg-white p-4 rounded-lg mt-4 mb-4">
        <HStack className="justify-between mb-2">
          <Text>Subtotal</Text>
          <Text>${totalPrice.toFixed(2)}</Text>
        </HStack>
        <HStack className="justify-between mb-2">
          <Text>Shipping</Text>
          <Text>$5.99</Text>
        </HStack>
        <HStack className="justify-between pt-2 border-t border-gray-200 mt-2">
          <Text className="font-bold">Total</Text>
          <Text className="font-bold">${(totalPrice + 5.99).toFixed(2)}</Text>
        </HStack>
      </VStack>

      <Button
        onPress={onCheckout}
        className="w-full"
      >
        <ButtonText>Proceed to Checkout</ButtonText>
      </Button>
    </VStack>
  );
}

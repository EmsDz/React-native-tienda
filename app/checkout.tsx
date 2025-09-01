import { useState } from 'react';
import { ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useMutation } from '@tanstack/react-query';
import { Box } from '@/components/ui/box';
import { Heading } from '@/components/ui/heading';
import { useAuth } from '@/store/authStore';
import { useCart } from '@/store/cartStore';
import { createOrder, DeliveryInfo } from '@/api/orders';
import { StepIndicator, DeliveryForm, OrderReview, OrderConfirmation } from '@/components/checkout';

// Define checkout steps
type CheckoutStep = 'delivery-info' | 'review' | 'confirmation';

export default function CheckoutScreen() {
  const router = useRouter();
  const user = useAuth((state: any) => state.user);
  const items = useCart((state: any) => state.items);
  const resetCart = useCart((state: any) => state.resetCart);

  // Checkout step state
  const [currentStep, setCurrentStep] = useState<CheckoutStep>('delivery-info');
  const [orderNumber, setOrderNumber] = useState<string>('');

  // Form state
  const [name, setName] = useState(user?.name || '');
  const [address, setAddress] = useState(user?.address || '');
  const [city, setCity] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');

  // Calculate order total
  const subtotal = items.reduce(
    (sum: number, item: any) => sum + item.product.price * item.quantity,
    0
  );
  const shipping = 5.99;
  const total = subtotal + shipping;

  // Form validation
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!name.trim()) newErrors.name = 'Name is required';
    if (!address.trim()) newErrors.address = 'Address is required';
    if (!city.trim()) newErrors.city = 'City is required';
    if (!zipCode.trim()) newErrors.zipCode = 'ZIP code is required';
    if (!phone.trim()) newErrors.phone = 'Phone number is required';
    else if (!/^\d{10,}$/.test(phone.replace(/[^0-9]/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Delivery info object
  const deliveryInfo: DeliveryInfo = {
    name,
    address,
    city,
    zipCode,
    phone,
    notes: notes || undefined,
  };

  // Create order mutation
  const createOrderMutation = useMutation({
    mutationFn: () => {
      return createOrder(
        items.map((item: any) => ({
          productId: item.product.id,
          quantity: item.quantity,
          price: item.product.price,
        })),
        deliveryInfo
      );
    },
    onSuccess: (data) => {
      // Generate a random order number if the API doesn't provide one
      const generatedOrderNumber = data.id ? `#${data.id}` : `#${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderNumber(generatedOrderNumber);
      setCurrentStep('confirmation');
    },
    onError: (error) => {
      console.error('Order error:', error);
      Alert.alert('Error', 'There was an error processing your order. Please try again.');
    },
  });

  const handleContinueToReview = () => {
    if (validateForm()) {
      setCurrentStep('review');
    }
  };

  const handlePlaceOrder = () => {
    createOrderMutation.mutate();
  };

  const handleFinish = () => {
    resetCart();
    router.replace('/');
  };



  return (
    <ScrollView className="flex-1 bg-background-50">
      <Box className="p-4">
        <Heading size="xl" className="mb-4">Checkout</Heading>

        <StepIndicator currentStep={currentStep} />

        {currentStep === 'delivery-info' && (
          <DeliveryForm
            name={name}
            setName={setName}
            address={address}
            setAddress={setAddress}
            city={city}
            setCity={setCity}
            zipCode={zipCode}
            setZipCode={setZipCode}
            phone={phone}
            setPhone={setPhone}
            notes={notes}
            setNotes={setNotes}
            errors={errors}
            onContinue={handleContinueToReview}
          />
        )}

        {currentStep === 'review' && (
          <OrderReview
            name={name}
            address={address}
            city={city}
            zipCode={zipCode}
            phone={phone}
            notes={notes}
            items={items}
            subtotal={subtotal}
            shipping={shipping}
            total={total}
            onBack={() => setCurrentStep('delivery-info')}
            onPlaceOrder={handlePlaceOrder}
            isProcessing={createOrderMutation.isPending}
          />
        )}

        {currentStep === 'confirmation' && (
          <OrderConfirmation
            orderNumber={orderNumber}
            name={name}
            address={address}
            city={city}
            zipCode={zipCode}
            phone={phone}
            total={total}
            onFinish={handleFinish}
          />
        )}
      </Box>
    </ScrollView>
  );
}

import { Link, Stack, useLocalSearchParams, useRouter } from 'expo-router';

import { DeleteProduct, fetchProductById } from '@/api/products';
import { Box } from '@/components/ui/box';
import { Button, ButtonText } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { Image } from '@/components/ui/image';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { useAuth } from '@/store/authStore';
import { useCart } from '@/store/cartStore';
import { useMutation, useQuery } from '@tanstack/react-query';
import { ActivityIndicator } from 'react-native';

export default function ProductDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const addProduct = useCart((state) => state.addProduct);
  const userPrivilegeAdmin = useAuth((state) => {

    if (state.userData != null) {
      return state.userData.role == "admin";
    } else {
      return false;
    }
  });
  console.log("user privilege", userPrivilegeAdmin);

  const deleteProductMutation = useMutation({
    mutationFn: () => {
      return DeleteProduct(product!.id);
    },
    onSuccess: () => {
      //
    },
    onError: (error) => {
      console.error('Order error:', error);
    },
  });

  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['products', id],
    queryFn: () => fetchProductById(Number(id)),
  });

  const addToCart = () => {
    addProduct(product);
  };

  const handleDeleteProduct = () => {
    deleteProductMutation.mutate();
    router.push('/');
  };

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Product not found!</Text>;
  }

  return (
    <Box className="flex-1 items-center p-3">
      <Stack.Screen options={{ title: product!.name }} />

      <Card className="p-5 rounded-lg max-w-[960px] w-full flex-1">
        <Image
          source={{
            uri: product!.image,
          }}
          className="mb-6 h-[240px] w-full rounded-md"
          alt={`${product!.name} image`}
          resizeMode="contain"
        />
        <Text className="text-sm font-normal mb-2 text-typography-700">
          {product!.name}
        </Text>
        <VStack className="mb-6">
          <Heading size="md" className="mb-4">
            ${product!.price}
          </Heading>
          <Text size="sm">{product!.description}</Text>
        </VStack>
        <Box className="flex-col sm:flex-row">
          {userPrivilegeAdmin ?
            (
              <VStack space="md">
                <Link href={`../edit/${id}`} asChild>
                  <Button
                    variant="outline"
                    className="px-4 py-2 border-outline-300 sm:flex-1"
                  >
                    <ButtonText size="sm" className="text-typography-600">
                      Edit
                    </ButtonText>
                  </Button>
                </Link>
                <Button onPress={handleDeleteProduct} variant="solid" action="negative">
                  <ButtonText size="md">
                    Delete
                  </ButtonText>
                </Button>
              </VStack>
            )
            :
            (<>
              <Button
                onPress={addToCart}
                className="px-4 py-2 mr-0 mb-3 sm:mr-3 sm:mb-0 sm:flex-1"
              >
                <ButtonText size="sm">Add to cart</ButtonText>
              </Button>
              <Button
                variant="outline"
                className="px-4 py-2 border-outline-300 sm:flex-1"
              >
                <ButtonText size="sm" className="text-typography-600">
                  Wishlist
                </ButtonText>
              </Button>
            </>)
          }
        </Box>
      </Card>
    </Box>
  );
}

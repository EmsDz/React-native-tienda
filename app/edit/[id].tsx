import { Stack, useLocalSearchParams } from 'expo-router';

import { fetchProductById } from '@/api/products';
import { Box } from '@/components/ui/box';
import { Button, ButtonText } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Image } from '@/components/ui/image';
import { Input, InputField } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { Textarea, TextareaInput } from '@/components/ui/textarea';
import { VStack } from '@/components/ui/vstack';
import { useQuery } from '@tanstack/react-query';
import { ActivityIndicator } from 'react-native';

export default function ProductEditScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['products', id],
    queryFn: () => fetchProductById(Number(id)),
  });

  const save = () => {
  };

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Product not found!</Text>;
  }

  return (
    <Box className="flex-1 items-center p-3">
      <Stack.Screen options={{ title: product.name }} />

      <Card className="p-5 rounded-lg max-w-[960px] w-full flex-1">
        <Image
          source={{
            uri: product.image,
          }}
          className="mb-6 h-[240px] w-full rounded-md"
          alt={`${product.name} image`}
          resizeMode="contain"
        />
        <Text>Nombre producto</Text>
        <Input isDisabled={false} variant='outline' size="md" className="mb-4" >
          <InputField value={product.name} />
        </Input>
        <Text>Precio</Text>
        <VStack className="mb-6">
          <Input isDisabled={false} variant='outline' size="md" className="mb-4" >
            <InputField value={`${product?.price}`} />
          </Input>
          <Text>Descripción</Text>

          <Textarea size="md" className="mb-4" >
            <TextareaInput value={product.description} />
          </Textarea>
        </VStack>
        <Box className="flex-col sm:flex-row">
          <Button
            onPress={save}
            action='positive'
            className="px-4 py-2 border-outline-300 sm:flex-1"
          >
            <ButtonText size="sm" >
              Save
            </ButtonText>
          </Button>

        </Box>
      </Card >
    </Box >
  );
}

import { Stack } from 'expo-router';
import { useState } from 'react';

import { CreateProduct } from '@/api/products';
import { Box } from '@/components/ui/box';
import { Button, ButtonText } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Image } from '@/components/ui/image';
import { Input, InputField } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { Textarea, TextareaInput } from '@/components/ui/textarea';
import { VStack } from '@/components/ui/vstack';

export default function ProductCreateScreen() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  const create = async () => {
    if (!name || !price || !description || !image) {
      alert('Por favor, completa todos los campos.');
      return;
    }
    const newProduct = {
      id: Date.now(),
      name,
      price: parseFloat(price),
      description,
      image,
      deleted: false,
    };
    await CreateProduct(newProduct);
    alert('Producto creado exitosamente');
    setName('');
    setPrice('');
    setDescription('');
    setImage('');
  };

  return (
    <Box className="flex-1 items-center p-3">
      <Stack.Screen options={{ title: "Nuevo producto" }} />
      <Card className="p-5 rounded-lg max-w-[960px] w-full flex-1">
        <Image
          source={{ uri: image || 'https://via.placeholder.com/240' }}
          className="mb-6 h-[240px] w-full rounded-md"
          alt={`${name} image`}
          resizeMode="contain"
        />
        <Text>Nombre producto</Text>
        <Input isDisabled={false} variant='outline' size="md" className="mb-4" >
          <InputField value={name} onChangeText={setName} placeholder="Nombre" />
        </Input>
        <Text>Precio</Text>
        <VStack className="mb-6">
          <Input isDisabled={false} variant='outline' size="md" className="mb-4" >
            <InputField value={price} onChangeText={setPrice} placeholder="Precio" keyboardType="numeric" />
          </Input>
          <Text>Descripción</Text>
          <Textarea size="md" className="mb-4" >
            <TextareaInput value={description} onChangeText={setDescription} placeholder="Descripción" />
          </Textarea>
          <Text>Imagen (URL)</Text>
          <Input isDisabled={false} variant='outline' size="md" className="mb-4" >
            <InputField value={image} onChangeText={setImage} placeholder="URL de la imagen" />
          </Input>
        </VStack>
        <Box className="flex-col sm:flex-row">
          <Button
            onPress={create}
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

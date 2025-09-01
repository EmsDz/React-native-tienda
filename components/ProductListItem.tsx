import { Box } from '@/components/ui/box';
import { Card } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { Image } from '@/components/ui/image';
import { Text } from '@/components/ui/text';
import { Link } from 'expo-router';
import { Pressable } from 'react-native';
import Rating from './Rating';

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
};

export default function ProductListItem({ product }: { product: Product }) {

  return (
    <Link href={`/product/${product.id}`} asChild>
      <Pressable className="flex-1">
        <Card className="p-0 rounded-lg flex-1 overflow-hidden">
          <Box className="relative">
            <Image
              source={{
                uri: product.image,
              }}
              className="h-[180px] w-full"
              alt={`${product.name} image`}
              resizeMode="contain"
            />
          </Box>

          <Box className="p-3">
            <Text className="text-sm font-normal mb-1 text-typography-700 truncate">
              {product.name}
            </Text>
            <Heading size="sm" className="mb-2">
              ${product.price}
            </Heading>

            <Rating value={4.0} />
          </Box>
        </Card>
      </Pressable>
    </Link>
  );
}

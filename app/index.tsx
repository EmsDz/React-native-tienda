import { listProducts } from '@/api/products';
import { ProductGrid } from '@/components/home';
import { Text } from '@/components/ui/text';
import { useBreakpointValue } from '@/components/ui/utils/use-break-point-value';
import { useQuery } from '@tanstack/react-query';
import { ActivityIndicator, ScrollView } from 'react-native';
import products from '../assets/products.json';

export default function HomeScreen() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: listProducts,
  });

  const numColumns = useBreakpointValue({
    default: 2,
    sm: 3,
    xl: 4,
  });

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Error fetching products</Text>;
  }

  const allProducts = products.slice(0, 10);

  return (
    <ScrollView className="flex-1 bg-background-50">
      <ProductGrid
        title="All Products"
        products={allProducts}
        numColumns={numColumns as number}
      />
    </ScrollView>
  );
}

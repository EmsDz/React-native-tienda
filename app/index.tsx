import { listProducts } from '@/api/products';
import { ProductGrid } from '@/components/home';
import { Icon } from '@/components/ui/icon';
import { Pressable } from '@/components/ui/pressable';
import { Text } from '@/components/ui/text';
import { useBreakpointValue } from '@/components/ui/utils/use-break-point-value';
import { useAuth } from '@/store/authStore';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'expo-router';
import { PlusIcon } from 'lucide-react-native';
import { ActivityIndicator, ScrollView } from 'react-native';

export default function HomeScreen() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: listProducts,
  });

  const userIsAdmin = useAuth((state) => {

    if (state.userData != null) {
      return state.userData.role == "admin";
    } else {
      return false;
    }
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

  const allProducts = data!.slice(0, 10);

  return (
    <ScrollView className="flex-1 bg-background-50">
      {userIsAdmin && <Link href={'/product/create'} asChild>
        <Pressable
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 12,
            paddingVertical: 16,
            paddingHorizontal: 24,
            borderRadius: 12,
            backgroundColor: '#e0e0e0',
            width: '100%',
            marginVertical: 16,
          }}
        >
          <Icon as={PlusIcon} size="md" />
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Add Product</Text>
        </Pressable>
      </Link>}

      <ProductGrid
        title="All Products"
        products={allProducts}
        numColumns={numColumns as number}
      />
    </ScrollView>
  );
}

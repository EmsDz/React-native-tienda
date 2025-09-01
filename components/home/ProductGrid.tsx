import React from 'react';
import { FlatList } from 'react-native';
import { Box } from '@/components/ui/box';
import { Heading } from '@/components/ui/heading';
import ProductListItem from '../ProductListItem';

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
};

type ProductGridProps = {
  title: string;
  products: Product[];
  numColumns?: number;
};

export const ProductGrid = ({ 
  title, 
  products, 
  numColumns = 2 
}: ProductGridProps) => {
  return (
    <Box className="py-4">
      <Heading size="md" className="px-4 mb-4">
        {title}
      </Heading>
      <Box className="px-2">
        <FlatList
          key={numColumns?.toString()}
          data={products}
          numColumns={numColumns as number}
          scrollEnabled={false}
          contentContainerClassName="gap-2 max-w-[960px] mx-auto w-full"
          columnWrapperClassName="gap-2"
          renderItem={({ item }) => <ProductListItem product={item} />}
        />
      </Box>
    </Box>
  );
};

export default ProductGrid;

import React from 'react';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { StarIcon } from '@/components/icons';

type RatingProps = {
  value: number;
  maxValue?: number;
  showText?: boolean;
};

export const Rating = ({ value, maxValue = 5, showText = true }: RatingProps) => {
  return (
    <HStack className="items-center">
      <HStack className="items-center">
        {Array.from({ length: maxValue }).map((_, index) => (
          <StarIcon
            key={index}
            filled={index < value}
          />
        ))}
      </HStack>
      {showText && (
        <Text className="text-xs text-typography-500 ml-1">({value.toFixed(1)})</Text>
      )}
    </HStack>
  );
};

export default Rating;

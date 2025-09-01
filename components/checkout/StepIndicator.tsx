import React from 'react';
import { Text } from '@/components/ui/text';
import { Box } from '@/components/ui/box';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { CheckIcon } from '@/components/icons';

type CheckoutStep = 'delivery-info' | 'review' | 'confirmation';

type StepIndicatorProps = {
  currentStep: CheckoutStep;
};

export const StepIndicator = ({ currentStep }: StepIndicatorProps) => {
  return (
    <HStack className="justify-between mb-6">
      <VStack className="items-center">
        <Box
          className={`w-8 h-8 rounded-full items-center justify-center ${currentStep === 'delivery-info' ? 'bg-primary-500' : 'bg-primary-500'}`}
        >
          {currentStep === 'delivery-info' ? (
            <Text className="text-white font-bold">1</Text>
          ) : (
            <CheckIcon />
          )}
        </Box>
        <Text className="text-xs mt-1 text-center">Delivery Info</Text>
      </VStack>

      <Box className="flex-1 h-px bg-gray-300 self-center mx-1" />

      <VStack className="items-center">
        <Box
          className={`w-8 h-8 rounded-full items-center justify-center ${currentStep === 'review' ? 'bg-primary-500' : currentStep === 'confirmation' ? 'bg-primary-500' : 'bg-gray-300'}`}
        >
          {currentStep === 'confirmation' ? (
            <CheckIcon />
          ) : (
            <Text className={`font-bold ${currentStep === 'review' ? 'text-white' : 'text-gray-600'}`}>2</Text>
          )}
        </Box>
        <Text className="text-xs mt-1 text-center">Review</Text>
      </VStack>

      <Box className="flex-1 h-px bg-gray-300 self-center mx-1" />

      <VStack className="items-center">
        <Box
          className={`w-8 h-8 rounded-full items-center justify-center ${currentStep === 'confirmation' ? 'bg-primary-500' : 'bg-gray-300'}`}
        >
          <Text className={`font-bold ${currentStep === 'confirmation' ? 'text-white' : 'text-gray-600'}`}>3</Text>
        </Box>
        <Text className="text-xs mt-1 text-center">Confirmation</Text>
      </VStack>
    </HStack>
  );
};

export default StepIndicator;

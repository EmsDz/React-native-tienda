import React from 'react';
import { Text } from '@/components/ui/text';
import { Box } from '@/components/ui/box';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Heading } from '@/components/ui/heading';
import { Button, ButtonText } from '@/components/ui/button';
import { Input, InputField } from '@/components/ui/input';
import { FormControl, FormControlLabel, FormControlError, FormControlErrorText } from '@/components/ui/form-control';
import { ChevronRightIcon } from '@/components/icons/ChevronRightIcon';

type DeliveryFormProps = {
  name: string;
  setName: (value: string) => void;
  address: string;
  setAddress: (value: string) => void;
  city: string;
  setCity: (value: string) => void;
  zipCode: string;
  setZipCode: (value: string) => void;
  phone: string;
  setPhone: (value: string) => void;
  notes: string;
  setNotes: (value: string) => void;
  errors: Record<string, string>;
  onContinue: () => void;
};

export const DeliveryForm = ({
  name,
  setName,
  address,
  setAddress,
  city,
  setCity,
  zipCode,
  setZipCode,
  phone,
  setPhone,
  notes,
  setNotes,
  errors,
  onContinue,
}: DeliveryFormProps) => {
  return (
    <>
      <Box className="bg-white p-4 rounded-lg mb-4">
        <Heading size="md" className="mb-4">Delivery Information</Heading>

        <VStack space="md">
          <FormControl isInvalid={!!errors.name}>
            <FormControlLabel>
              <Text>Full Name</Text>
            </FormControlLabel>
            <Input>
              <InputField
                value={name}
                onChangeText={setName}
                placeholder="Enter your full name"
              />
            </Input>
            {errors.name && (
              <FormControlError>
                <FormControlErrorText>{errors.name}</FormControlErrorText>
              </FormControlError>
            )}
          </FormControl>

          <FormControl isInvalid={!!errors.address}>
            <FormControlLabel>
              <Text>Address</Text>
            </FormControlLabel>
            <Input>
              <InputField
                value={address}
                onChangeText={setAddress}
                placeholder="Enter your street address"
              />
            </Input>
            {errors.address && (
              <FormControlError>
                <FormControlErrorText>{errors.address}</FormControlErrorText>
              </FormControlError>
            )}
          </FormControl>

          <HStack space="md">
            <Box className="flex-1">
              <FormControl isInvalid={!!errors.city}>
                <FormControlLabel>
                  <Text>City</Text>
                </FormControlLabel>
                <Input>
                  <InputField
                    value={city}
                    onChangeText={setCity}
                    placeholder="City"
                  />
                </Input>
                {errors.city && (
                  <FormControlError>
                    <FormControlErrorText>{errors.city}</FormControlErrorText>
                  </FormControlError>
                )}
              </FormControl>
            </Box>

            <Box className="flex-1">
              <FormControl isInvalid={!!errors.zipCode}>
                <FormControlLabel>
                  <Text>ZIP Code</Text>
                </FormControlLabel>
                <Input>
                  <InputField
                    value={zipCode}
                    onChangeText={setZipCode}
                    placeholder="ZIP Code"
                    keyboardType="numeric"
                  />
                </Input>
                {errors.zipCode && (
                  <FormControlError>
                    <FormControlErrorText>{errors.zipCode}</FormControlErrorText>
                  </FormControlError>
                )}
              </FormControl>
            </Box>
          </HStack>

          <FormControl isInvalid={!!errors.phone}>
            <FormControlLabel>
              <Text>Phone Number</Text>
            </FormControlLabel>
            <Input>
              <InputField
                value={phone}
                onChangeText={setPhone}
                placeholder="Enter your phone number"
                keyboardType="phone-pad"
              />
            </Input>
            {errors.phone && (
              <FormControlError>
                <FormControlErrorText>{errors.phone}</FormControlErrorText>
              </FormControlError>
            )}
          </FormControl>

          <FormControl>
            <FormControlLabel>
              <Text>Delivery Notes (Optional)</Text>
            </FormControlLabel>
            <Input>
              <InputField
                value={notes}
                onChangeText={setNotes}
                placeholder="Any special instructions for delivery"
                multiline
                className="min-h-[80px]"
              />
            </Input>
          </FormControl>
        </VStack>
      </Box>

      <Button
        onPress={onContinue}
        className="w-full mb-4"
      >
        <ButtonText>Continue to Review</ButtonText>
        <ChevronRightIcon />
      </Button>
    </>
  );
};

export default DeliveryForm;

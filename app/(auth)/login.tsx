import { login } from '@/api/auth';
import { Button, ButtonText } from '@/components/ui/button';
import { FormControl } from '@/components/ui/form-control';
import { Heading } from '@/components/ui/heading';
import { HStack } from '@/components/ui/hstack';
import { Input, InputField, InputIcon, InputSlot } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { useAuth } from '@/store/authStore';
import { useMutation } from '@tanstack/react-query';
import { Redirect } from 'expo-router';
import { EyeIcon, EyeOffIcon } from 'lucide-react-native';
import { useState } from 'react';

import { z } from 'zod';

const loginSchema = z.object({
  email: z.email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

export default function LoginScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formErrors, setFormErrors] = useState<{ email?: string; password?: string }>({});

  const setUser = useAuth((s) => s.setUser);
  const setUserData = useAuth((s) => s.setUserData);
  const setToken = useAuth((s) => s.setToken);
  const isLoggedIn = useAuth((s) => !!s.token);

  const loginMutation = useMutation({
    mutationFn: () => login(email, password),
    onSuccess: (data) => {
      console.log('Success: ', data);
      if (data.user && data.token) {
        setUser(data.user);
        setUserData(data.userData);
        setToken(data.token);
      }
    },
    onError: () => {
      console.log('Error');
    },
  });

  const handleState = () => {
    setShowPassword((showState) => {
      return !showState;
    });
  };

  const handleLogin = () => {
    const result = loginSchema.safeParse({ email, password });
    let errors: { email?: string; password?: string } = {};
    if (!result.success) {
      const data = JSON.parse(result.error!.message);
      data.forEach((err: any) => {
        if (err.path && err.path[0] === 'email') {
          errors.email = 'Valid email is required';
        }
        if (err.path && err.path[0] === 'password') {
          errors.password = 'Valid password is required';
        }
      });
      if (Object.keys(errors).length > 0) {
        setFormErrors(errors);
        return;
      }
    }
    setFormErrors({});
    loginMutation.mutate();
  };

  if (isLoggedIn) {
    return <Redirect href={'/'} />;
  }

  return (
    <FormControl
      isInvalid={formErrors.email != undefined && formErrors.password != undefined}
      className="p-4 border rounded-lg max-w-[500px] border-outline-300 bg-white m-2"
    >
      <VStack space="xl">
        <Heading className="text-typography-900 leading-3 pt-3">Login</Heading>
        <VStack space="xs">
          <Text className="text-typography-500 leading-1">Email</Text>
          <Input>
            <InputField
              value={email}
              onChangeText={setEmail}
              type="text"
            />
          </Input>
          {formErrors.email && (
            <Text className="text-red-500 text-xs mt-1">{formErrors.email}</Text>
          )}
        </VStack>
        <VStack space="xs">
          <Text className="text-typography-500 leading-1">Password</Text>
          <Input className="text-center">
            <InputField
              value={password}
              onChangeText={setPassword}
              type={showPassword ? 'text' : 'password'}
            />
            <InputSlot className="pr-3" onPress={handleState}>
            </InputSlot>
            <InputIcon
              as={showPassword ? EyeIcon : EyeOffIcon}
              className="text-darkBlue-500"
            />
          </Input>
          {formErrors.password && (
            <Text className="text-red-500 text-xs mt-1">{formErrors.password}</Text>
          )}
        </VStack>
        <HStack space="sm">
          <Button className="flex-1" onPress={handleLogin}>
            <ButtonText>Sign in</ButtonText>
          </Button>
        </HStack>
      </VStack>
    </FormControl>
  );
}

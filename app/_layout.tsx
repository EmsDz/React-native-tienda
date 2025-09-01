import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import '@/global.css';
import { useAuth } from '@/store/authStore';
import { useCart } from '@/store/cartStore';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Link, Stack } from 'expo-router';
import { LogOutIcon, ShoppingCart, User } from 'lucide-react-native';
import { Pressable } from 'react-native';

// Create a client
const queryClient = new QueryClient();

export default function RootLayout() {
  const cartItemsNum = useCart((state) => state.items.length);
  const isLoggedIn = useAuth((s) => !!s.token);

  const setUser = useAuth((s) => s.setUser);
  const setToken = useAuth((s) => s.setToken);
  const setUserData = useAuth((s) => s.setUserData);

  console.log(isLoggedIn);


  function logout() {
    console.log('Success');


    setUser(null);
    setToken(null);
    setUserData(null);
  }

  return (
    <QueryClientProvider client={queryClient}>
      <GluestackUIProvider>
        <Stack
          screenOptions={{
            headerRight: () =>
              cartItemsNum > 0 && (
                <Link href={'/cart'} asChild>
                  <Pressable
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 8,
                      paddingHorizontal: 8,
                      paddingVertical: 4,
                      borderRadius: 8,
                      backgroundColor: '#f5f5f5',
                    }}
                  >
                    <Icon as={ShoppingCart} />
                    <Text style={{ marginLeft: 4 }}>{cartItemsNum}</Text>
                  </Pressable>
                </Link>
              ),
          }}
        >
          <Stack.Screen
            name="index"
            options={{
              title: 'Shop',
              headerLeft: () =>
                !isLoggedIn ? (
                  <Link href={'/login'} asChild>
                    <Pressable
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 8,
                        paddingHorizontal: 8,
                        paddingVertical: 4,
                        borderRadius: 8,
                        backgroundColor: '#e0e0e0',
                      }}
                    >
                      <Icon as={User} />
                    </Pressable>
                  </Link>
                ) : (
                  <Pressable
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 8,
                      paddingHorizontal: 8,
                      paddingVertical: 4,
                      borderRadius: 8,
                      backgroundColor: '#ffeaea',
                    }}
                    onPress={() => logout()}
                  >
                    <Icon as={LogOutIcon} />
                  </Pressable>
                ),
            }}
          />
          <Stack.Screen name="product/[id]" options={{ title: 'Product' }} />
        </Stack>
      </GluestackUIProvider>
    </QueryClientProvider>
  );
}

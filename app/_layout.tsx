import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import { Icon } from '@/components/ui/icon';
import '@/global.css';
import { useAuth } from '@/store/authStore';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Link, Stack } from 'expo-router';
import { User } from 'lucide-react-native';
import { Pressable } from 'react-native';

// Create a client
const queryClient = new QueryClient();

export default function RootLayout() {
  const isLoggedIn = useAuth((s) => !!s.token);

  return (
    <QueryClientProvider client={queryClient}>
      <GluestackUIProvider>
        <Stack
        >
          <Stack.Screen
            name="index"
            options={{
              title: 'Shop',
              headerLeft: () =>
                !isLoggedIn && (
                  <Link href={'/login'} asChild>
                    <Pressable className="flex-row gap-2">
                      <Icon as={User} />
                    </Pressable>
                  </Link>
                ),
            }}
          />
        </Stack>
      </GluestackUIProvider>
    </QueryClientProvider>
  );
}

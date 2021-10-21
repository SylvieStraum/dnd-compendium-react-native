import { ApolloProvider } from "@apollo/client";
import { useQuery, QueryClient, QueryClientProvider } from "react-query";
import { StatusBar } from "expo-status-bar";
import React, { Suspense } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./src/hooks/useCachedResources";
import { Navigation } from "./src/navigation";
import { client as apolloclient } from "./src/services/graph/graph";
import { useTheme } from "./src/hooks/useTheme";
import { ThemedLoader } from "./src/components/Themed";

const queryClient = new QueryClient();

export default function App() {
  const theme = useTheme();
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <ApolloProvider client={apolloclient}>
        <QueryClientProvider client={queryClient}>
            <SafeAreaProvider>
              <Navigation />
              <StatusBar backgroundColor={theme.colors.tint} />
            </SafeAreaProvider>
        </QueryClientProvider>
      </ApolloProvider>
    );
  }
}

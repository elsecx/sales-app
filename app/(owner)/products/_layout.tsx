import { FontAwesome } from "@expo/vector-icons";
import { Link, Stack } from "expo-router";
import { Pressable } from "react-native";

import Colors from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function ProductsLayout() {
  const colorScheme = useColorScheme() ?? "light";

  return (
    <Stack screenOptions={{ headerShown: true }}>
      <Stack.Screen
        name="index"
        options={{
          title: "Daftar Produk",
          headerRight: () => (
            <Link href="/login" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="plus"
                    size={25}
                    color={Colors[colorScheme].text.default}
                    style={{ opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Stack.Screen name="[id]" options={{ title: "Detail Produk" }} />
    </Stack>
  );
}

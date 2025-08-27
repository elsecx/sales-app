import { View } from "@/components/Themed";
import Colors from "@/constants/Colors";
import { useAuth } from "@/contexts/AuthContext";
import { useColorScheme } from "@/hooks/useColorScheme";
import { FontAwesome } from "@expo/vector-icons";
import { Link, router, Tabs } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, Pressable } from "react-native";

export default function OwnerLayout() {
  const colorScheme = useColorScheme() ?? "light";
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      router.replace("/(auth)/login");
    } else if (user.role !== "owner") {
      router.replace("/(employee)");
    }
  }, [user]);

  if (!user || user.role !== "owner") {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: Colors[colorScheme].primary.default,
        tabBarStyle: {
          backgroundColor: Colors[colorScheme].background,
          borderTopWidth: 0.5,
          borderTopColor: Colors[colorScheme].border.default,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color, size }) => <FontAwesome name="home" size={size} color={color} />,
          headerLeft: () => (
            <Link href="/login" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="calendar"
                    size={25}
                    color={Colors[colorScheme].text.default}
                    style={{ marginLeft: 15, marginRight: 10, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="sales"
        options={{
          title: "Penjualan",
          tabBarIcon: ({ color, size }) => <FontAwesome name="money" size={size} color={color} />,
          headerLeft: () => (
            <Link href="/login" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="calendar"
                    size={25}
                    color={Colors[colorScheme].text.default}
                    style={{ marginLeft: 15, marginRight: 10, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
          headerRight: () => (
            <Link href="/login" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="plus"
                    size={25}
                    color={Colors[colorScheme].text.default}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="products"
        options={{
          headerShown: false,
          title: "Daftar Produk",
          tabBarIcon: ({ color, size }) => <FontAwesome name="cubes" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="employees"
        options={{
          title: "Pegawai",
          tabBarIcon: ({ color, size }) => <FontAwesome name="users" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="shops"
        options={{
          title: "Toko",
          tabBarIcon: ({ color, size }) => <FontAwesome name="shopping-basket" size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}

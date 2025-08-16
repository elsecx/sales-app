import { useAuth } from "@/contexts/AuthContext";
import { Stack, router } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

export default function EmployeeLayout() {
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      router.replace("/(auth)/login");
    } else if (user.role !== "employee") {
      router.replace("/(owner)");
    }
  }, [user]);

  if (!user || user.role !== "employee") {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}

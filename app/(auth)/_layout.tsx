import { Stack, router } from "expo-router";
import { useEffect } from "react";

import { useAuth } from "@/contexts/AuthContext";

export default function AuthLayout() {
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      if (user.role === "owner") {
        router.replace("/(owner)");
      } else if (user.role === "employee") {
        router.replace("/(employee)");
      }
    }
  }, [user]);

  return <Stack screenOptions={{ headerShown: false }} />;
}
import { Stack } from "expo-router";

import { useColorScheme } from "@/hooks/useColorScheme";

export default function EmployeesLayout() {
  const colorScheme = useColorScheme() ?? "light";

  return (
    <Stack screenOptions={{ headerShown: true }}>
      <Stack.Screen name="index" options={{ title: "Daftar Pegawai" }} />
    </Stack>
  );
}

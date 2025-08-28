import { Text, View } from "@/components/Themed";
import { useColorScheme } from "@/hooks/useColorScheme";
import { createEmployeesStyles } from "./styles";

export default function TabEmployeesScreen() {
  const colorScheme = useColorScheme() ?? "light";
  const styles = createEmployeesStyles(colorScheme);

  return (
    <View>
      <Text>Tab Employees</Text>
    </View>
  );
}

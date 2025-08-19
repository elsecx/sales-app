import { Text, View } from "@/components/Themed";
import { useColorScheme } from "@/hooks/useColorScheme";
import { createProductsStyles } from "./styles";

export default function TabProductsScreen() {
  const colorScheme = useColorScheme() ?? "light";
  const styles = createProductsStyles(colorScheme);
  
  return (
    <View style={styles.container}>
      <Text>Products Screen</Text>
    </View>
  );
}
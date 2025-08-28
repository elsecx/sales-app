import { Text, View } from "@/components/Themed";
import { useColorScheme } from "@/hooks/useColorScheme";
import { ScrollView } from "react-native";
import { createNewProductStyles } from "./styles";

export default function TabNewProductScreen() {
  const colorScheme = useColorScheme() ?? "light";
  const styles = createNewProductStyles(colorScheme);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View>
        <Text>Create New Product</Text>
      </View>
    </ScrollView>
  );
}

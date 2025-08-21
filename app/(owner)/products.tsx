import { useState } from "react";

import { Input } from "@/components/Input";
import { View } from "@/components/Themed";
import { useColorScheme } from "@/hooks/useColorScheme";
import { FontAwesome } from "@expo/vector-icons";
import { createProductsStyles } from "./styles";

export default function TabProductsScreen() {
  const colorScheme = useColorScheme() ?? "light";
  const styles = createProductsStyles(colorScheme);

  const [search, setSearch] = useState("");

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Input
          placeholder="Cari produk..."
          value={search}
          onChangeText={setSearch}
          accessoryLeft={() => <FontAwesome name="search" style={styles.icon} />}
          style={styles.search}
        />
      </View>
    </View>
  );
}

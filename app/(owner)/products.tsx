import { StyleSheet } from "react-native";

import EmptyScreen from "@/components/EmptyScreen";
import { Text, View } from "@/components/Themed";

export default function TabProductsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab Products</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EmptyScreen path="app/(owner)/products.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: "80%",
    },
});
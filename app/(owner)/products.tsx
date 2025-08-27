import React, { useCallback, useState } from "react";

import { Input } from "@/components/Input";
import { List, ListItem } from "@/components/List";
import { Text, View } from "@/components/Themed";
import { Product, products } from "@/data/products";
import { useColorScheme } from "@/hooks/useColorScheme";
import { formatCurrencyID } from "@/utils/helpers";
import { FontAwesome } from "@expo/vector-icons";
import { ActivityIndicator } from "react-native";
import { createProductsStyles } from "./styles";

export default function TabProductsScreen() {
  const colorScheme = useColorScheme() ?? "light";
  const styles = createProductsStyles(colorScheme);

  const [search, setSearch] = useState("");
  const [visibleData, setVisibleData] = useState<Product[]>(products.slice(0, 10));
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const loadMore = useCallback(() => {
    if (loading) return;
    if (visibleData.length >= products.length) return;

    setLoading(true);
    setTimeout(() => {
      const nextPage = page + 1;
      const nextData = products.slice(0, nextPage * 10);
      setVisibleData(nextData);
      setPage(nextPage);
      setLoading(false);
    }, 600); // delay simulasi fetch
  }, [loading, page, visibleData.length]);

  const filteredData = visibleData.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()));

  const renderItem = ({ item }: { item: any }): React.ReactElement => (
    <ListItem
      title={item.name}
      description={item.category}
      onPress={() => console.log(item.name + "clicked")}
      accessoryRight={() => (
        <View style={styles.accessoryRightContainer}>
          <Text style={styles.textStock}>
            Stok: {item.stock} {item.unit}
          </Text>
          <Text style={styles.textPrice}>{formatCurrencyID(item.price)}</Text>
        </View>
      )}
    />
  );

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

      <List
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loading ? <ActivityIndicator style={{ margin: 16 }} /> : null}
      />
    </View>
  );
}

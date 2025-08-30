import { FontAwesome } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { router } from "expo-router";
import React, { useCallback, useMemo, useState } from "react";
import { ActivityIndicator } from "react-native";

import { Input } from "@/components/Input";
import { List, ListItem } from "@/components/List";
import { Text, View } from "@/components/Themed";
import { Product, products } from "@/data/products";
import { useColorScheme } from "@/hooks/useColorScheme";
import { formatCurrencyID } from "@/utils/helpers";
import { createProductsStyles } from "./styles";

const PAGE_SIZE = 10; // Number of items per page

export default function TabProductsScreen() {
  const colorScheme = useColorScheme() ?? "light";
  const styles = createProductsStyles(colorScheme);

  // State for search input
  const [search, setSearch] = useState("");

  // State for visible products with pagination
  const [visibleData, setVisibleData] = useState<Product[]>(products.slice(0, PAGE_SIZE));
  const [page, setPage] = useState(1);

  // Loading indicators
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // Refresh data when screen is focused
  useFocusEffect(
    useCallback(() => {
      resetData();
    }, [])
  );

  // Reset visible data and pagination
  const resetData = () => {
    setPage(1);
    setVisibleData(products.slice(0, PAGE_SIZE));
  };

  // Pull-to-refresh handler
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      resetData();
      setRefreshing(false);
    }, 600); // Simulate network request
  }, []);

  // Load more data when scrolling to the end
  const loadMore = useCallback(() => {
    if (loading || visibleData.length >= products.length) return;

    setLoading(true);
    setTimeout(() => {
      const nextPage = page + 1;
      setVisibleData(products.slice(0, nextPage * PAGE_SIZE));
      setPage(nextPage);
      setLoading(false);
    }, 600); // Simulate network request
  }, [loading, page, visibleData.length]);

  // Filter products based on search input
  const filteredData = useMemo(
    () => visibleData.filter((item) => item.name.toLowerCase().includes(search.toLowerCase())),
    [visibleData, search]
  );

  // Render each product item
  const renderItem = ({ item }: { item: Product }) => (
    <ListItem
      title={item.name}
      description={`Stok: ${item.stock} ${item.unit}`}
      onPress={() => router.push(`/products/${item.id}`)}
      accessoryRight={() => (
        <View style={styles.accessoryRightContainer}>
          <Text style={styles.textCategory}>{item.category}</Text>
          <Text style={styles.textPrice}>{formatCurrencyID(item.price)}</Text>
        </View>
      )}
    />
  );

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.headerContainer}>
        <Input
          placeholder="Cari produk..."
          value={search}
          onChangeText={setSearch}
          accessoryLeft={() => <FontAwesome name="search" style={styles.icon} />}
          style={styles.search}
        />
      </View>

      {/* Product List */}
      <List
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        refreshing={refreshing}
        onRefresh={onRefresh}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loading ? <ActivityIndicator style={{ margin: 16 }} /> : null}
      />
    </View>
  );
}

import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { useFocusEffect } from "@react-navigation/native";
import { router, useNavigation } from "expo-router";
import { useCallback, useLayoutEffect, useMemo, useState } from "react";
import { ActivityIndicator, Platform, Pressable } from "react-native";

import { Button } from "@/components/Button";
import { List, ListItem } from "@/components/List";
import { Text, View } from "@/components/Themed";
import { Sale, sales } from "@/data/sales";
import { useColorScheme } from "@/hooks/useColorScheme";
import { formatCurrencyID, formatDateID } from "@/utils/helpers";
import { FontAwesome } from "@expo/vector-icons";
import { createSalesStyles } from "./styles";

const PAGE_SIZE = 10; // Number of items per page

export default function TabSalesScreen() {
  const colorScheme = useColorScheme() ?? "light";
  const styles = createSalesStyles(colorScheme);
  const navigation = useNavigation();

  // Set up header with date picker button
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Pressable onPress={() => setShowDatePicker(true)}>
          <FontAwesome name="calendar" size={25} color={styles.textFilterLabel.color} style={{ marginRight: 13 }} />
        </Pressable>
      ),
    });
  }, []);

  // State for visible sales with pagination
  const [visibleData, setVisibleData] = useState<Sale[]>(sales.slice(0, PAGE_SIZE));
  const [page, setPage] = useState(1);

  // Loading indicators
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // State for date filter
  const [filterDate, setFilterDate] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Refresh data when screen is focused
  useFocusEffect(
    useCallback(() => {
      resetData();
    }, [])
  );

  // Reset visible data and pagination
  const resetData = () => {
    setPage(1);
    setVisibleData(sales.slice(0, PAGE_SIZE));
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
    const filtered = filterDate ? sales.filter((s) => s.createdAt.toDateString() === filterDate.toDateString()) : sales;

    if (loading || visibleData.length >= filtered.length) return;

    setLoading(true);
    setTimeout(() => {
      const nextPage = page + 1;
      setVisibleData(filtered.slice(0, nextPage * PAGE_SIZE));
      setPage(nextPage);
      setLoading(false);
    }, 600); // Simulate network request
  }, [loading, page, visibleData.length, filterDate]);

  // Date picker change handler
  const handleDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowDatePicker(false);

    if (Platform.OS === "android" && event.type === "dismissed") {
      return;
    }

    if (selectedDate) {
      setFilterDate(selectedDate);
      setPage(1);
      setVisibleData(
        sales.filter((s) => s.createdAt.toDateString() === selectedDate.toDateString()).slice(0, PAGE_SIZE)
      );
    }
  };

  // Reset filters
  const handleResetFilter = () => {
    setFilterDate(null);
    setPage(1);
    setVisibleData(sales.slice(0, PAGE_SIZE));
  };

  // Filter products based on datepicker
  const filteredData = useMemo(() => {
    const filtered = filterDate
      ? sales.filter((item) => item.createdAt.toDateString() === filterDate.toDateString())
      : sales;
    return filtered.slice(0, page * PAGE_SIZE);
  }, [filterDate, page]);

  // Render each product item
  const renderItem = ({ item }: { item: Sale }) => (
    <ListItem
      title={item.name}
      description={`${item.quantity} ${item.unit}`}
      onPress={() => router.push(`/products/${item.id}`)}
      accessoryRight={() => (
        <View style={styles.accessoryRightContainer}>
          <Text style={styles.textDate}>{formatDateID(item.createdAt)}</Text>
          <Text style={styles.textAmount}>{formatCurrencyID(item.amount)}</Text>
        </View>
      )}
    />
  );

  return (
    <View style={styles.container}>
      {/* Filter Bar */}
      <View style={styles.headerContainer}>
        <Text style={styles.textFilterLabel}>Filter tanggal:</Text>
        <Text style={styles.textFilterValue}>
          {filterDate ? `Penjualan pada ${formatDateID(filterDate)}` : "Menampilkan semua penjualan"}
        </Text>
        {filterDate && (
          <Button status="danger" appearance="outline" onPress={handleResetFilter}>
            Reset Filter
          </Button>
        )}
      </View>

      {/* Sale List */}
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

      {showDatePicker && (
        <DateTimePicker
          value={filterDate ?? new Date()}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={handleDateChange}
        />
      )}
    </View>
  );
}

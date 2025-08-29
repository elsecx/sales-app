import { FontAwesome } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { router } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import { ActivityIndicator } from "react-native";

import { Input } from "@/components/Input";
import { List, ListItem } from "@/components/List";
import { Text, View } from "@/components/Themed";
import { Employee, employees } from "@/data/employees";
import { useColorScheme } from "@/hooks/useColorScheme";
import { createEmployeesStyles } from "./styles";

const PAGE_SIZE = 10; // Number of employees per page

export default function TabEmployeesScreen() {
  const colorScheme = useColorScheme() ?? "light";
  const styles = createEmployeesStyles(colorScheme);

  // State for search input
  const [search, setSearch] = useState("");

  // State for visible employees with pagination
  const [visibleData, setVisibleData] = useState<Employee[]>(employees.slice(0, PAGE_SIZE));
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

  // Reset visible employees and pagination
  const resetData = () => {
    setPage(1);
    setVisibleData(employees.slice(0, PAGE_SIZE));
  };

  // Pull-to-refresh handler
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      resetData();
      setRefreshing(false);
    }, 600); // Simulate network request
  }, []);

  // Load more employees when scrolling to the end
  const loadMore = useCallback(() => {
    if (loading || visibleData.length >= employees.length) return;

    setLoading(true);
    setTimeout(() => {
      const nextPage = page + 1;
      setVisibleData(employees.slice(0, nextPage * PAGE_SIZE));
      setPage(nextPage);
      setLoading(false);
    }, 600); // Simulate network request
  }, [loading, page, visibleData.length]);

  // Filter employees based on search input
  const filteredData = useMemo(
    () => visibleData.filter((item) => item.name.toLowerCase().includes(search.toLowerCase())),
    [visibleData, search]
  );

  // Render each employee item
  const renderItem = ({ item }: { item: Employee }) => (
    <ListItem
      title={item.name}
      description={item.phone}
      onPress={() => router.push(`/employees/${item.id}`)}
      accessoryRight={() => (
        <View style={styles.accessoryRightContainer}>
          <Text style={[styles.status, item.status ? styles.statusActive : styles.statusInactive]}>
            {item.status ? "Status Aktif" : "Status Tidak Aktif"}
          </Text>
        </View>
      )}
    />
  );

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.headerContainer}>
        <Input
          placeholder="Cari pegawai..."
          value={search}
          onChangeText={setSearch}
          accessoryLeft={() => <FontAwesome name="search" style={styles.icon} />}
          style={styles.search}
        />
      </View>

      {/* Employee List */}
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

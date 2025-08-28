import { FontAwesome } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { router } from "expo-router";
import { useCallback, useState } from "react";
import { ActivityIndicator } from "react-native";

import { Input } from "@/components/Input";
import { List, ListItem } from "@/components/List";
import { Text, View } from "@/components/Themed";
import { Employee, employees } from "@/data/employees";
import { useColorScheme } from "@/hooks/useColorScheme";
import { formatDateID } from "@/utils/helpers";
import { createEmployeesStyles } from "./styles";

export default function TabEmployeesScreen() {
  const colorScheme = useColorScheme() ?? "light";
  const styles = createEmployeesStyles(colorScheme);

  const [search, setSearch] = useState("");
  const [visibleData, setVisibleData] = useState<Employee[]>(employees.slice(0, 10));
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setPage(1);
      setVisibleData(employees.slice(0, 10));
    }, [])
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setPage(1);
      setVisibleData(employees.slice(0, 10));
      setRefreshing(false);
    }, 800); // delay simulasi fetch
  }, []);

  const loadMore = useCallback(() => {
    if (loading) return;
    if (visibleData.length >= employees.length) return;

    setLoading(true);
    setTimeout(() => {
      const nextPage = page + 1;
      const nextData = employees.slice(0, nextPage * 10);
      setVisibleData(nextData);
      setPage(nextPage);
      setLoading(false);
    }, 600); // delay simulasi fetch
  }, [loading, page, visibleData.length]);

  const filteredData = visibleData.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()));

  const renderItem = ({ item }: { item: any }): React.ReactElement => (
    <ListItem
      title={item.name}
      description={item.phone}
      onPress={() => router.push(`/products/${item.id}`)}
      accessoryRight={() => (
        <View style={styles.accessoryRightContainer}>
          <Text style={styles.joinedAtLabel}>Bergabung</Text>
          <Text style={styles.joinedAtValue}>{formatDateID(item.joinedAt)}</Text>
        </View>
      )}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Input
          placeholder="Cari pegawai..."
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
        refreshing={refreshing}
        onRefresh={onRefresh}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loading ? <ActivityIndicator style={{ margin: 16 }} /> : null}
      />
    </View>
  );
}

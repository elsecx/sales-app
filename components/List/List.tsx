import React from "react";
import { FlatList, FlatListProps, StyleProp, useColorScheme, ViewStyle } from "react-native";
import { View } from "../Themed";
import { createListStyles } from "./styles";

export type ListProps<T> = FlatListProps<T> & {
  contentContainerStyle?: StyleProp<ViewStyle>;
  ItemSeparatorComponent?: () => React.ReactElement | null;
};

export default function List<T>({ contentContainerStyle, ItemSeparatorComponent, ...props }: ListProps<T>) {
  const colorScheme = useColorScheme() ?? "light";
  const styles = createListStyles(colorScheme);

  return (
    <FlatList<T>
      contentContainerStyle={[styles.contentContainer, contentContainerStyle]}
      ItemSeparatorComponent={ItemSeparatorComponent ?? (() => <View style={styles.separator} />)}
      {...props}
    />
  );
}

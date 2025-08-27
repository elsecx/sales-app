import { GestureResponderEvent, TouchableOpacity, useColorScheme, ViewStyle } from "react-native";
import { Text, View } from "../Themed";
import { createListItemStyles } from "./styles";

export type ListItemProps = {
  title: string;
  description?: string;
  accessoryLeft?: (props: { style: ViewStyle }) => React.ReactNode;
  accessoryRight?: (props: { style: ViewStyle }) => React.ReactNode;
  onPress?: (event: GestureResponderEvent) => void;
};

export default function ListItem({ title, description, accessoryLeft, accessoryRight, onPress }: ListItemProps) {
  const colorScheme = useColorScheme() ?? "light";
  const styles = createListItemStyles(colorScheme);

  return (
    <TouchableOpacity activeOpacity={0.7} style={styles.container} onPress={onPress} disabled={!onPress}>
      {accessoryLeft && <View style={styles.accessoryLeft}>{accessoryLeft({ style: styles.icon })}</View>}

      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        {description && <Text style={styles.description}>{description}</Text>}
      </View>

      {accessoryRight && <View style={styles.accessoryRight}>{accessoryRight({ style: styles.icon })}</View>}
    </TouchableOpacity>
  );
}

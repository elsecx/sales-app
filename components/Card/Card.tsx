import { ReactNode } from "react";
import { GestureResponderEvent, TouchableOpacity, ViewStyle, } from "react-native";

import { useColorScheme } from "@/hooks/useColorScheme";
import { View } from "../Themed";
import { createCardStyles } from "./styles";

export type CardProps = {
  children: ReactNode;
  header?: ReactNode | (() => ReactNode);
  footer?: ReactNode | (() => ReactNode);
  disabled?: boolean;
  style?: ViewStyle;
  onPress?: (event: GestureResponderEvent) => void;
};

export default function Card({
  children,
  header,
  footer,
  disabled = false,
  style,
  onPress,
}: CardProps) {
  const colorScheme = useColorScheme() ?? "light";
  const styles = createCardStyles(colorScheme);

  const Container: any = onPress ? TouchableOpacity : View;

  return (
    <Container
      style={[styles.card, style]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.6}
    >
      {header && (
        <View style={styles.header}>
          {typeof header === "function" ? header() : header}
        </View>
      )}

      <View style={styles.body}>{children}</View>

      {footer && (
        <View style={styles.footer}>
          {typeof footer === "function" ? footer() : footer}
        </View>
      )}
    </Container>
  )
}
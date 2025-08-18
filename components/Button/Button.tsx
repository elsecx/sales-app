import { ReactNode } from "react";
import { ActivityIndicator, Pressable, ViewStyle } from "react-native";

import { Text, View } from "@/components/Themed";
import { useColorScheme } from "@/hooks/useColorScheme";
import { createButtonStyles } from "./styles";

export type ButtonStatus = "basic" | "primary" | "success" | "warning" | "danger";
export type ButtonSize = "small" | "medium" | "large";
export type ButtonAppearance = "filled" | "outline" | "ghost";

export type ButtonProps = {
  children: string | ReactNode;
  status?: ButtonStatus;
  size?: ButtonSize;
  appearance?: ButtonAppearance;
  accessoryLeft?: ReactNode | (() => ReactNode);
  accessoryRight?: ReactNode | (() => ReactNode);
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  onPress?: () => void;
}

export default function Button({
  children,
  status = "basic",
  size = "medium",
  appearance = "filled",
  accessoryLeft,
  accessoryRight,
  disabled = false,
  loading = false,
  style,
  onPress,
  ...props
}: ButtonProps) {
  const colorScheme = useColorScheme() ?? "light";
  const styles = createButtonStyles(colorScheme, status, size, appearance);

  return (
    <Pressable
      onPress={!disabled && !loading ? onPress : undefined}
      style={({ pressed }) => [
        styles.container,
        disabled && styles.disabled,
        pressed && !disabled && styles.pressed,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={styles.text.color} />
      ) : (
        <View style={styles.content}>
          {accessoryLeft && typeof accessoryLeft === "function" ? accessoryLeft() : accessoryLeft}

          {children && typeof children === "string" ? (
            <Text style={styles.text} numberOfLines={1}>
              {children}
            </Text>
          ) : children}

          {accessoryRight && typeof accessoryRight === "function" ? accessoryRight() : accessoryRight}
        </View>
      )}
    </Pressable>
  )
}
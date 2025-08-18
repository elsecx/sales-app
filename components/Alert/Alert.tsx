import { Ionicons } from "@expo/vector-icons";
import { ReactNode } from "react";
import { Pressable, ViewStyle } from "react-native";

import { Text, View } from "@/components/Themed";
import { useColorScheme } from "@/hooks/useColorScheme";
import { createAlertStyles } from "./styles";

export type AlertStatus = "basic" | "primary" | "success" | "warning" | "danger";
export type AlertAppearance = "filled" | "outline" | "ghost";

export type AlertProps = {
  children: string | ReactNode;
  status?: AlertStatus;
  appearance?: AlertAppearance;
  closable?: boolean;
  visible: boolean;
  style?: ViewStyle;
  onClose?: () => void;
};

export default function Alert({
  children,
  status = "basic",
  appearance = "filled",
  closable = false,
  visible,
  style,
  onClose,
}: AlertProps) {
  const colorScheme = useColorScheme() ?? "light";
  const styles = createAlertStyles(colorScheme, status, appearance);

  if (!visible) return null;

  return (
    <View style={[styles.container, style]}>
      <Ionicons
        name={
          status === "success"
            ? "checkmark-circle"
            : status === "danger"
            ? "warning"
            : status === "warning"
            ? "warning"
            : "warning"
        }
        size={20}
        color={styles.text.color}
        style={styles.icon}
      />

      {typeof children === "string" ? (
        <Text style={[styles.text, { flex: 1 }]}>{children}</Text>
      ) : (
        children
      )}

      {closable && (
        <Pressable
          onPress={onClose}
        >
          <Ionicons name="close" size={20} color={styles.text.color} />
        </Pressable>
      )}
    </View>
  )
}
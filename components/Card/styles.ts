import Colors from "@/constants/Colors";
import { StyleSheet } from "react-native";

export const createCardStyles = (theme: "light" | "dark") => {
  const colors = Colors[theme];

  return StyleSheet.create({
    card: {
      borderRadius: 8,
      borderWidth: 1,
      backgroundColor: colors.background,
      borderColor: colors.border.default,
    },
    header: {
      padding: 16,
      borderBottomWidth: 1,
      borderColor: colors.border.default,
    },
    body: {
      padding: 16,
    },
    footer: {
      padding: 16,
      borderTopWidth: 1,
      borderColor: colors.border.default,
    },
  });
}
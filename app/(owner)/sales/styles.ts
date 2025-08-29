import Colors from "@/constants/Colors";
import { StyleSheet } from "react-native";

export const createSalesStyles = (theme: "light" | "dark") => {
  const colors = Colors[theme];

  return StyleSheet.create({
    container: {
      flex: 1,
    },
    headerContainer: {
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 10,
      backgroundColor: colors.basic.transparent,
      padding: 15,
    },
    textFilterLabel: {
      fontWeight: 600,
      fontSize: 16,
      color: colors.text.default,
    },
    textFilterValue: {
      fontWeight: 800,
      fontSize: 18,
      color: colors.primary.default,
    },
    accessoryRightContainer: {
      alignItems: "flex-end",
      gap: 5,
    },
    textDate: {
      fontWeight: "bold",
      color: colors.text.default,
    },
    textAmount: {
      fontWeight: 800,
      fontSize: 18,
      paddingVertical: 2,
      paddingHorizontal: 5,
      borderRadius: 5,
      color: colors.success.active,
      backgroundColor: colors.success.transparent,
    },
  });
};

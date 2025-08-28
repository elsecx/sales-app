import Colors from "@/constants/Colors";
import { StyleSheet } from "react-native";

export const createEmployeesStyles = (theme: "light" | "dark") => {
  const colors = Colors[theme];

  return StyleSheet.create({
    container: {
      flex: 1,
    },
    icon: {
      fontSize: 24,
      color: colors.text.default,
    },
    headerContainer: {
      flexDirection: "row",
      padding: 15,
    },
    search: {
      flex: 1,
    },
    accessoryRightContainer: {
      alignItems: "flex-end",
    },
    joinedAtLabel: {
      fontWeight: "bold",
      color: colors.success.default,
    },
    joinedAtValue: {
      fontWeight: "normal",
      color: colors.text.hint,
    },
  });
};

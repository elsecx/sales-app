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
    status: {
      fontWeight: "bold",
      fontSize: 12,
      paddingVertical: 2,
      paddingHorizontal: 5,
      borderRadius: 5,
    },
    statusActive: {
      color: colors.success.active,
      backgroundColor: colors.success.transparent,
    },
    statusInactive: {
      color: colors.danger.active,
      backgroundColor: colors.danger.transparent,
    },
  });
};

export const createEmployeeDetailStyles = (theme: "light" | "dark") => {
  const colors = Colors[theme];

  return StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column",
      backgroundColor: colors.background,
      padding: 15,
    },
    formContainer: {
      flexDirection: "column",
      gap: 15,
    },
    label: {
      fontSize: 16,
      color: colors.text.default,
      marginBottom: 10,
    },
    buttonContainer: {
      gap: 15,
    },
  });
};

export const createNewEmployeeStyles = (theme: "light" | "dark") => {
  const colors = Colors[theme];

  return StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column",
      backgroundColor: colors.background,
      padding: 15,
    },
    formContainer: {
      flexDirection: "column",
      gap: 15,
    },
    label: {
      fontSize: 16,
      color: colors.text.default,
      marginBottom: 10,
    },
    buttonContainer: {
      gap: 15,
    },
    placeholder: {
      color: colors.text.hint,
    },
  });
};

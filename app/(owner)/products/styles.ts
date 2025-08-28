import Colors from "@/constants/Colors";
import { StyleSheet } from "react-native";

export const createProductsStyles = (theme: "light" | "dark") => {
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
    textStock: {
      fontWeight: 600,
      color: colors.text.hint,
    },
    textPrice: {
      fontWeight: 800,
      color: colors.success.default,
      fontSize: 18,
    },
  });
};

export const createProductDetailStyles = (theme: "light" | "dark") => {
  const colors = Colors[theme];

  return StyleSheet.create({
    container: {
      flex: 1,
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

export const createNewProductStyles = (theme: "light" | "dark") => {
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
    buttonContainer: {
      gap: 15,
    },
  });
};

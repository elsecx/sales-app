import Colors from "@/constants/Colors";
import { StyleSheet } from "react-native";

export const createDashboardStyles = (theme: "light" | "dark") => {
  const colors = Colors[theme];

  return StyleSheet.create({
    container: {
      flex: 1,
    }
  });
}

export const createSalesStyles = (theme: "light" | "dark") => {
  const colors = Colors[theme];

  return StyleSheet.create({
    container: {
      flex: 1,
    }
  });
}

export const createProductsStyles = (theme: "light" | "dark") => {
  const colors = Colors[theme];

  return StyleSheet.create({
    container: {
      flex: 1,
    }
  });
}

export const createEmployeesStyles = (theme: "light" | "dark") => {
  const colors = Colors[theme];

  return StyleSheet.create({
    container: {
      flex: 1,
    }
  });
}

export const createShopsStyles = (theme: "light" | "dark") => {
  const colors = Colors[theme];

  return StyleSheet.create({
    container: {
      flex: 1,
    }
  });
}
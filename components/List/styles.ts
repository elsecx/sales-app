import Colors from "@/constants/Colors";
import { StyleSheet } from "react-native";

export const createListStyles = (theme: "light" | "dark") => {
  const colors = Colors[theme];

  return StyleSheet.create({
    contentContainer: {
      //
    },
    separator: {
      height: StyleSheet.hairlineWidth,
      backgroundColor: colors.border.default,
      marginLeft: 16,
    },
  });
};

export const createListItemStyles = (theme: "light" | "dark") => {
  const colors = Colors[theme];

  return StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 16,
      paddingVertical: 12,
      backgroundColor: colors.background,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: colors.border.default,
    },
    accessoryLeft: {
      marginRight: 12,
    },
    accessoryRight: {
      marginLeft: 12,
    },
    icon: {
      width: 24,
      height: 24,
      justifyContent: "center",
      alignItems: "center",
    },
    textContainer: {
      flex: 1,
    },
    title: {
      fontSize: 16,
      fontWeight: "500",
      color: colors.text.default,
    },
    description: {
      fontSize: 14,
      color: colors.text.hint,
      marginTop: 2,
    },
  });
};

import Colors from "@/constants/Colors";
import { StyleSheet } from "react-native";

export const createInputIntegerStyles = (theme: "light" | "dark") => {
  const colors = Colors[theme];

  return StyleSheet.create({
    container: {
      //
    },
    label: {
      fontSize: 16,
      fontWeight: "500",
      marginBottom: 8,
      color: colors.text.default,
    },
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    input: {
      flex: 1,
      fontSize: 16,
      paddingVertical: 10,
      paddingHorizontal: 12,
      borderWidth: 1,
      borderRadius: 8,
      borderColor: colors.border.default,
      backgroundColor: colors.background,
      color: colors.text.default,
    },
    inputWithControls: {
      textAlign: "center",
    },
    placeholder: {
      color: colors.text.hint,
    },
    controlButton: {
      width: 40,
      height: 40,
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 1,
      borderRadius: 8,
      marginHorizontal: 4,
      borderColor: colors.border.default,
      backgroundColor: colors.background,
    },
    controlText: {
      fontSize: 20,
      fontWeight: "600",
      color: colors.text.default,
    },
    controlDisabled: {
      color: colors.text.disabled,
    },
  });
};

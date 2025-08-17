import Colors from "@/constants/Colors";
import { StyleSheet } from "react-native";

export const createLoginStyles = (theme: 'light' | 'dark') => {
  const colors = Colors[theme];

  return StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 20,
    },
    title: {
      fontSize: 32,
      fontWeight: 900,
      color: colors.text.default,
    },
    formContainer: {
      width: "100%",
      flexDirection: "column",
      gap: 20,
      marginTop: 40,
    },
    icon: {
      fontSize: 24,
      color: colors.text.default,
    },
  });
}
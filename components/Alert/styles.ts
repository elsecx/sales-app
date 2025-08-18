import Colors from "@/constants/Colors";
import { StyleSheet } from "react-native";
import { AlertAppearance, AlertStatus } from "./Alert";

export const createAlertStyles = (
  theme: "light" | "dark",
  status: AlertStatus,
  appearance: AlertAppearance,
) => {
  const colors = Colors[theme];
  let backgroundColor, borderColor, textColor;

  switch (appearance) {
    case "filled":
      backgroundColor = colors[status].default;
      textColor = colors.text.default;
      break;
    case "outline":
      backgroundColor = colors[status].transparent;
      borderColor = colors[status].default;
      textColor = colors[status].default;
      break;
    case "ghost":
      backgroundColor = "transparent";
      textColor = colors[status].default;
      break;
  }

  return StyleSheet.create({
    container: {
      backgroundColor,
      borderColor,
      borderWidth: appearance === "outline" ? 1 : 0,
      borderRadius: 8,
      padding: 12,
      flexDirection: "row",
      alignItems: "center",
    },
    text: {
      color: textColor,
      fontSize: 14,
    },
    icon: {
      marginRight: 8,
    },
  });
}
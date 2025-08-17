import Colors from "@/constants/Colors";
import { StyleSheet } from "react-native";
import { ButtonAppearance, ButtonSize, ButtonStatus } from "./index";

const sizeMap = {
  small: { fontSize: 14, paddingVertical: 6, paddingHorizontal: 12 },
  medium: { fontSize: 16, paddingVertical: 10, paddingHorizontal: 16 },
  large: { fontSize: 18, paddingVertical: 14, paddingHorizontal: 20 },
};

export const createButtonStyles = (
  theme: "light" | "dark",
  status: ButtonStatus,
  size: ButtonSize,
  appearance: ButtonAppearance
) => {
  const colors = Colors[theme];
  const sizeConf = sizeMap[size];

  let backgroundColor;
  let borderColor;
  let textColor;
  switch(appearance) {
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
      break
  }

  return StyleSheet.create({
    container: {
      borderWidth: appearance === "outline" ? 1 : 0,
      borderColor,
      backgroundColor,
      borderRadius: 8,
      paddingVertical: sizeConf.paddingVertical,
      paddingHorizontal: sizeConf.paddingHorizontal,
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
    },
    pressed: {
      opacity: 0.7,
    },
    disabled: {
      backgroundColor: colors[status].disabled,
      borderColor: colors[status].disabled,
      opacity: 0.6,
    },
    text: {
      fontSize: sizeConf.fontSize,
      color: textColor,
      fontWeight: "600",
    },
    content: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
    },
  });
}
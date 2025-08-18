import Colors from "@/constants/Colors";
import { StyleSheet } from "react-native";
import { InputSize, InputStatus } from "./Input";

const sizeMap = {
  small: { fontSize: 14, padding: 8 },
  medium: { fontSize: 16, padding: 10 },
  large: { fontSize: 18, padding: 12 },
};

export const createInputStyles = (
  theme: "light" | "dark",
  status: InputStatus,
  size: InputSize
) => {
  const colors = Colors[theme];
  const sizeConf = sizeMap[size];

  return StyleSheet.create({
    container: {
      // 
    },
    label: {
      fontSize: 16,
      color: colors.text.default,
      marginBottom: 10,
    },
    inputWrapper: {
      flexDirection: "row",
      alignItems: "center",
      borderWidth: 1,
      borderColor: colors[status].default,
      backgroundColor: colors.background,
      borderRadius: 8,
      paddingHorizontal: sizeConf.padding,
    },
    disabledWrapper: {
      backgroundColor: colors.disabled,
      opacity: 0.6,
    },
    input: {
      flex: 1,
      fontSize: sizeConf.fontSize,
      color: colors.text.default,
      textAlignVertical: "top",
    },
    placeholder: {
      color: colors.text.hint,
    },
    caption: {
      marginTop: 10,
      fontSize: 16,
      color: status === "basic" ? colors.text.default : colors[status].default,
    },
    accessory: {
      marginHorizontal: 4,
    },
  });
}
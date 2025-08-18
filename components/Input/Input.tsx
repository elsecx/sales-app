import { ReactNode } from "react";
import { TextInput, TextInputProps } from "react-native";

import { Text, View } from "@/components/Themed";
import { useColorScheme } from "@/hooks/useColorScheme";
import { createInputStyles } from "./styles";

export type InputStatus = "basic" | "primary" | "success" | "warning" | "danger";
export type InputSize = "small" | "medium" | "large";

export type InputProps = TextInputProps & {
  label?: string | (() => ReactNode);
  caption?: string | (() => ReactNode);
  status?: InputStatus;
  accessoryLeft?: ReactNode | (() => ReactNode);
  accessoryRight?: ReactNode | (() => ReactNode);
  secureTextEntry?: boolean;
  size?: InputSize;
  disabled?: boolean;
};

export default function Input({
  label,
  caption,
  status = "basic",
  accessoryLeft,
  accessoryRight,
  secureTextEntry,
  size = "medium",
  disabled = false,
  style,
  ...props
}: InputProps) {
  const colorScheme = useColorScheme() ?? "light";
  const styles = createInputStyles(colorScheme, status, size);

  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>
        {typeof label === "function" ? label() : label}
      </Text>}

      <View
        style={[
          styles.inputWrapper,
          disabled && styles.disabledWrapper,
        ]}
      >
        {accessoryLeft && <View style={styles.accessory}>
          {typeof accessoryLeft === "function" ? accessoryLeft() : accessoryLeft}
        </View>}

        <TextInput
          placeholderTextColor={styles.placeholder.color}
          editable={!disabled}
          secureTextEntry={secureTextEntry}
          style={[
            styles.input,
            props.multiline && { 
              minHeight: 40 * (props.numberOfLines ?? 1),
              textAlignVertical: "top",
            },
            style,
          ]}
          {...props}
        />

        {accessoryRight && <View style={styles.accessory}>
          {typeof accessoryRight === "function" ? accessoryRight() : accessoryRight}
        </View>}
      </View>

      {caption && <Text style={styles.caption}>
        {typeof caption === "function" ? caption() : caption}
      </Text>}
    </View>
  )
}
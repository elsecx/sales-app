import { useColorScheme } from "@/hooks/useColorScheme";
import { Keyboard, TextInput, TouchableOpacity } from "react-native";
import { Text, View } from "../Themed";
import { createInputIntegerStyles } from "./styles";

export type InputIntegerProps = {
  value: number;
  onValueChange: (value: number) => void;
  placeholder?: string;
  label?: string;
  min?: number;
  max?: number;
  showControls?: boolean;
  editable?: boolean;
  style?: any;
};

export default function InputInteger({
  value,
  onValueChange,
  placeholder = "0",
  label,
  min = 0,
  max = 999999,
  showControls = true,
  editable = true,
  style,
}: InputIntegerProps) {
  const colorScheme = useColorScheme() ?? "light";
  const styles = createInputIntegerStyles(colorScheme);

  const handleTextChange = (text: string) => {
    // Remove non-numeric characters
    const numericText = text.replace(/[^0-9]/g, "");

    const numValue = parseInt(numericText) || 0;
    const clampedValue = Math.max(min, Math.min(max, numValue));
    onValueChange(clampedValue);
  };

  const handleIncrement = () => {
    onValueChange(Math.min(max, value + 1));
  };

  const handleDecrement = () => {
    onValueChange(Math.max(min, value - 1));
  };

  const handleBlur = () => {
    Keyboard.dismiss();
  };

  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}

      <View style={styles.inputContainer}>
        {showControls && (
          <TouchableOpacity
            style={[styles.controlButton]}
            onPress={handleDecrement}
            disabled={!editable || value <= min}
          >
            <Text style={[styles.controlText, value <= min && styles.controlDisabled]}>−</Text>
          </TouchableOpacity>
        )}

        <TextInput
          style={[styles.input, showControls && styles.inputWithControls]}
          value={value.toString()}
          onChangeText={handleTextChange}
          onBlur={handleBlur}
          placeholder={placeholder}
          placeholderTextColor={styles.placeholder.color}
          keyboardType="numeric"
          editable={editable}
          selectTextOnFocus
        />

        {showControls && (
          <TouchableOpacity
            style={[styles.controlButton]}
            onPress={handleIncrement}
            disabled={!editable || value >= max}
          >
            <Text style={[styles.controlText, value >= max && styles.controlDisabled]}>+</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

import Colors from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Text as DefaultText, View as DefaultView, TextProps as RNTextProps, ViewProps as RNViewProps } from "react-native";

// Additional props for color override
type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = RNTextProps & ThemeProps & {
  colorKey?: string; // example: "text.default", "primary.active"
};

export type ViewProps = RNViewProps & ThemeProps & {
  colorKey?: string; // example: "background", "primary.default"
};

// Helper to get nested color from Colors
function getNestedColor(theme: "light" | "dark", path: string): string | undefined {
  return path.split(".").reduce((acc: any, key: string) => acc?.[key], Colors[theme]);
}

// Hook to get theme color
export function useThemeColor(props: { light?: string; dark?: string }, colorKey: string) {
  const theme = useColorScheme() ?? "light";
  if (props[theme]) return props[theme];
  return getNestedColor(theme, colorKey);
}

// Component Text
export function Text(props: TextProps) {
  const { style, lightColor, darkColor, colorKey = "text.default", ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, colorKey);

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

// Component View
export function View(props: ViewProps) {
  const { style, lightColor, darkColor, colorKey = "background", ...otherProps } = props;
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, colorKey);

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}

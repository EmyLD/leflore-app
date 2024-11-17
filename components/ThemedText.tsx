import { Text, type TextProps, StyleSheet } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Colors } from "@/constants/Colors";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: "default" | "title" | "defaultSemiBold" | "subtitle" | "link";
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = "default",
  ...rest
}: ThemedTextProps) {
  const color =
    lightColor ||
    useThemeColor({ light: lightColor, dark: darkColor }, "text") ||
    Colors.light.text;

  const fontFamily =
    type === "title"
      ? "NunitoSans-Bold"
      : type === "defaultSemiBold"
      ? "NunitoSans-SemiBold"
      : type === "subtitle"
      ? "NunitoSans-Light"
      : "NunitoSans-Regular";

  return (
    <Text
      style={StyleSheet.flatten([
        styles.base,
        { color, fontFamily },
        type === "link" && styles.link,
        style,
      ])}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  base: {
    fontSize: 16,
    lineHeight: 24,
  },
  link: {
    textDecorationLine: "underline",
    color: Colors.light.lightPink,
  },
});

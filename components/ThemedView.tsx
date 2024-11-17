import { SafeAreaView } from "react-native-safe-area-context";
import { type ViewProps } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";
import { Colors } from "@/constants/Colors";

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedView({
  style,
  lightColor,
  darkColor,
  ...otherProps
}: ThemedViewProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  return (
    <SafeAreaView
      style={[
        {
          flex: 1,
          paddingHorizontal: 20,
          paddingVertical: 10,
          backgroundColor: backgroundColor || Colors.light.background,
        },
        style,
      ]}
      {...otherProps}
    />
  );
}

/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { useColorScheme } from "react-native";

import { Colors } from "@/constants/Colors";

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme() ?? "light"; // Thème par défaut : clair
  const colorFromProps = props[theme]; // Couleur depuis les props

  // Retourne la couleur des props ou de Colors, avec une valeur par défaut
  return colorFromProps || Colors[theme][colorName] || "#CCCCCC";
}

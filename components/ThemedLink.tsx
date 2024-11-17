import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";

export type ThemedLinkProps = {
  title: string; // Texte du lien
  onPress: () => void; // Fonction appelée au clic
  style?: object; // Styles personnalisés pour le conteneur
  textStyle?: object; // Styles personnalisés pour le texte
};

export function ThemedLink({
  title,
  onPress,
  style,
  textStyle,
}: ThemedLinkProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, style]}
      activeOpacity={0.7}
    >
      <ThemedText type="link" style={textStyle}>
        {title}
      </ThemedText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: "center", // Centre le lien
    marginVertical: 10,
  },
});

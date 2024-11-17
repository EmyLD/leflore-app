import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";

export type ThemedButtonProps = {
  title: string;
  onPress: () => void;
  style?: object;
  textStyle?: object;
};

export function ThemedButton({
  title,
  onPress,
  style,
  textStyle,
}: ThemedButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={[styles.buttonText, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 20,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    backgroundColor: Colors.light.tint,
    alignSelf: "center",
  },
  buttonText: {
    fontSize: 18,
    color: Colors.light.textColorTint,
    textAlign: "center",
  },
});

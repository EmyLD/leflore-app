import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Dimensions,
} from "react-native";
import { Image } from "expo-image";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const scale = useSharedValue(0);
  const router = useRouter();
  useEffect(() => {
    scale.value = withSpring(1, { damping: 20, stiffness: 100 });
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePress = () => {
    router.replace("/signup");
  };

  return (
    <ThemedView>
      <Image
        style={styles.image}
        source={require("../assets/images/icon.png")}
        alt="Logo"
      />
      <Animated.View style={[styles.containerHeroText, animatedStyle]}>
        <ThemedText style={styles.heroText}>
          L’application d’entraide et de partage d’informations{"\n"}
          entre voisins du{" "}
          <ThemedText style={styles.highlight}>Flore.</ThemedText>
          {"\n\n"}
          <ThemedText>
            <ThemedText style={styles.question}>
              Besoin d'un service ?
            </ThemedText>{" "}
            <ThemedText style={styles.answer}>
              Une information à partager ?
            </ThemedText>
          </ThemedText>
          {"\n"}
          {"\n"}
          <ThemedText style={styles.conclusion}>
            C'est ici que ça se passe !
          </ThemedText>
        </ThemedText>
      </Animated.View>
      <Animated.View style={animatedStyle}>
        <TouchableOpacity style={styles.button} onPress={handlePress}>
          <Text style={styles.buttonText}>C'est parti !</Text>
        </TouchableOpacity>
      </Animated.View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "45%",
  },
  containerHeroText: {
    backgroundColor: "#d0e8f2",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 20,
    alignSelf: "center",
  },
  heroText: {
    fontSize: 16,
    lineHeight: 24,
    color: "#333",
  },
  highlight: {
    fontWeight: "bold",
    color: Colors.light.lightPink,
  },
  question: {
    fontWeight: "600",
    color: Colors.light.lightPink,
  },
  answer: {
    fontWeight: "500",
    fontStyle: "italic",
    color: "#333",
  },
  conclusion: {
    fontWeight: "700",
    color: Colors.light.lightPink,
  },
  button: {
    marginTop: 30,
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

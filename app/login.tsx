import React, { useState } from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/scripts/firebase";
import { ThemedButton } from "@/components/ThemedButton";
import { ThemedLink } from "@/components/ThemedLink";
import { useRouter } from "expo-router";

export default function login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();
  const handleLogin = async () => {
    if (!email || !password) {
      setMessage("Veuillez entrer un email et un mot de passe.");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setMessage("Connexion réussie !");
      router.replace("/(profil)"); // Redirection après succès
    } catch (error) {
      if (error instanceof Error) {
        setMessage(error.message);
      } else {
        setMessage("Une erreur inconnue est survenue.");
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Connexion</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <TextInput
        placeholder="Mot de passe"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />
      <ThemedButton title="Se connecter" onPress={handleLogin} />
      {message ? <Text style={styles.message}>{message}</Text> : null}
      <ThemedLink
        title="Pas encore inscrit ?"
        onPress={() => router.replace("/signup")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f7f9fc",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  message: {
    marginTop: 20,
    fontSize: 16,
    textAlign: "center",
    color: "red",
  },
});

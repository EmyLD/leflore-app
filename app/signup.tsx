import React, { useState } from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, firestore } from "@/scripts/firebase";
import { ThemedButton } from "@/components/ThemedButton";
import { ThemedLink } from "@/components/ThemedLink";
import { router } from "expo-router";
import { doc, setDoc } from "firebase/firestore";

export default function signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pseudo, setPseudo] = useState("");
  const [flatNb, setFlatNb] = useState("");
  const [message, setMessage] = useState("");

  const handleSignUp = async () => {
    if (!pseudo || !email || !password || !flatNb) {
      setMessage("Veuillez remplir tous les champs.");
      return;
    }

    if (password.length < 6) {
      setMessage("Le mot de passe doit contenir au moins 6 caractères.");
      return;
    }

    try {
      // Crée l'utilisateur dans Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Récupère les informations de l'utilisateur
      const user = userCredential.user;

      // Ajoute l'utilisateur dans Firestore
      await setDoc(doc(firestore, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        pseudo: pseudo,
        flatNb: flatNb,
        createdAt: new Date().toISOString(),
      });

      setMessage("Inscription réussie !");
      router.replace("/login"); // Redirection après succès
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes("auth/email-already-in-use")) {
          setMessage("Cet email est déjà utilisé.");
        } else {
          setMessage(error.message);
        }
      } else {
        setMessage("Une erreur inconnue est survenue.");
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.title}>Inscription</Text>
        <TextInput
          placeholder="Pseudo"
          value={pseudo}
          onChangeText={setPseudo}
          style={styles.input}
          autoCapitalize="words"
          autoCorrect={false}
        />
        <Text style={styles.helperText}>
          Ce sera le nom affiché pour vos voisins.
        </Text>
        <TextInput
          placeholder="Numéro d'appartement"
          value={flatNb}
          onChangeText={setFlatNb}
          style={styles.input}
          keyboardType="default"
          autoCapitalize="none"
          autoCorrect={false}
        />
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
        {message ? <Text style={styles.message}>{message}</Text> : null}

        <ThemedButton
          title="S'inscrire"
          onPress={handleSignUp}
          style={styles.confirmBtn}
        />

        <ThemedLink
          title="Déjà inscrit ?"
          onPress={() => router.replace("/login")}
        />
      </View> {/* Fin de la vue encadrée */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 30,
    backgroundColor: "#A7C7E7",
  },
  // Inscription
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  // Les champs à remplir
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginVertical: 10,
    borderRadius: 20,
    backgroundColor: "#fff",
  },
  // Ce sera le nom affiché pour vos voisins
  helperText: {
    fontSize: 14,
    marginBottom: 10,
    color: "#666",
    textAlign: "center",
  },
  confirmBtn: {
    marginVertical: 20,
  },
  // Veuillez remplir tout les champs
  message: {
    marginTop: 20,
    fontSize: 16,
    textAlign: "center",
    color: "red",
  },

  // Nouveau style pour le cadre
  box: {
    borderWidth: 2,
    borderColor: "#ccc",
    borderRadius: 50,
    padding: 20,
    backgroundColor: "#F0E2C2",
  },
});


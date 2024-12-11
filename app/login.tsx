import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  GestureResponderEvent,
} from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/scripts/firebase";
import { useRouter } from "expo-router";

interface ButtonProps {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
}

interface LinkProps {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
}

export default function Login() {
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
      <View style={styles.box}>
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
    </View>
  );
}

const ThemedButton: React.FC<ButtonProps> = ({ title, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const ThemedLink: React.FC<LinkProps> = ({ title, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.link}>
      <Text style={styles.linkText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#A7C7E7",
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
    borderRadius: 20,
    backgroundColor: "#fff",
  },
  message: {
    marginTop: 20,
    fontSize: 16,
    textAlign: "center",
    color: "red",
  },
  box: {
    borderWidth: 2,
    borderColor: "#ccc",
    borderRadius: 50,
    padding: 20,
    backgroundColor: "#F0E2C2",
  },
  button: {
    padding: 10,
    backgroundColor: "#4CAF50",
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  link: {
    marginTop: 20,
  },
  linkText: {
    color: "#0066CC",
    fontSize: 16,
    textAlign: "center",
    textDecorationLine: "underline",
  },
});

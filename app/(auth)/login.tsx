import { router } from "expo-router";
import { useState } from "react";

import { useAuth } from "@/contexts/AuthContext";
import { Button, Text, TextInput, View } from "react-native";

export default function LoginScreen() {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    try {
      await login(username, password);
      router.replace("/");
    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Login</Text>
      {error && <Text style={{ color: "red" }}>{error}</Text>}
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />
      <Button title="Sign In" onPress={handleLogin} />
    </View>
  );
}

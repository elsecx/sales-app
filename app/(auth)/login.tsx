import FontAwesome from "@expo/vector-icons/FontAwesome";
import { router } from "expo-router";
import { useState } from "react";

import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Text, View } from "@/components/Themed";
import { useAuth } from "@/contexts/AuthContext";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Alert } from "react-native";
import { createLoginStyles } from "./styles";

export default function LoginScreen() {
  const colorScheme = useColorScheme() ?? "light";
  const styles = createLoginStyles(colorScheme);

  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [secureText, setSecureText] = useState(true);

  const [loading, setLoading] = useState(false);

  const toggleSecureEntry = () => {
    setSecureText(!secureText);
  };

  const handleLogin = async () => {
    setLoading(true);

    try {
      await login(username, password);
      router.replace("/");
    } catch (e: any) {
      Alert.alert("Login Gagal", e.message, [{ text: "OK", onPress: () => {} }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>

      <View style={styles.formContainer}>
        <Input label="Username" placeholder="Masukkan username anda" value={username} onChangeText={setUsername} />
        <Input
          label="Kata sandi"
          placeholder="Masukkan kata sandi anda"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={secureText}
          accessoryRight={() => (
            <FontAwesome name={secureText ? "eye" : "eye-slash"} onPress={toggleSecureEntry} style={styles.icon} />
          )}
        />
        <Button status="primary" appearance="filled" loading={loading} disabled={loading} onPress={handleLogin}>
          Masuk
        </Button>
      </View>
    </View>
  );
}

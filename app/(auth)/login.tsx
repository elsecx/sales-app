import FontAwesome from "@expo/vector-icons/FontAwesome";
import { router } from "expo-router";
import { useState } from "react";

import { Input } from "@/components/Input";
import { Text, View } from "@/components/Themed";
import { useAuth } from "@/contexts/AuthContext";
import { useColorScheme } from '@/hooks/useColorScheme';
import { createLoginStyles } from './styles';

export default function LoginScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const styles = createLoginStyles(colorScheme);
  
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [secureText, setSecureText] = useState(true);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggleSecureEntry = () => {
    setSecureText(!secureText);
  };

  const handleLogin = async () => {
    setLoading(true);

    try {
      await login(username, password);
      router.replace("/");
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>

      <View style={styles.formContainer}>
        <Input
          label="Username"
          placeholder="Masukkan username anda"
          value={username}
          onChangeText={setUsername}
          status={error ? "danger" : "basic"}
          caption={error ? error : ""}
        />
        <Input
          label="Kata sandi"
          placeholder="Masukkan kata sandi anda"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={secureText}
          status={error ? "danger" : "basic"}
          caption={error ? error : ""}
          accessoryRight={() => (
            <FontAwesome
              name={secureText ? "eye" : "eye-slash"}
              onPress={toggleSecureEntry}
              style={styles.icon}
            />
          )}
        />
      </View>
    </View>
  );
}

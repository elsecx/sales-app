import { User, users } from "@/data/users";
import * as SecureStore from "expo-secure-store";
import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";

type AuthContextType = {
  user: User | null;
  token: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // Load user data & token from secure storage when the app is first opened
  useEffect(() => {
    const loadSession = async () => {
      const storedToken = await SecureStore.getItemAsync("token");
      const storedUser = await SecureStore.getItemAsync("user");
      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      }
    };

    loadSession();
  }, []);

  // Dummy login
  const login = async (username: string, password: string) => {
    const foundUser = users.find(
      (u) => u.username === username && u.password === password
    );

    if (foundUser) {
      const fakeToken = `token-${foundUser.id}-${Date.now()}`;

      setUser(foundUser);
      setToken(fakeToken);

      // Save to secure storage
      await SecureStore.setItemAsync("token", fakeToken);
      await SecureStore.setItemAsync("user", JSON.stringify(foundUser));
    } else {
      throw new Error("Failed to login! Username or Password incorrect");
    }
  };

  // Dummy logout
  const logout = async () => {
    setUser(null);
    setToken(null);
    await SecureStore.deleteItemAsync("token");
    await SecureStore.deleteItemAsync("user");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
}
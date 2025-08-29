import { router } from "expo-router";
import React, { useState } from "react";
import { Alert, ScrollView } from "react-native";

import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { InputInteger } from "@/components/InputInteger";
import { Text, View } from "@/components/Themed";
import { Product, products } from "@/data/products";
import { useColorScheme } from "@/hooks/useColorScheme";
import { generateRandomId } from "@/utils/helpers";
import { createNewProductStyles } from "./styles";

export default function TabNewProductScreen() {
  const colorScheme = useColorScheme() ?? "light";
  const styles = createNewProductStyles(colorScheme);

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    category: "",
    stock: 0,
    unit: "",
    price: String(0),
  });

  const isFormFilled =
    form.name !== "" || form.category !== "" || form.stock !== 0 || form.unit !== "" || form.price !== "0";

  const handleCancel = () => {
    if (isFormFilled) {
      Alert.alert("Konfirmasi", "Data yang sudah diisi akan hilang. Yakin ingin membatalkan?", [
        { text: "Batal", style: "cancel" },
        { text: "Ya, batalkan", style: "destructive", onPress: () => router.back() },
      ]);
    } else {
      router.back();
    }
  };

  const handleSave = () => {
    if (!isFormFilled) {
      Alert.alert("Error", "Semua field wajib diisi!");
      return;
    }

    if (isNaN(form.stock) || form.stock <= 0) {
      Alert.alert("Error", "Stok harus berupa angka lebih dari 0!");
      return;
    }

    if (!/^\d+$/.test(form.price) || parseInt(form.price, 10) <= 0) {
      Alert.alert("Validasi", "Harga harus berupa angka lebih dari 0!");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const newProduct: Product = {
        id: generateRandomId(),
        name: form.name,
        category: form.category as Product["category"],
        stock: form.stock,
        unit: form.unit as Product["unit"],
        price: parseInt(form.price, 10),
      };

      products.unshift(newProduct);

      setLoading(false);

      Alert.alert("Berhasil", "Produk berhasil ditambahkan.", [{ text: "Ok", onPress: () => router.back() }]);
    }, 600);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.formContainer}>
        <Input
          label="Nama Produk"
          placeholder="Masukkan nama produk"
          value={form.name}
          onChangeText={(text) => setForm({ ...form, name: text })}
        />

        <Input
          label="Kategori"
          placeholder="Masukkan kategori produk"
          value={form.category}
          onChangeText={(text) => setForm({ ...form, category: text })}
        />

        <InputInteger
          label="Stok"
          value={form.stock}
          onValueChange={(val) => setForm({ ...form, stock: val })}
          min={0}
          max={9999}
          showControls
        />

        <Input
          label="Satuan"
          placeholder="Masukkan satuan produk"
          value={form.unit}
          onChangeText={(text) => setForm({ ...form, unit: text })}
        />

        <Input
          label="Harga"
          value={form.price}
          keyboardType="numeric"
          onChangeText={(text) => setForm({ ...form, price: text })}
          accessoryLeft={() => <Text>Rp</Text>}
        />

        <View style={styles.buttonContainer}>
          <Button status="primary" appearance="filled" loading={loading} disabled={loading} onPress={handleSave}>
            Simpan
          </Button>

          <Button status="basic" appearance="filled" disabled={loading} onPress={handleCancel}>
            Kembali
          </Button>
        </View>
      </View>
    </ScrollView>
  );
}

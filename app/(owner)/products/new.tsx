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

  // Initial state for the new product form
  const initForm = () => ({
    name: "",
    category: "",
    stock: 0,
    unit: "",
    price: String(0),
  });

  const [form, setForm] = useState(initForm);
  const [loading, setLoading] = useState(false);

  // Helper to update form state
  const updateForm = (key: keyof typeof form, value: any) => setForm((prev) => ({ ...prev, [key]: value }));

  // Check if any field is filled
  const isFormFilled =
    form.name !== "" || form.category !== "" || form.stock !== 0 || form.unit !== "" || form.price !== "0";

  // Handler for Cancel button
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

  // Validate form before saving
  const validateForm = () => {
    if (!form.name || !form.category || !form.stock || !form.unit || !form.price) {
      Alert.alert("Error", "Semua field wajib diisi!");
      return false;
    }

    if (isNaN(form.stock) || form.stock <= 0) {
      Alert.alert("Error", "Stok harus berupa angka lebih dari 0!");
      return false;
    }

    if (!/^\d+$/.test(form.price) || parseInt(form.price, 10) <= 0) {
      Alert.alert("Validasi", "Harga harus berupa angka lebih dari 0!");
      return false;
    }

    return true;
  };

  // Handler for Save button
  const handleSave = () => {
    if (!validateForm()) return;

    setLoading(true);

    // Simulate adding product
    setTimeout(() => {
      const newProduct: Product = {
        id: generateRandomId(),
        name: form.name,
        category: form.category as Product["category"],
        stock: form.stock,
        unit: form.unit as Product["unit"],
        price: parseInt(form.price, 10),
      };

      // Add new product to the beginning of the products list
      products.unshift(newProduct);

      setLoading(false);

      Alert.alert("Berhasil", "Produk berhasil ditambahkan.", [{ text: "Ok", onPress: () => router.back() }]);
    }, 600); // Simulate network request
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.formContainer}>
        {/* Product Name */}
        <Input
          label="Nama Produk"
          placeholder="Masukkan nama produk"
          value={form.name}
          onChangeText={(text) => updateForm("name", text)}
        />

        {/* Category */}
        <Input
          label="Kategori"
          placeholder="Masukkan kategori produk"
          value={form.category}
          onChangeText={(text) => updateForm("category", text)}
        />

        {/* Stock */}
        <InputInteger
          label="Stok"
          value={form.stock}
          onValueChange={(val) => updateForm("stock", val)}
          min={0}
          max={9999}
          showControls
        />

        {/* Unit */}
        <Input
          label="Satuan"
          placeholder="Masukkan satuan produk"
          value={form.unit}
          onChangeText={(text) => updateForm("unit", text)}
        />

        {/* Price */}
        <Input
          label="Harga"
          value={form.price}
          keyboardType="numeric"
          onChangeText={(text) => updateForm("price", text)}
          accessoryLeft={() => <Text>Rp</Text>}
        />

        {/* Action Buttons */}
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

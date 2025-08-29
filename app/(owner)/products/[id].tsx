import { Picker } from "@react-native-picker/picker";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { Alert, ScrollView } from "react-native";

import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { InputInteger } from "@/components/InputInteger";
import { Text, View } from "@/components/Themed";
import { categories, Category, products, Unit, units } from "@/data/products";
import { useColorScheme } from "@/hooks/useColorScheme";
import { createProductDetailStyles } from "./styles";

export default function TabProductDetailScreen() {
  const colorScheme = useColorScheme() ?? "light";
  const styles = createProductDetailStyles(colorScheme);

  // Get product ID from route params
  const { id } = useLocalSearchParams<{ id: string }>();
  const product = products.find((p) => p.id === id);

  // Initial form state
  const initForm = () => ({
    name: product?.name ?? "",
    category: product?.category ?? ("Sayuran" as Category),
    stock: product?.stock ?? 0,
    unit: product?.unit ?? ("Kg" as Unit),
    price: String(product?.price ?? ""),
  });

  const [form, setForm] = useState(initForm);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Helper to update form state
  const updateForm = (key: keyof typeof form, value: any) => setForm((prev) => ({ ...prev, [key]: value }));

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

  // Handler for Edit / Save button (dummy)
  const handleEdit = () => {
    if (isEditing) {
      if (!validateForm()) return;

      setLoading(true);
      setTimeout(() => {
        const index = products.findIndex((p) => p.id === id);
        if (index !== -1) {
          products[index] = {
            ...products[index],
            name: form.name,
            category: form.category,
            stock: form.stock,
            unit: form.unit,
            price: Number(form.price),
          };
        }

        setLoading(false);
        setIsEditing(false);

        Alert.alert("Berhasil", "Produk berhasil diperbarui.", [{ text: "OK", onPress: () => router.back() }]);
      }, 600); // Simulate network request
    } else {
      setIsEditing(true);
    }
  };

  // Handler for Delete button (dummy)
  const handleDelete = () => {
    Alert.alert("Konfirmasi", "Yakin ingin menghapus produk ini?", [
      { text: "Batal", style: "cancel" },
      {
        text: "Hapus",
        style: "destructive",
        onPress: () => {
          setLoading(true);
          setTimeout(() => {
            const index = products.findIndex((p) => p.id === id);
            if (index !== -1) products.splice(index, 1);

            setLoading(false);
            Alert.alert("Berhasil", "Produk berhasil dihapus.", [{ text: "OK", onPress: () => router.back() }]);
          }, 600); // Simulate network request
        },
      },
    ]);
  };

  // Reset form to initial state
  const handleReset = () => {
    setForm(initForm());
    setIsEditing(false);
  };

  // Check if form has unsaved changes
  const hasChanges = () =>
    product &&
    (form.name !== product.name ||
      form.category !== product.category ||
      form.stock !== product.stock ||
      form.unit !== product.unit ||
      form.price !== String(product.price));

  // Handler for Cancel button
  const handleCancel = () => {
    if (isEditing && hasChanges()) {
      Alert.alert("Konfirmasi", "Data yang sudah diisi akan hilang. Yakin ingin membatalkan?", [
        { text: "Batal", style: "cancel" },
        { text: "Ya, batalkan", style: "destructive", onPress: handleReset },
      ]);
    } else {
      setIsEditing(false);
    }
  };

  // Return early if product not found
  if (!product) {
    return (
      <View style={styles.container}>
        <Text>Produk tidak ditemukan.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.formContainer}>
        {/* Product Name */}
        <Input
          label="Nama Produk"
          placeholder="Masukkan nama produk"
          value={form.name}
          editable={isEditing}
          onChangeText={(text) => updateForm("name", text)}
        />

        {/* Category Picker */}
        <View>
          <Text style={styles.label}>Kategori</Text>
          <Picker
            enabled={isEditing}
            selectedValue={form.category}
            onValueChange={(val) => updateForm("category", val as Category)}
          >
            {categories.map((c) => (
              <Picker.Item key={c} label={c} value={c} />
            ))}
          </Picker>
        </View>

        {/* Stock Input */}
        <InputInteger
          label="Stok"
          value={form.stock}
          onValueChange={(val) => updateForm("stock", val)}
          min={0}
          max={9999}
          editable={isEditing}
          showControls
        />

        {/* Unit Picker */}
        <View>
          <Text style={styles.label}>Satuan</Text>
          <Picker enabled={isEditing} selectedValue={form.unit} onValueChange={(val) => updateForm("unit", val)}>
            {units.map((u) => (
              <Picker.Item key={u} label={u} value={u} />
            ))}
          </Picker>
        </View>

        {/* Price Input */}
        <Input
          label="Harga"
          value={form.price}
          keyboardType="numeric"
          editable={isEditing}
          onChangeText={(text) => updateForm("price", text)}
          accessoryLeft={() => <Text>Rp</Text>}
        />

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <Button status="primary" appearance="filled" loading={loading} disabled={loading} onPress={handleEdit}>
            {isEditing ? "Simpan" : "Edit"}
          </Button>

          <Button
            status={isEditing ? "basic" : "danger"}
            appearance="filled"
            disabled={loading}
            onPress={isEditing ? handleCancel : handleDelete}
          >
            {isEditing ? "Batal" : "Hapus"}
          </Button>
        </View>
      </View>
    </ScrollView>
  );
}

import { Picker } from "@react-native-picker/picker";
import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { Alert, ScrollView } from "react-native";

import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { InputInteger } from "@/components/InputInteger";
import { Text, View } from "@/components/Themed";
import { categories, Category, products } from "@/data/products";
import { useColorScheme } from "@/hooks/useColorScheme";
import { createProductDetailStyles } from "./styles";

export default function TabProductDetailScreen() {
  const colorScheme = useColorScheme() ?? "light";
  const styles = createProductDetailStyles(colorScheme);

  const { id } = useLocalSearchParams<{ id: string }>();
  const product = products.find((p) => p.id === id);

  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [form, setForm] = useState({
    name: product?.name ?? "",
    category: product?.category ?? ("Sayuran" as Category),
    stock: product?.stock ?? 0,
    unit: product?.unit ?? "",
    price: String(product?.price ?? ""),
  });

  const handleEdit = () => {
    if (isEditing) {
      setLoading(true);

      setTimeout(() => {
        console.log("Data tersimpan:", form);
        setLoading(false);
        setIsEditing(false);
      }, 1000);
    } else {
      setIsEditing(true);
    }
  };

  const handleRestore = () => {
    setForm({
      name: product?.name ?? "",
      category: product?.category ?? ("Sayuran" as Category),
      stock: product?.stock ?? 0,
      unit: product?.unit ?? "",
      price: String(product?.price ?? ""),
    });
    setIsEditing(false);
  };

  const hasChanges = () => {
    if (!product) return false;
    return (
      form.name !== product.name ||
      form.category !== product.category ||
      form.stock !== product.stock ||
      form.unit !== product.unit ||
      form.price !== String(product.price)
    );
  };

  const handleCancel = () => {
    if (isEditing && hasChanges()) {
      Alert.alert("Konfirmasi", "Data yang sudah diisi akan hilang. Yakin ingin membatalkan?", [
        { text: "Batal", style: "cancel" },
        { text: "Ya, batalkan", style: "destructive", onPress: () => handleRestore() },
      ]);
    } else {
      setIsEditing(false);
    }
  };

  if (!product) {
    return (
      <View style={styles.container}>
        <Text>Produk tidak ditemukan.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.formContainer}>
        <Input
          label="Nama Produk"
          placeholder="Masukkan nama produk"
          value={form.name}
          editable={isEditing}
          onChangeText={(text) => setForm({ ...form, name: text })}
        />

        <View>
          <Text style={styles.label}>Kategori</Text>
          <Picker
            enabled={isEditing}
            selectedValue={form.category}
            onValueChange={(val) => setForm({ ...form, category: val as Category })}
          >
            {categories.map((c) => (
              <Picker.Item key={c} label={c} value={c} />
            ))}
          </Picker>
        </View>

        <InputInteger
          label="Stok"
          value={form.stock}
          onValueChange={(val) => setForm({ ...form, stock: val })}
          min={0}
          max={9999}
          editable={isEditing}
          showControls
        />

        <Input
          label="Satuan"
          value={form.unit}
          editable={isEditing}
          onChangeText={(text) => setForm({ ...form, unit: text })}
        />

        <Input
          label="Harga"
          value={form.price}
          editable={isEditing}
          onChangeText={(text) => setForm({ ...form, price: text })}
        />

        <View style={styles.buttonContainer}>
          <Button status="primary" appearance="filled" loading={loading} disabled={loading} onPress={handleEdit}>
            {isEditing ? "Simpan" : "Edit"}
          </Button>
          {isEditing && (
            <Button status="basic" appearance="filled" disabled={loading} onPress={handleCancel}>
              Batal
            </Button>
          )}
        </View>
      </View>
    </ScrollView>
  );
}

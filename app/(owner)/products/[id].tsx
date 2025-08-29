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

  const { id } = useLocalSearchParams<{ id: string }>();
  const product = products.find((p) => p.id === id);

  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [form, setForm] = useState({
    name: product?.name ?? "",
    category: product?.category ?? ("Sayuran" as Category),
    stock: product?.stock ?? 0,
    unit: product?.unit ?? ("Kg" as Unit),
    price: String(product?.price ?? ""),
  });

  const handleEdit = () => {
    if (isEditing) {
      if (!form.name || !form.category || !form.stock || !form.unit || !form.price) {
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
        console.log("Data tersimpan:", form);

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

        Alert.alert("Berhasil", "Produk berhasil diperbarui.", [
          {
            text: "OK",
            onPress: () => router.back(),
          },
        ]);
      }, 600); // delay simulasi fetch
    } else {
      setIsEditing(true);
    }
  };

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
            if (index !== -1) {
              products.splice(index, 1);
            }

            setLoading(false);

            Alert.alert("Berhasil", "Produk berhasil dihapus.", [
              {
                text: "OK",
                onPress: () => router.back(),
              },
            ]);
          }, 600); // delay simulasi
        },
      },
    ]);
  };

  const handleReset = () => {
    setForm({
      name: product?.name ?? "",
      category: product?.category ?? ("Sayuran" as Category),
      stock: product?.stock ?? 0,
      unit: product?.unit ?? ("Kg" as Unit),
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
        { text: "Ya, batalkan", style: "destructive", onPress: () => handleReset() },
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
    <ScrollView style={styles.container}>
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

        <View>
          <Text style={styles.label}>Satuan</Text>
          <Picker
            enabled={isEditing}
            selectedValue={form.unit}
            onValueChange={(val) => setForm({ ...form, unit: val })}
          >
            {units.map((u) => (
              <Picker.Item key={u} label={u} value={u} />
            ))}
          </Picker>
        </View>

        <Input
          label="Harga"
          value={form.price}
          keyboardType="numeric"
          editable={isEditing}
          onChangeText={(text) => setForm({ ...form, price: text })}
          accessoryLeft={() => <Text>Rp</Text>}
        />

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

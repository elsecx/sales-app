import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Alert, Platform, ScrollView } from "react-native";

import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Text, View } from "@/components/Themed";
import { employees } from "@/data/employees";
import { useColorScheme } from "@/hooks/useColorScheme";
import { formatDateID } from "@/utils/helpers";
import { createEmployeeDetailStyles } from "./styles";

export default function TabEmployeeDetailScreen() {
  const colorScheme = useColorScheme() ?? "light";
  const styles = createEmployeeDetailStyles(colorScheme);

  const { id } = useLocalSearchParams<{ id: string }>();
  const employee = employees.find((p) => p.id === id);

  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [form, setForm] = useState({
    name: employee?.name ?? "",
    phone: employee?.phone ?? "",
    address: employee?.address ?? "",
    status: employee?.status ?? false,
    joinedAt: employee?.joinedAt ?? new Date(),
  });

  const handleDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === "ios");
    if (selectedDate) {
      setForm({ ...form, joinedAt: selectedDate });
    }
  };

  const handleEdit = () => {
    if (isEditing) {
      if (!form.name || !form.phone || !form.address || !form.status || !form.joinedAt) {
        Alert.alert("Error", "Semua field wajib diisi!");
        return;
      }

      const phoneRegex = /^(?:\+62|62|0)8[1-9][0-9]{6,10}$/;
      if (!phoneRegex.test(form.phone)) {
        Alert.alert(
          "Error",
          "Nomor telepon tidak valid. Gunakan format Indonesia, misalnya 08123456789 atau +628123456789."
        );
        return;
      }

      if (!form.joinedAt || !(form.joinedAt instanceof Date)) {
        Alert.alert("Error", "Tanggal bergabung wajib diisi.");
        return;
      }

      setLoading(true);
      setTimeout(() => {
        console.log("Data tersimpan:", form);

        const index = employees.findIndex((p) => p.id === id);
        if (index !== -1) {
          employees[index] = {
            ...employees[index],
            name: form.name,
            phone: form.phone,
            address: form.address,
            status: form.status,
            joinedAt: form.joinedAt,
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
            const index = employees.findIndex((p) => p.id === id);
            if (index !== -1) {
              employees.splice(index, 1);
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
      name: employee?.name ?? "",
      phone: employee?.phone ?? "",
      address: employee?.address ?? "",
      status: employee?.status ?? false,
      joinedAt: employee?.joinedAt ?? new Date(),
    });
    setIsEditing(false);
  };

  const hasChanges = () => {
    if (!employee) return false;
    return (
      form.name !== employee.name ||
      form.phone !== employee.phone ||
      form.address !== employee.address ||
      form.status !== employee.status ||
      form.joinedAt !== employee.joinedAt
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

  if (!employee) {
    return (
      <View style={styles.container}>
        <Text>Pegawai tidak ditemukan.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.formContainer}>
        <Input
          label="Nama Pegawai"
          placeholder="Masukkan nama pegawai"
          value={form.name}
          editable={isEditing}
          onChangeText={(text) => setForm({ ...form, name: text })}
        />

        <Input
          label="Nomor Telepon"
          placeholder="Masukkan nomor telepon"
          value={form.phone}
          editable={isEditing}
          onChangeText={(text) => setForm({ ...form, phone: text })}
        />

        <View>
          <Text style={styles.label}>Status</Text>
          <Picker
            enabled={isEditing}
            selectedValue={form.status}
            onValueChange={(val) => setForm({ ...form, status: val })}
          >
            <Picker.Item key={1} label="Aktif" value={true} />
            <Picker.Item key={2} label="Tidak Aktif" value={false} />
          </Picker>
        </View>

        <Input
          label="Tanggal Bergabung"
          placeholder="Masukkan tanggal bergabung"
          value={formatDateID(form.joinedAt)}
          editable={isEditing}
          onPressIn={() => setShowDatePicker(true)}
        />
        {showDatePicker && (
          <DateTimePicker
            value={form.joinedAt}
            mode="date"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={handleDateChange}
          />
        )}

        <Input
          label="Alamat"
          placeholder="Masukkan alamat pegawai"
          value={form.address}
          editable={isEditing}
          multiline
          numberOfLines={3}
          onChangeText={(text) => setForm({ ...form, address: text })}
        />
      </View>

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
    </ScrollView>
  );
}

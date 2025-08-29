import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, Platform, ScrollView } from "react-native";

import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Text, View } from "@/components/Themed";
import { Employee, employees } from "@/data/employees";
import { useColorScheme } from "@/hooks/useColorScheme";
import { formatDateID, generateRandomId } from "@/utils/helpers";
import { createNewEmployeeStyles } from "./styles";

export default function TabNewEmployeeScreen() {
  const colorScheme = useColorScheme() ?? "light";
  const styles = createNewEmployeeStyles(colorScheme);

  // Initial state for the new employee form
  const initForm = () => ({
    name: "",
    phone: "",
    address: "",
    status: null as boolean | null,
    joinedAt: null as Date | null,
  });

  const [form, setForm] = useState(initForm);
  const [loading, setLoading] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Helper to update form state
  const updateForm = (key: keyof typeof form, value: any) => setForm((prev) => ({ ...prev, [key]: value }));

  // Check if any field is filled
  const isFormFilled =
    form.name !== "" || form.phone !== "" || form.address !== "" || form.status !== null || form.joinedAt !== null;

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
    if (!form.name || !form.phone || !form.address || !form.joinedAt || form.status === null) {
      Alert.alert("Error", "Semua field wajib diisi!");
      return false;
    }

    const phoneRegex = /^(?:\+62|62|0)8[1-9][0-9]{6,10}$/;
    if (!phoneRegex.test(form.phone)) {
      Alert.alert(
        "Error",
        "Nomor telepon tidak valid. Gunakan format Indonesia, misalnya 08123456789 atau +628123456789."
      );
      return false;
    }

    if (!(form.joinedAt instanceof Date)) {
      Alert.alert("Error", "Tanggal bergabung wajib diisi.");
      return false;
    }

    return true;
  };

  // Handler for Save button
  const handleSave = () => {
    if (!validateForm()) return;

    setLoading(true);
    setTimeout(() => {
      const newEmployee: Employee = {
        id: generateRandomId(),
        name: form.name,
        phone: form.phone,
        address: form.address,
        status: form.status as boolean,
        joinedAt: form.joinedAt as Date,
      };

      // Add new employee to the beginning of the list
      employees.unshift(newEmployee);

      setLoading(false);
      Alert.alert("Berhasil", "Pegawai berhasil ditambahkan.", [{ text: "Ok", onPress: () => router.back() }]);
    }, 600); // Simulate network request
  };

  // Handler for Date Picker change
  const handleDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === "ios");
    if (selectedDate) updateForm("joinedAt", selectedDate);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.formContainer}>
        {/* Employee Name */}
        <Input
          label="Nama Pegawai"
          placeholder="Masukkan nama pegawai"
          value={form.name}
          onChangeText={(text) => updateForm("name", text)}
        />

        {/* Phone Number */}
        <Input
          label="Nomor Telepon"
          placeholder="Masukkan nomor telepon"
          keyboardType="phone-pad"
          value={form.phone}
          onChangeText={(text) => updateForm("phone", text)}
        />

        {/* Status Picker */}
        <Text style={styles.label}>Status</Text>
        <Picker selectedValue={form.status} onValueChange={(val) => updateForm("status", val)}>
          <Picker.Item label="=== [Pilih Status] ===" value={null} style={styles.placeholder} />
          <Picker.Item label="Aktif" value={true} />
          <Picker.Item label="Tidak Aktif" value={false} />
        </Picker>

        {/* Joined Date */}
        <Input
          label="Tanggal Bergabung"
          placeholder="Masukkan tanggal bergabung"
          value={form.joinedAt ? formatDateID(form.joinedAt) : ""}
          onPressIn={() => setShowDatePicker(true)}
        />
        {showDatePicker && (
          <DateTimePicker
            value={form.joinedAt || new Date()}
            mode="date"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={handleDateChange}
          />
        )}

        {/* Address */}
        <Input
          label="Alamat"
          placeholder="Masukkan alamat pegawai"
          value={form.address}
          multiline
          numberOfLines={3}
          onChangeText={(text) => updateForm("address", text)}
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

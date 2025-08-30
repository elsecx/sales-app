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

  // Get employee ID from route params
  const { id } = useLocalSearchParams<{ id: string }>();
  const employee = employees.find((p) => p.id === id);

  // Initial form state
  const initForm = () => ({
    name: employee?.name ?? "",
    phone: employee?.phone ?? "",
    address: employee?.address ?? "",
    status: employee?.status ?? false,
    joinedAt: employee?.joinedAt ?? new Date(),
  });

  const [form, setForm] = useState(initForm);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Helper to update form state
  const updateForm = (key: keyof typeof form, value: any) => setForm((prev) => ({ ...prev, [key]: value }));

  // Validate form before saving
  const validateForm = () => {
    if (!form.name || !form.phone || !form.address || !form.joinedAt) {
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

    return true;
  };

  // Handler for Edit / Save button (dummy)
  const handleEdit = () => {
    if (!isEditing) return setIsEditing(true);
    if (!validateForm()) return;

    setLoading(true);
    setTimeout(() => {
      const index = employees.findIndex((p) => p.id === id);
      if (index !== -1) employees[index] = { ...employees[index], ...form };

      setLoading(false);
      setIsEditing(false);
      Alert.alert("Berhasil", "Pegawai berhasil diperbarui.", [{ text: "OK", onPress: () => router.back() }]);
    }, 600); // Simulate network request
  };

  // Handler for Delete button (dummy)
  const handleDelete = () => {
    Alert.alert("Konfirmasi", "Apakah Anda yakin ingin menghapus pegawai ini?", [
      { text: "Batal", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          setLoading(true);
          setTimeout(() => {
            const index = employees.findIndex((p) => p.id === id);
            if (index !== -1) employees.splice(index, 1);
            setLoading(false);
            Alert.alert("Berhasil", "Pegawai berhasil dihapus.", [{ text: "OK", onPress: () => router.back() }]);
          }, 600);
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
    employee &&
    (form.name !== employee.name ||
      form.phone !== employee.phone ||
      form.address !== employee.address ||
      form.status !== employee.status ||
      form.joinedAt !== employee.joinedAt);

  // Handler for Cancel button
  const handleCancel = () => {
    if (isEditing && hasChanges()) {
      Alert.alert("Konfirmasi", "Perubahan yang belum disimpan akan hilang. Apakah Anda yakin ingin membatalkan?", [
        { text: "Batal", style: "cancel" },
        { text: "Ya, batalkan", style: "destructive", onPress: handleReset },
      ]);
    } else {
      setIsEditing(false);
    }
  };

  // Return early if employee not found
  if (!employee)
    return (
      <View style={styles.container}>
        <Text>Employee not found.</Text>
      </View>
    );

  // Handler for DatePicker change
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
          value={form.name}
          editable={isEditing}
          onChangeText={(text) => updateForm("name", text)}
        />

        {/* Phone Number */}
        <Input
          label="Nomor Telepon"
          keyboardType="phone-pad"
          value={form.phone}
          editable={isEditing}
          onChangeText={(text) => updateForm("phone", text)}
        />

        {/* Status Picker */}
        <Text style={styles.label}>Status</Text>
        <Picker enabled={isEditing} selectedValue={form.status} onValueChange={(val) => updateForm("status", val)}>
          <Picker.Item key={1} label="Active" value={true} />
          <Picker.Item key={2} label="Inactive" value={false} />
        </Picker>

        {/* Join Date */}
        <Input
          label="Tanggal Bergabung"
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

        {/* Address */}
        <Input
          label="Alamat"
          value={form.address}
          editable={isEditing}
          multiline
          numberOfLines={3}
          onChangeText={(text) => updateForm("address", text)}
        />
      </View>

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
    </ScrollView>
  );
}

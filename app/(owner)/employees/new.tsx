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

  const [loading, setLoading] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    status: null as boolean | null,
    joinedAt: null as Date | null,
  });

  const isFormFilled =
    form.name !== "" || form.phone !== "" || form.address !== "" || form.status !== null || form.joinedAt !== null;

  const handleDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === "ios");
    if (selectedDate) {
      setForm({ ...form, joinedAt: selectedDate });
    }
  };

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
      const newEmployee: Employee = {
        id: generateRandomId(),
        name: form.name,
        phone: form.phone,
        address: form.address,
        status: form.status as boolean,
        joinedAt: form.joinedAt as Date,
      };

      employees.unshift(newEmployee);

      setLoading(false);

      Alert.alert("Berhasil", "Pegawai berhasil ditambahkan.", [{ text: "Ok", onPress: () => router.back() }]);
    }, 600);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.formContainer}>
        <Input
          label="Nama Pegawai"
          placeholder="Masukkan nama pegawai"
          value={form.name}
          onChangeText={(text) => setForm({ ...form, name: text })}
        />

        <Input
          label="Nomor Telepon"
          placeholder="Masukkan nomor telepon"
          keyboardType="phone-pad"
          value={form.phone}
          onChangeText={(text) => setForm({ ...form, phone: text })}
        />

        <View>
          <Text style={styles.label}>Status</Text>
          <Picker selectedValue={form.status} onValueChange={(val) => setForm({ ...form, status: val })}>
            <Picker.Item label="=== [Pilih Status] ===" value={null} style={styles.placeholder} />
            <Picker.Item label="Aktif" value={true} />
            <Picker.Item label="Tidak Aktif" value={false} />
          </Picker>
        </View>

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

        <Input
          label="Alamat"
          placeholder="Masukkan alamat pegawai"
          value={form.address}
          multiline
          numberOfLines={3}
          onChangeText={(text) => setForm({ ...form, address: text })}
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

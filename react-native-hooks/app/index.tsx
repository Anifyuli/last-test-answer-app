import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';

// Mendefinisikan tipe untuk data pengguna
interface User {
  id: number;
  name: string;
  email: string;
}

// Mendefinisikan tipe untuk state yang menyimpan loading, data, dan error
interface State {
  loading: boolean;   // Menyimpan status apakah data sedang dimuat
  data: User[];       // Menyimpan daftar data pengguna
  error: string | null; // Menyimpan pesan error jika terjadi kesalahan
}

export default function App() {
  // Menggunakan useState untuk mengelola state aplikasi
  const [state, setState] = useState<State>({
    loading: true,  // Set default loading ke true
    data: [],       // Data awal kosong
    error: null,    // Tidak ada error pada awalnya
  });

  // Menggunakan useEffect untuk mengambil data dari API saat komponen dimuat
  useEffect(() => {
    // Fungsi asinkron untuk mengambil data dari API
    const fetchData = async () => {
      try {
        // Mengambil data menggunakan fetch API
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        
        // Mengecek apakah respons dari API sukses (status 200-299)
        if (!response.ok) {
          throw new Error('Something went wrong!');
        }
        
        // Mengubah data respons ke format JSON
        const result: User[] = await response.json();
        
        // Memperbarui state dengan data pengguna yang berhasil diambil
        setState({ loading: false, data: result, error: null });
      } catch (error: any) {
        // Menangani error jika ada masalah saat mengambil data
        setState({ loading: false, data: [], error: error.message });
      }
    };

    // Memanggil fungsi untuk mengambil data
    fetchData();
  }, []);  // Empty dependency array, artinya efek hanya dijalankan sekali saat komponen pertama kali dimuat

  // Jika data masih dimuat (loading), tampilkan indikator loading
  if (state.loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // Jika ada error, tampilkan pesan error
  if (state.error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Error: {state.error}</Text>
      </View>
    );
  }

  // Jika data sudah berhasil diambil, tampilkan daftar pengguna
  return (
    <View style={styles.container}>
      <FlatList
        data={state.data} // Data yang ditampilkan adalah data pengguna
        keyExtractor={(item) => item.id.toString()} // Menentukan key untuk setiap item berdasarkan id
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.name}>{item.name}</Text>
            <Text>{item.email}</Text>
          </View>
        )}
      />
    </View>
  );
}

// Gaya untuk komponen menggunakan StyleSheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 5,
    paddingHorizontal: 16,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  name: {
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    fontWeight: 'bold',
  },
});

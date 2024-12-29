import React, { useState, useEffect } from "react";
import {
  FlatList,
  Text,
  View,
  Button,
  ActivityIndicator,
  StyleSheet,
  Pressable,
} from "react-native";

// Mengimpor data dari alamat yang sesuai
import data from "@/data/data.json"; // Pastikan path ini sesuai dengan konfigurasi project Anda

// Tipe data untuk item yang akan ditampilkan di FlatList
type Item = {
  id: string;
  name: string;
};

export default function App() {
  // State untuk menyimpan data yang akan ditampilkan
  const [items, setItems] = useState<Item[]>([]);

  // State untuk menandakan apakah data sedang dimuat (loading)
  const [loading, setLoading] = useState<boolean>(false);

  // State untuk menyimpan halaman saat ini
  const [page, setPage] = useState<number>(1);

  // State untuk menandakan apakah masih ada data untuk dimuat
  const [hasMore, setHasMore] = useState<boolean>(true);

  // Fungsi untuk mengambil data
  const fetchData = () => {
    // Jangan memuat data jika sudah dalam keadaan loading atau tidak ada data lagi untuk dimuat
    if (loading || !hasMore) return;

    // Menandakan bahwa data sedang dimuat
    setLoading(true);

    // Simulasi pengambilan data, menggunakan pagination
    setTimeout(() => {
      // Menghitung indeks data yang akan diambil berdasarkan halaman saat ini
      const start = (page - 1) * 10;
      const end = start + 10;

      // Mengambil potongan data sesuai dengan halaman
      const newData = data.slice(start, end);

      // Jika data yang diambil kosong, berarti tidak ada lagi data yang bisa dimuat
      if (newData.length === 0) {
        setHasMore(false);
      }

      // Menambahkan data yang diambil ke data yang sudah ada
      setItems((prevItems) => [...prevItems, ...newData]);

      // Menandakan bahwa pengambilan data selesai
      setLoading(false);

      // Menambahkan halaman untuk mengambil data berikutnya
      setPage(page + 1);
    }, 1000); // Simulasi delay 1 detik saat mengambil data
  };

  // Efek untuk mengambil data saat pertama kali dijalankan
  useEffect(() => {
    fetchData(); // Panggil fetchData untuk mengambil data pertama kali
  }, []); // Efek hanya dijalankan sekali saat pertama kali komponen dimuat

  return (
    <View style={styles.container}>
      {/* FlatList untuk menampilkan data */}
      <FlatList
        data={items} // Data yang akan ditampilkan
        keyExtractor={(item) => item.id} // Menentukan key untuk setiap item
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>{item.name}</Text>
          </View>
        )}
        ListFooterComponent={
          // Menampilkan footer setelah list
          loading ? (
            // Jika data sedang dimuat, tampilkan indikator loading
            <ActivityIndicator size="large" color="#0000ff" />
          ) : // Jika masih ada data, tampilkan tombol "Load More"
          hasMore ? (
            <View style={styles.footerButton}>
              <Pressable style={styles.pressable} onPress={fetchData}>
                <Text style={{color: "white"}}>Load More</Text>
              </Pressable>
            </View>
          ) : (
            // Jika tidak ada lagi data, tampilkan pesan "No more data"
            <View style={styles.footer}>
              <Text style={styles.footerText}>No more data</Text>
            </View>
          )
        }
      />
    </View>
  );
}

// Styling untuk komponen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  itemText: {
    fontSize: 16,
  },
  footer: {
    padding: 15,
    alignItems: "center",
  },
  footerText: {
    fontSize: 16,
    color: "#666",
  },
  footerButton: {
    padding: 15,
    alignItems: "center",
  },
  pressable: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: "blue",
  },
});

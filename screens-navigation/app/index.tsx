import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import DummyList from "@/data/dummyData.json" // Impor data JSON

// Halaman index dengan React Functional Component
const IndexPage: React.FC = () => {
  const router = useRouter();

  // Callback handleItemPress mengalihkan tampilan aplikasi ketika di klik salah satu anggota dari data yang diambil berdasarkan id
  const handleItemPress = (id: number) => {
    router.push(`/detail/${id}`);
  };

  // Tampilkan hasilnya
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Dummy List</Text>
      <FlatList
        data={DummyList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handleItemPress(item.id)}
            style={styles.item}
          >
            <Text>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

// Percantik tampilan
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  header: { fontSize: 24, fontWeight: "bold", marginBottom: 16 },
  item: {
    padding: 16,
    backgroundColor: "#f0f0f0",
    marginBottom: 8,
    borderRadius: 4,
  },
});

export default IndexPage;

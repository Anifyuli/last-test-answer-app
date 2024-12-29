import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import DummyList from "@/data/dummyData.json" // Impor data JSON

// Halaman detail yang menggunakan React Functional Components
const DetailPage: React.FC = () => {
  const { id } = useLocalSearchParams();
  const item = DummyList.find((item) => item.id === Number(id));

  // Pengkondisian jika item tidak ditemukan
  if (!item) {
    return (
      <View style={styles.container}>
        <Text>Item not found</Text>
      </View>
    );
  }

  // Munculkan tampilan jika item ditemukan
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{item.title}</Text>
      <Text>{item.description}</Text>
    </View>
  );
};

// Percantik tampilan
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
});

export default DetailPage;

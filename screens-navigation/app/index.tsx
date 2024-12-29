import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import DummyList from "@/data/dummyData.json"

const IndexPage: React.FC = () => {
  const router = useRouter();

  const handleItemPress = (id: number) => {
    router.push(`/detail/${id}`);
  };

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

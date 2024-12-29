import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Alert, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Definisikan tipedata dari Contact
interface Contact {
  id: string;
  name: string;
  phone: string;
}

export default function App() {
  // state yang digunakan dalam aplikasi
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    const loadContacts = async () => {
      try {
        const storedContacts = await AsyncStorage.getItem('contacts');
        if (storedContacts) {
          setContacts(JSON.parse(storedContacts));
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to load contacts.');
      }
    };

    loadContacts();
  }, []);

  const saveContacts = async (newContacts: Contact[]) => {
    try {
      await AsyncStorage.setItem('contacts', JSON.stringify(newContacts));
    } catch (error) {
      Alert.alert('Error', 'Failed to save contacts.');
    }
  };

  const handleAddContact = () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Name cannot be empty.');
      return;
    }

    if (!phone.trim()) {
      Alert.alert('Error', 'Phone number cannot be empty.');
      return;
    }

    const newContact: Contact = { id: Date.now().toString(), name, phone };
    const updatedContacts = [...contacts, newContact];
    setContacts(updatedContacts);
    saveContacts(updatedContacts);

    Alert.alert('Success', `Contact added:\nName: ${name}\nPhone: ${phone}`);
    setName('');
    setPhone('');
  };

  const renderContact = ({ item }: { item: Contact }) => (
    <View style={styles.contactItem}>
      <Text style={styles.contactText}>{item.name}</Text>
      <Text style={styles.contactText}>{item.phone}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Contact</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />
      <Button title="Add Contact" onPress={handleAddContact} />

      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id}
        renderItem={renderContact}
        style={styles.contactList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  contactList: {
    marginTop: 20,
  },
  contactItem: {
    padding: 15,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    backgroundColor: '#fff',
  },
  contactText: {
    fontSize: 16,
  },
});

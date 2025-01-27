import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';

export default function DiscoverScreen() {
  return (
    <View style={styles.container}>
      <TextInput style={styles.searchBar} placeholder="Search..." />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBar: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    margin: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

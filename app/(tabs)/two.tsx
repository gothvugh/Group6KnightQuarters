import React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Please Log In</Text>
      <Text style={styles.description}>To access more features, please log in or register.</Text>
      <Button title="Go to Registration" onPress={() => {/* Navigate to registration screen */}} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 20,
  },
});

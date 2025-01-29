import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from './Themed';



export default function EditScreenInfo({ path }: { path: string }) {
    return (
        <View style={styles.getStartedContainer}>
            <Text style={styles.logo}>KQ</Text>
            <Text style={styles.subtitle}>UNIVERSITY OF CENTRAL FLORIDA</Text>
        </View>

    );
}

const styles = StyleSheet.create({
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
    backgroundColor: 'white', 
    paddingVertical: 20,
    borderRadius: 10, 
  },
  logo: {
    fontSize: 60,
    fontWeight: 'bold',
    color: '#FFC900',
  },
  subtitle: {
    fontSize: 12,
    color: '#666',
    marginBottom: 20,
  },
});

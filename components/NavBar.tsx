import React from 'react';
import {
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Image,
  } from 'react-native';
import { Text, View } from './Themed';

export default function EditScreenInfo({ path }: { path: string }) {
    return (
      <View style={styles.bottomNav}>
        <TouchableOpacity>
          <Text style={styles.navIcon}>🏠</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.navIcon}>➕</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.navIcon}>✉️</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.navIcon}>🔍</Text>
        </TouchableOpacity>
      </View>
);
}

const styles = StyleSheet.create({
    bottomNav: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0',
      },
      navIcon: {
        fontSize: 20,
      },
    
});
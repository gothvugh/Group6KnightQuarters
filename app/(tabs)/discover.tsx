import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import KQLogo from '@/components/KQLogo';

export default function DiscoverScreen() {
  const communities = [
    'Psychology',
    'Nursing',
    'Engineering',
    'Political Science',
    'Digital Media',
    'Computer Science',
    'Biology',
    'Graphic Design',
    'Anthropology',
  ];


  return (
    <View style={styles.container}>
      <KQLogo path="app/(tabs)/discover.tsx"/>

      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.tabContainer}>
          <Text style={styles.tab}>Connections</Text>
          <Text style={[styles.tab, styles.activeTab]}>Discover</Text>
        </View>
      </View>

      {/* Explore Communities */}
      <Text style={styles.sectionTitle}>Explore communities</Text>
      <View style={styles.listContainer}>
      {communities.map((item, index) => (
        <TouchableOpacity style={styles.item}>
          <Text key={index} style={styles.itemText}>{item}</Text>
        </TouchableOpacity>
      ))}
    </View>

      {/* Based on Groups Section */}
      <Text style={styles.sectionTitle}>Based on Groups you might like</Text>
      

      {/* Trending Section */}
      <Text style={styles.sectionTitle}>Trending</Text>
      <View style={styles.trendingCard}>
        <Text style={styles.trendingUser}>Huey Magoos</Text>
        <Text style={styles.trendingText}>
          Hey Everybody, I'm looking for places near UCF main campus to get food that won't break the bank. I usually eat at the student union but I'm getting sick of eating Huey Magoos all the time!
        </Text>
        <Text style={styles.trendingComments}>Comments (10)</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  header: {
    alignItems: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  tab: {
    fontSize: 16,
    marginHorizontal: 10,
    color: '#A0A0A0',
  },
  activeTab: {
    fontWeight: 'bold',
    color: '#000',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  listContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap', // Allows wrapping to the next line
    gap: 10, // Adds spacing between items (requires React Native 0.71+)
  },
  item: {
    backgroundColor: '#FFD700', // UCF Gold
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 10,
    marginBottom: 10,
    alignSelf: 'flex-start',
  }, 
  itemText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#black',
  },
  trendingCard: {
    padding: 15,
    backgroundColor: '#F7F7F7',
    borderRadius: 10,
    marginBottom: 20,
  },
  trendingUser: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 5,
  },
  trendingText: {
    fontSize: 14,
    marginBottom: 10,
  },
  trendingComments: {
    fontSize: 12,
    color: '#A0A0A0',
  },
});

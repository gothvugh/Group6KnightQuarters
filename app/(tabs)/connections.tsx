import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import KQLogo from '@/components/KQLogo';

export default function DiscoverScreen() {
  const router = useRouter();

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

  const groups = [
    {
      id: '1',
      name: 'ROTC',
      members: '3.6k members',
      description:
        'Army ROTC is a program designed to develop individual leadership skills for either military or civilian career.',
    },
    {
      id: '2',
      name: 'KQR',
      members: '5.8k members',
      description:
        'KQR is Knights Experiential Robotics, a club for introducing Knights to real-world robotics.',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <KQLogo path="app/(tabs)/discover.tsx" />

      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.tabContainer}>
          <TouchableOpacity onPress={() => router.push('/connections')}>
            <Text style={styles.tab}>Connections</Text>
          </TouchableOpacity>
          <Text style={[styles.tab, styles.activeTab]}>Discover</Text>
        </View>
      </View>

      {/* Explore Communities */}
      <Text style={styles.sectionTitle}>Explore communities</Text>
      <View style={styles.listContainer}>
        {communities.map((item, index) => (
          <TouchableOpacity style={styles.item} key={index}>
            <Text style={styles.itemText}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Based on Groups Section */}
      <Text style={styles.sectionTitle}>Based on Groups you might like</Text>
      {groups.map((group) => (
        <View key={group.id} style={styles.card}>
          <View style={styles.iconContainer}>
            <View style={styles.icon}>
              <Text style={styles.iconText}>👤</Text>
            </View>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.groupName}>
              {group.name} <Text style={styles.members}>{group.members}</Text>
            </Text>
            <Text style={styles.description}>{group.description}</Text>
          </View>
          <TouchableOpacity style={styles.joinButton}>
            <Text style={styles.joinButtonText}>Join</Text>
          </TouchableOpacity>
        </View>
      ))}

      {/* Trending Section */}
      <Text style={styles.sectionTitle}>Trending</Text>
      <View style={styles.trendingCard}>
        <Text style={styles.trendingUser}>Huey Magoos</Text>
        <Text style={styles.trendingText}>
          Hey Everybody, I'm looking for places near UCF main campus to get food that won't break the bank. I usually
          eat at the student union but I'm getting sick of eating Huey Magoo's all the time!
        </Text>
        <Text style={styles.trendingComments}>Comments (10)</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
    flexWrap: 'wrap',
    gap: 10,
  },
  item: {
    backgroundColor: '#FFD700',
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 10,
  },
  itemText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  iconContainer: {
    marginRight: 15,
  },
  icon: {
    backgroundColor: '#E0D6FF',
    borderRadius: 50,
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    fontSize: 20,
    color: '#7F56D9',
  },
  infoContainer: {
    flex: 1,
  },
  groupName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  members: {
    fontSize: 12,
    fontWeight: 'normal',
    color: '#6E6E6E',
  },
  description: {
    fontSize: 14,
    color: '#6E6E6E',
  },
  joinButton: {
    backgroundColor: '#007BFF',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 5,
    alignSelf: 'flex-start',
  },
  joinButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
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

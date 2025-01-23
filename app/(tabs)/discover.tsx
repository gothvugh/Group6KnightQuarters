import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ScrollView, TextInput} from 'react-native';
import KQLogo from '@/components/KQLogo';
import NavBar from'@/components/NavBar';

export default function DiscoverScreen() {
  const communities = [
    'Psychology',
    'Nursing',
    'Engineering',
    'Poli Sci',
    'Digital Media',
    'Comp Sci',
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
      <Text> I will get this to render later </Text>
      <FlatList
        data={communities}
        horizontal
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.communityChip}>
            <Text style={styles.communityText}>{item}</Text>
          </TouchableOpacity>
        )}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.communityList}
      />


      {/* Based on Groups Section */}
      <Text style={styles.sectionTitle}>Based on Groups you might like</Text>
      <ScrollView style={styles.groupsSection}>
        {[
          {
            name: 'ROTC',
            members: '3.6k members',
            description:
              'Army ROTC is a program designed to develop individual leadership skills for either military or civilian careers.',
          },
          {
            name: 'KQR',
            members: '5.8k members',
            description:
              'KQR is Knights Experiential Robotics, which was a club established to introduce Knights to modern real-world robotics.',
          },
        ].map((group, index) => (
          <View key={index} style={styles.groupCard}>
            <View style={styles.groupInfo}>
              <Text style={styles.groupName}>{group.name}</Text>
              <Text style={styles.groupMembers}>{group.members}</Text>
              <Text style={styles.groupDescription}>{group.description}</Text>
            </View>
            <TouchableOpacity style={styles.joinButton}>
              <Text style={styles.joinButtonText}>Join</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {/* Trending Section */}
      <Text style={styles.sectionTitle}>Trending</Text>
      <View style={styles.trendingCard}>
        <Text style={styles.trendingUser}>Huey Magoos</Text>
        <Text style={styles.trendingText}>
          Hey Everybody, I'm looking for places near UCF main campus to get food that won't break the bank. I usually eat at the student union but I'm getting sick of eating Huey Magoos all the time!
        </Text>
        <Text style={styles.trendingComments}>Comments (10)</Text>
      </View>

      <NavBar path="app/(tabs)/discover.tsx"/>
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
  communityScroll: {
    flex: 1,
    flexDirection: 'row',
    height: 50,
  },
  communityChip: {
    backgroundColor: '#FFD700',
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
  },
  communityText: {
    fontSize: 14,
    color: '#FFFFFF',
  },
  communityList: {
    flexDirection: 'row',
    paddingVertical: 5,
  },
  groupsSection: {
    marginVertical: 10,
  },
  groupCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#F7F7F7',
    borderRadius: 10,
    marginBottom: 10,
  },
  groupInfo: {
    flex: 1,
    marginRight: 10,
  },
  groupName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  groupMembers: {
    fontSize: 12,
    color: '#A0A0A0',
  },
  groupDescription: {
    fontSize: 14,
    marginTop: 5,
  },
  joinButton: {
    backgroundColor: '#FFD700',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  joinButtonText: {
    fontSize: 14,
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

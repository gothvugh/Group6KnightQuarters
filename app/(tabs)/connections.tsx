import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, TextInput } from 'react-native';
import KQLogo from '@/components/KQLogo';
import { ScrollView } from 'react-native-gesture-handler';

const posts = [
  {
    id: '1',
    author: 'Huey Magoos',
    username: 'User1234',
    content:
      "Hey everybody! I'm looking for places near UCF main campus to get food that won't break the bank. I usually eat at the student union but I'm getting sick of eating Huey Magoo's all the time.",
    comments: 22,
    time: '5 hrs ago',
  },
  {
    id: '2',
    author: 'Am I Cooked?',
    username: 'RSO123',
    content: 'Ice Cream Social\nMay 25th | 8:00pm | SU218C',
    image: require('@/assets/images/ice-cream-event.png'),
    comments: 11,
    time: '10 hrs ago',
  },
  {
    id: '3',
    author: 'Am I Cooked?',
    username: 'User1234',
    content:
      "Hey, Knights! 👋 I'm looking for a place to study on campus that's quiet but not totally dead—somewhere I can zone in on work but not feel like I'm the only one there at midnight lol.",
    comments: 16,
    time: '10 hrs ago',
  },
];

export default function ConnectionsScreen() {
  // Check data structure with console.log
  console.log('Posts Data:', posts);

  const renderPost = ({ item }) => {
    // Log item to confirm correct data
    console.log('Rendering Post:', item);

    return (
      <View style={styles.postContainer}>
        <Text style={styles.author}>{item.author}</Text>
        <Text style={styles.username}>@{item.username}</Text>
        {item.image && <Image source={item.image} style={styles.postImage} />}
        <Text style={styles.content}>{item.content}</Text>
        <Text style={styles.footer}>
          {item.comments} Comments • {item.time}
        </Text>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <KQLogo path="app/(tabs)/discover.tsx"/>
      {/* Header Section */}
      <View style={styles.header}>
          <View style={styles.tabContainer}>
              <Text style={[styles.tab, styles.activeTab]}>Connections</Text>
              <Text style={styles.tab}>Discover</Text>
            </View>
      </View>
      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={(item) => item.id} // Ensure each post has a unique id
        contentContainerStyle={styles.listContainer}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
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
  listContainer: {
    padding: 10,
  },
  postContainer: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  author: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  username: {
    fontSize: 14,
    color: '#888',
    marginBottom: 10,
  },
  postImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginVertical: 10,
  },
  content: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 10,
  },
  footer: {
    fontSize: 12,
    color: '#888',
  },
});

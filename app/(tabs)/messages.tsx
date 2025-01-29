import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import KQLogo from '@/components/KQLogo';

const messages = [
  {
    id: '1',
    name: 'Alex Jordan',
    time: '4 hrs ago',
    message: "Hey! Long time no see 😄 How’ve you been?",
    avatar: require('@/assets/images/avatar.png'), // Replace with the correct avatar path
    unread: false,
  },
  {
    id: '2',
    name: 'Sam Kim',
    time: '5 hrs ago',
    message: 'Hey! I just finished that book you recommended',
    avatar: require('@/assets/images/avatar.png'),
    unread: false,
  },
  {
    id: '3',
    name: 'Ben Tara',
    time: '8 hrs ago',
    message: '😂 This is literally you every Monday morning.',
    avatar: require('@/assets/images/avatar.png'),
    unread: true,
  },
  {
    id: '4',
    name: 'Chris Pat',
    time: '2 hrs ago',
    message: 'No way, that’s amazing! I’m so happy for you. When do you start?',
    avatar: require('@/assets/images/avatar.png'),
    unread: false,
  },
  {
    id: '5',
    name: 'Sarah Johnson',
    time: '2 hrs ago',
    message: 'Yo, wanna hop on Minecraft tonight?',
    avatar: require('@/assets/images/avatar.png'),
    unread: false,
  },
];

export default function MessagesScreen() {
  const router = useRouter();

  const renderMessage = ({ item }) => (
    <TouchableOpacity
      style={styles.messageContainer}
      onPress={() => router.push('/chat')} // Navigate to the Chat screen
    >
      <Image source={item.avatar} style={styles.avatar} />
      <View style={styles.messageInfo}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.time}>{item.time}</Text>
        <Text style={styles.message}>{item.message}</Text>
      </View>
      {item.unread && <View style={styles.unreadIndicator} />}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <KQLogo />
      <Text style={styles.title}>Direct Messages</Text>
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFBEA',
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  messageInfo: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  time: {
    fontSize: 12,
    color: '#A0A0A0',
    marginBottom: 5,
  },
  message: {
    fontSize: 14,
    color: '#000',
  },
  unreadIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#007BFF',
  },
});

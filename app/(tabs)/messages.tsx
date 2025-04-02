import React, { useEffect, useState } from 'react';
import { 
  View, Text, StyleSheet, FlatList, TouchableOpacity, Image, 
  ActivityIndicator
} from 'react-native';
import { useRouter } from 'expo-router';
import axios from 'axios';
import KQLogo from '@/components/KQLogo';

const API_URL = "https://www.knightquarters.com/api/messages/get_messages.php";

export default function MessagesScreen() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(API_URL);
        let realMessages = response.data;

        // Faux messages for UI testing
        const fauxMessages = [
          {
            id: 'f1',
            sender_name: 'Alex Jordan',
            content: "Hey! Long time no see 😄 How’ve you been?",
            sender_avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
            created_at: new Date().toISOString(),
          },
          {
            id: 'f2',
            sender_name: 'Sam Kim',
            content: 'Hey! I just finished that book you recommended!',
            sender_avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
            created_at: new Date().toISOString(),
          },
        ];

        if (realMessages.length < 5) {
          realMessages = [...realMessages, ...fauxMessages];
        }

        setMessages(realMessages);
      } catch (error) {
        console.error("Error fetching messages:", error);
        setMessages(fauxMessages);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  const handlePressMessage = (item) => {
    router.push({
      pathname: '/screens/chat',
      params: {
        sender_name: item.sender_name,
        sender_avatar: item.sender_avatar
      }
    });
  };

  const renderMessage = ({ item }) => (
    <TouchableOpacity
      style={styles.messageContainer}
      onPress={() => handlePressMessage(item)}
    >
      <Image source={{ uri: item.sender_avatar }} style={styles.avatar} />
      <View style={styles.messageInfo}>
        <Text style={styles.name}>{item.sender_name}</Text>
        <Text style={styles.time}>{new Date(item.created_at).toLocaleTimeString()}</Text>
        <Text style={styles.content}>{item.content}</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#007BFF" style={{ flex: 1, justifyContent: 'center' }} />;
  }

  return (
    <View style={styles.container}>
      <KQLogo path="app/(tabs)/messages.tsx" />
      <Text style={styles.title}>Direct Messages</Text>
      
      {/* "New Message" now navigates to chat screen with a new message state */}
      <TouchableOpacity 
        style={styles.newMessageButton} 
        onPress={() => router.push('/screens/chat?new=true')}
      >
        <Text style={styles.newMessageButtonText}>New Message</Text>
      </TouchableOpacity>

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
  content: {
    fontSize: 14,
    color: '#000',
  },
  newMessageButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  newMessageButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});


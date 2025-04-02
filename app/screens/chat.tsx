import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, Image, Picker } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import axios from 'axios';
import KQLogo from '@/components/KQLogo';

const API_USERS_URL = "https://www.knightquarters.com/api/get_users.php"; 

export default function ChatScreen() {
  const router = useRouter();
  const { sender_name, sender_avatar, new: isNew } = useLocalSearchParams();
  const [input, setInput] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');

  useEffect(() => {
    if (isNew) {
      axios.get(API_USERS_URL)
        .then(response => setUsers(response.data))
        .catch(error => console.error("Error fetching users:", error));
    } else {
      setChatMessages([
        { id: '1', sender: sender_name, text: "Hey! Long time no see 😄", isUser: false },
        { id: '2', sender: 'You', text: "Heyy I’ve been doing good!", isUser: true },
      ]);
    }
  }, [isNew]);

  const sendMessage = () => {
    if (!input.trim()) return;

    const newMessage = { id: `${chatMessages.length + 1}`, sender: 'You', text: input, isUser: true };
    setChatMessages([...chatMessages, newMessage]);
    setInput('');

    if (isNew && selectedUser) {
      router.push({ pathname: '/screens/chat', params: { sender_name: selectedUser.name, sender_avatar: selectedUser.avatar } });
    }
  };

  return (
    <View style={styles.container}>
      <KQLogo path="app/screens/chat.tsx"  />
      {isNew ? (
        <>
          <Text style={styles.header}>Select a User</Text>
          <Picker
            selectedValue={selectedUser}
            onValueChange={(itemValue) => {
              const user = users.find(user => user.id === itemValue);
              setSelectedUser(user); // Set the entire user object
            }}
          >
            {users.map(user => (
              <Picker.Item key={user.id} label={user.name} value={user.id} />
            ))}
          </Picker>
        </>
      ) : (
        <Text style={styles.header}>{sender_name}</Text>
      )}

      <FlatList
        data={chatMessages}
        renderItem={({ item }) => (
          <View style={[styles.messageContainer, item.isUser ? styles.userMessage : styles.otherMessage]}>
            {!item.isUser && <Image source={{ uri: sender_avatar }} style={styles.avatar} />}
            <Text style={styles.messageText}>{item.text}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messageList}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          value={input}
          onChangeText={setInput}
          onSubmitEditing={sendMessage}
        />
        <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 20, paddingTop: 50 },
  header: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginVertical: 20 },
  messageList: { paddingBottom: 20 },
  messageContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 15, maxWidth: '75%', alignSelf: 'flex-start', padding: 10, borderRadius: 10 },
  userMessage: { alignSelf: 'flex-end', backgroundColor: '#FFFBEA' },
  otherMessage: { backgroundColor: '#F7F7F7' },
  avatar: { width: 30, height: 30, borderRadius: 15, marginRight: 10 },
  messageText: { fontSize: 16, color: '#000' },
  inputContainer: { flexDirection: 'row', alignItems: 'center', padding: 10, borderTopWidth: 1, borderColor: '#ccc' },
  input: { flex: 1, padding: 10, fontSize: 16, borderWidth: 1, borderColor: '#ccc', borderRadius: 20 },
  sendButton: { backgroundColor: '#007BFF', padding: 10, borderRadius: 10, marginLeft: 10 },
  sendButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});

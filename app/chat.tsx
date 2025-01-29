import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, Image } from 'react-native';
import KQLogo from '@/components/KQLogo';

const messages = [
  { id: '1', sender: 'Alex', text: "Hey! Long time no see 😄 How’ve you been?", isUser: false },
  { id: '2', sender: 'You', text: "Heyy I’ve been doing good!", isUser: true },
];

export default function ChatScreen() {
  const [input, setInput] = useState('');
  const [chatMessages, setChatMessages] = useState(messages);

  const sendMessage = () => {
    if (input.trim()) {
      setChatMessages([
        ...chatMessages,
        { id: `${chatMessages.length + 1}`, sender: 'You', text: input, isUser: true },
      ]);
      setInput('');
    }
  };

  const renderMessage = ({ item }) => (
    <View
      style={[
        styles.messageContainer,
        item.isUser ? styles.userMessage : styles.otherMessage,
      ]}
    >
      {!item.isUser && (
        <Image source={require('@/assets/images/avatar.png')} style={styles.avatar} />
      )}
      <Text style={styles.messageText}>{item.text}</Text>
      {item.isUser && (
        <Image source={require('@/assets/images/avatar.png')} style={styles.avatar} />
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <KQLogo />
      <Text style={styles.header}>Alex Jordan</Text>
      <FlatList
        data={chatMessages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messageList}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="How are you?"
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
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  messageList: {
    paddingBottom: 20,
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    maxWidth: '75%',
    alignSelf: 'flex-start',
    padding: 10,
    borderRadius: 10,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#FFFBEA',
  },
  otherMessage: {
    backgroundColor: '#F7F7F7',
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginHorizontal: 10,
  },
  messageText: {
    fontSize: 14,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#e0e0e0',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: '#FFD700',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

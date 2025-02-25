import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState } from "react";
import { useRouter } from 'expo-router';
import axios from "axios";
import KQLogo from '@/components/KQLogo';

const API_URL = "http://localhost/api/login.php";; // Use your local IP

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError(""); // Clear previous errors

    if (!email.trim() || !password.trim()) {
      setError("Email and password are required.");
      return;
    }

    try {
      const response = await axios.post(API_URL, {
        email,
        password,
      }, {
        headers: { "Content-Type": "application/json" }
      });

      console.log("Response:", response.data);

      if (response.data.success) {
        console.log("User ID:", response.data.user_id);
        router.replace("/(tabs)/connections"); // Navigate to connections screen
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.error("Login Error:", error);
      setError("Login failed. Try again later.");
    }
  };

  return (
    <View style={styles.container}>
      <KQLogo path="app/auth/login.tsx" />
      <Text style={styles.welcome}>Login</Text>

      {/* Email Input */}
      <TextInput
        style={styles.input}
        placeholder="UCF Email"
        value={email}
        onChangeText={setEmail}
        placeholderTextColor="#999"
      />
      
      {/* Password Input */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        placeholderTextColor="#999"
        secureTextEntry
      />

      {/* Error Message */}
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      {/* Login Button */}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      {/* Navigate to Signup */}
      <Text style={styles.footerText}>
        Don't have an account?{' '}
        <Text style={styles.link} onPress={() => router.push('/auth/signup')}>
          Sign up here
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  welcome: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    padding: 15,
    marginVertical: 10,
    backgroundColor: '#f3f3f3',
    borderRadius: 8,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#FFC900',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footerText: {
    marginTop: 20,
    color: '#666',
  },
  link: {
    color: '#E9C46A',
    fontWeight: 'bold',
  },
});

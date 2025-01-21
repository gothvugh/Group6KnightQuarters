import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';

export default function TabOneScreen() {
  const router = useRouter();

  const handleLogin = () => {
    // Replace '/home' with the route to the authenticated user’s screen
    router.push('/connections'); // Navigate to the home screen (or another screen after successful login)
  };

  return (
    <View style={styles.container}>
      <Image source={require('@/assets/images/kq-logo.png')} style={styles.logo} />
      <Text style={styles.welcomeText}>Please Log In</Text>
      <TextInput style={styles.input} placeholder="UCF Email" />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry />
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>
      <Text style={styles.footerText}>
        Don’t have an account?{' '}
        <Text style={styles.linkText} onPress={() => router.push('/auth/signup')}>
          Register here
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    width: 150,
    height: 100,
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  loginButton: {
    backgroundColor: '#FFC72C',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 20,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footerText: {
    marginTop: 20,
    fontSize: 14,
  },
  linkText: {
    color: '#FFC72C',
    fontWeight: 'bold',
  },
});

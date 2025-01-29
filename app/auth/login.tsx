import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import KQLogo from '@/components/KQLogo';

export default function LoginScreen() {
  const router = useRouter();

  const handleLogin = () => {
    // Replace this with real authentication logic if needed
    router.replace('/connections'); // Navigate to the Connections tab
  };

  return (
    <View style={styles.container}>
      <KQLogo path="app/auth/login.tsx" />
      <Text style={styles.welcome}>Welcome</Text>

      <TextInput style={styles.input} placeholder="UCF Email" placeholderTextColor="#999" />
      <TextInput style={styles.input} placeholder="Password" placeholderTextColor="#999" secureTextEntry />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <Text style={styles.footerText}>
        Don’t have an account?{' '}
        <Text style={styles.link} onPress={() => router.push('/auth/signup')}>
          Register here
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
  button: {
    backgroundColor: '#E9C46A',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 8,
    marginTop: 20,
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

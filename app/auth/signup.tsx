import axios from "axios";
import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from 'expo-router';
import KQLogo from '@/components/KQLogo';

const API_URL = "https://www.knightquarters.com/api/register.php";

export default function SignupScreen() {
  const router = useRouter();
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Registers new user 
  const handleRegister = async () => {
    setError(""); // Clear previous errors

    // Validation for registration
    if (!first_name.trim() || !last_name.trim() || !email.trim() || !password.trim()) {
      setError("All fields are required.");
      return;
    }

    if (!email.endsWith("@ucf.edu")) {
      setError("Email must end in @ucf.edu");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    try {
      const response = await axios.post(API_URL, {
        first_name,
        last_name,
        email,
        password,
      }, {
        headers: { "Content-Type": "application/json" }
      });

      console.log("Response:", response.data);

      if (response.data.success) {
        router.replace('/auth/login');
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.error("Registration Error:", error);
      setError("Registration failed. Try again later.");
    }
  };

  return (
    <View style={styles.container}>
      <KQLogo path="app/auth/signup.tsx" />
      <TextInput style={styles.input} placeholder="First Name" value={first_name} onChangeText={setFirstName} />
      <TextInput style={styles.input} placeholder="Last Name" value={last_name} onChangeText={setLastName} />
      <TextInput style={styles.input} placeholder="UCF Email" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
     
     
      <Text style={styles.footerText}>
          Already have an account?{' '}
          <Text style={styles.link} onPress={() => router.push('/auth/login')}>
            Log in here
          </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: 
  { flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    paddingHorizontal: 20, 
    backgroundColor: '#fff' },
  input: 
  { width: '80%', 
    padding: 15, 
    marginVertical: 10, 
    backgroundColor: '#f3f3f3', 
    borderRadius: 8 },
  errorText: 
  { color: 'red', 
    fontSize: 16, 
    marginBottom: 10, 
    textAlign: 'center' },
  button: 
  { backgroundColor: '#FFC900', 
    paddingVertical: 15, 
    paddingHorizontal: 50, 
    borderRadius: 8, 
    marginTop: 10 },
  buttonText: 
  { color: '#fff', 
    fontSize: 18, 
    fontWeight: 'bold' },
    footerText: {
      marginTop: 20,
      color: '#666',
    },
    link: {
      color: '#E9C46A',
      fontWeight: 'bold',
    },
});


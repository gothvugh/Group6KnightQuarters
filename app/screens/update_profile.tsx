import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from "react-native";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import KQLogo from "@/components/KQLogo";
import axios from "axios";

const API_URL = "https://10.123.98.121/api/update_profile.php";

export default function ProfileSetupScreen() {
  const router = useRouter();
  const [avatar_url, setAvatar] = useState("");
  const [profile_bio, setBio] = useState("");
  const [major, setMajor] = useState("");
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Load user data from AsyncStorage 
    const loadUser = async () => {
      const userData = await AsyncStorage.getItem("user");
      if (userData) {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        setAvatar(parsedUser.avatar_url || ""); // Keep empty if null
        setBio(parsedUser.profile_bio || "");
        setMajor(parsedUser.major || "");
      }
    };

    loadUser();
  }, []);

  const handleProfileSetup = async () => {
    if (!user) return;

    try {
      const updatedData = {
        user_id: user.id,
        avatar_url: avatar_url.trim() || user.avatar_url, // Keep existing if empty
        profile_bio: profile_bio.trim() || user.profile_bio,
        major: major.trim() || user.major,
      };

      const response = await axios.post(API_URL, updatedData, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.data.success) {
        // Save profile data to AsyncStorage
        const updatedUser = { ...user, ...updatedData };
        await AsyncStorage.setItem("user", JSON.stringify(updatedUser));

        // Redirect to profile screen
        router.replace("/(tabs)/profile");
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.error("Profile Update Error:", error);
      setError("Failed to update profile. Try again.");
    }
  };

  return (
    <View style={styles.container}>
      <KQLogo path="app/screens/update_profile.tsx" />
      <Text style={styles.header}>Update Your Profile</Text>

      {/* Avatar URL Input */}
      <TextInput
        style={styles.input}
        placeholder="Avatar URL"
        value={avatar_url}
        onChangeText={setAvatar}
        placeholderTextColor="#999"
      />
      {/* Preview Image */}
      <Image source={{ uri: avatar_url || require('../../assets/images/avatar.png') }} style={styles.avatarPreview} />

      {/* Bio Input */}
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Write a short bio..."
        value={profile_bio}
        onChangeText={setBio}
        multiline
        placeholderTextColor="#999"
      />

      {/* Major Input */}
      <TextInput
        style={styles.input}
        placeholder="Your Major"
        value={major}
        onChangeText={setMajor}
        placeholderTextColor="#999"
      />

      {/* Error Message */}
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      {/* Save Profile Button */}
      <TouchableOpacity style={styles.button} onPress={handleProfileSetup}>
        <Text style={styles.buttonText}>Save Profile</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "80%",
    padding: 15,
    marginVertical: 10,
    backgroundColor: "#f3f3f3",
    borderRadius: 8,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  avatarPreview: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginVertical: 10,
  },
  errorText: {
    color: "red",
    fontSize: 16,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#FFC900",
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});


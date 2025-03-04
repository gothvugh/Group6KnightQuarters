import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import KQLogo from '@/components/KQLogo';

const API_URL = "http://localhost/api/"; // Replace with your actual local IP

export default function CreatePostScreen() {
  const router = useRouter();
  const [postContent, setPostContent] = useState("");
  const [selectedCommunity, setSelectedCommunity] = useState(null);
  const [userId, setUserId] = useState(null);
  const [error, setError] = useState(""); // State for displaying errors
  const [communities, setCommunities] = useState([]); // Store fetched communities
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    // Fetch user ID from AsyncStorage
    const loadUser = async () => {
      const userData = await AsyncStorage.getItem("user");
      if (userData) {
        const parsedUser = JSON.parse(userData);
        setUserId(parsedUser.id);
      }
    };

    // Fetch communities from the database
    const fetchCommunities = async () => {
      try {
        const response = await axios.get(`${API_URL}get_communities.php`);
        
        console.log("API Response:", response.data.communities); // Debugging

        if (response.data.success && Array.isArray(response.data.communities)) {
          setCommunities(response.data.communities); // Ensure communities is an array
        } else {
          setError("No communities found.");
        }
      } catch (error) {
        console.error("Error fetching communities:", error);
        setError("Failed to load communities.");
      } finally {
        setLoading(false);
      }
    };

    loadUser();
    fetchCommunities();
  }, []);

  // More Debugging
  useEffect(() => {
    console.log("Updated Communities:", communities);
  }, [communities]);

  const handlePost = async () => {
    setError(""); // Clear previous errors

    if (!postContent.trim()) {
      setError("Post content cannot be empty.");
      return;
    }

    if (!selectedCommunity) {
      setError("Please select a community before posting.");
      return;
    }

    if (!userId) {
      router.replace("/auth/login");
      return;
    }

    try {
      const response = await axios.post(`${API_URL}create_post.php`, {
        user_id: userId,
        content: postContent.trim(),
        community: selectedCommunity,
      });

      if (response.data.success) {
        setError(""); // Clear error message on success
        router.replace("/(tabs)/connections"); // Redirect to home after posting
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.error("Post Creation Error:", error);
      setError("Failed to create post. Try again.");
    }
  };

  return (
    <View style={styles.container}>
      <KQLogo path="app/(tabs)/create.tsx" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.cancelButton}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.postButton} onPress={handlePost}>
          <Text style={styles.postButtonText}>Post</Text>
        </TouchableOpacity>
      </View>

      {/* Post Input Section */}
      <View style={styles.postContainer}>
        <Ionicons name="person-circle" size={24} color="gray" style={styles.icon} />
        <TextInput
          style={styles.textInput}
          placeholder="Write something..."
          placeholderTextColor="gray"
          multiline
          value={postContent}
          onChangeText={setPostContent}
        />
      </View>

      {/* Choose Community Section */}
      <View style={styles.listContainer}>
        <Text style={styles.sectionTitle}>Available Communities</Text>
        <View style={styles.itemContainer}>
          {Array.isArray(communities) && communities.length > 0 ? (
            communities.map((community) => (
              <TouchableOpacity key={community.id} style={styles.item}>
                  <Text style={styles.itemText}>{community.name}</Text>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={styles.errorText}>No communities available.</Text>
          )}
        </View>
      </View>

      {/* Error Message */}
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 40,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  cancelButton: {
    fontSize: 16,
    color: "gray",
  },
  postButton: {
    backgroundColor: "#FFC107",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  postButtonText: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },
  postContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  icon: {
    marginRight: 8,
  },
  textInput: {
    backgroundColor: "#FFF8E1",
    flex: 1,
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    textAlignVertical: "top",
    minHeight: 100,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    textAlign: "center",
  },
  listContainer: {
    flexDirection: "column",
    flexWrap: "wrap",
    padding: 20,
    justifyContent: "center",
  },
  itemContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  item: {
    backgroundColor: '#FFD700',
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 10,
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  itemText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  errorText: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
    marginTop: 10,
  },
});


import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, FlatList
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import KQLogo from "@/components/KQLogo";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "http://localhost/api/";

export default function SearchScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [expandedPostId, setExpandedPostId] = useState(null);
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState("");
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const storedUser = await AsyncStorage.getItem("user");
      if (storedUser) {
        setUserId(JSON.parse(storedUser).id);
      }
    };
    fetchUser();
  }, []);

  const fetchComments = async (postId) => {
    try {
      const response = await axios.get(`${API_URL}/comments.php?post_id=${postId}`);
      setComments((prev) => ({
        ...prev,
        [postId]: response.data.comments ? response.data.comments : [],
      }));
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setError("No results. Try a different search.");
      setSearchResults([]);
      return;
    }

    setError("");

    try {
      const response = await axios.get(`${API_URL}/get_search.php?query=${encodeURIComponent(searchQuery)}`);
      if (response.data.success) {
        setSearchResults(response.data.posts);
      } else {
        setError("No matching posts found.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Please try again.");
    }
  };

  const toggleComments = (postId) => {
    setExpandedPostId(expandedPostId === postId ? null : postId);
    fetchComments(postId);
  };

  const handleComment = async (postId) => {
    if (!newComment.trim()) {
      setError("Comment cannot be empty.");
      return;
    }

    console.log("New Comment:", newComment);
    setError("");

    try {
      const response = await axios.post(`${API_URL}/comments.php`, {
        user_id: userId,
        post_id: postId,
        content: newComment.trim(),
      });

      if (response.data.success) {
        setNewComment(""); // Clear input after successful post
        fetchComments(postId);
      } else {
        setError("Failed to add comment.");
      }
    } catch (error) {
      console.error("Error adding comment:", error);
      setError("Error adding comment. Try again.");
    }
  };

  return (
    <View style={styles.container}>
      <KQLogo path="app/(tabs)/search.tsx" />

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search"
          style={styles.searchInput}
          onChangeText={setSearchQuery}
          value={searchQuery}
          placeholderTextColor="#A0A0A0"
        />
        <TouchableOpacity onPress={handleSearch}>
          <Ionicons name="search" size={20} color="#A0A0A0" style={styles.searchIcon} />
        </TouchableOpacity>
      </View>

      {/* Error Message */}
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      {/* Search Results */}
      <FlatList
        data={searchResults}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.postContainer}>
            {/* Header: Avatar & Author Info */}
            <View style={styles.headerContainer}>
              <Image 
                source={{ uri: item.avatar_url || "https://via.placeholder.com/50" }} 
                style={styles.avatar} 
              />
              <View>
                <Text style={styles.author}>{item.first_name} {item.last_name}</Text>
                <Text style={styles.username}>{item.community_name}</Text>
              </View>
            </View>

            {/* Post Content */}
            <Text style={styles.content}>{item.content}</Text>

            {/* Comments Toggle */}
            <TouchableOpacity onPress={() => toggleComments(item.id)}>
              <Text style={styles.commentsToggle}>
                Comments ({comments?.[item.id]?.length || 0})
              </Text>
            </TouchableOpacity>

            {/* Comments Section */}
            {expandedPostId === item.id && (
              <View style={styles.commentsContainer}>
                {comments?.[item.id]?.length > 0 ? (
                  comments[item.id].map((comment) => (
                    <View key={comment.comment_id} style={styles.comment}>
                      <Image 
                        source={{ uri: comment.avatar_url || "https://via.placeholder.com/40" }} 
                        style={styles.commentAvatar}
                      />
                      <View>
                        <Text style={styles.commentAuthor}>
                          {comment.first_name} {comment.last_name}
                        </Text>
                        <Text style={styles.commentText}>{comment.content}</Text>
                        <Text style={styles.commentTime}>{new Date(comment.created_at).toLocaleString()}</Text>
                      </View>
                    </View>
                  ))
                ) : (
                  <Text style={styles.noCommentsText}>No comments yet.</Text>
                )}

                {/* Comment Input */}
                <View style={styles.commentInputContainer}>
                  <TextInput
                    placeholder="Add a comment..."
                    value={newComment}
                    onChangeText={setNewComment}
                    style={styles.commentInput}
                  />
                  <TouchableOpacity onPress={() => item.id && handleComment(item.id)} style={styles.commentButton}>
                    <Text style={styles.commentButtonText}>Comment</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    paddingHorizontal: 10,
    marginBottom: 20,
    height: 40,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#000",
  },
  searchIcon: {
    marginLeft: 5,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  postContainer: {
    backgroundColor: "#FFF8E1",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  author: {
    fontSize: 16,
    fontWeight: "bold",
  },
  username: {
    fontSize: 14,
    color: "#888",
  },
  content: {
    fontSize: 16,
    marginTop: 10,
  },
  commentsToggle: {
    color: "#007BFF",
    marginTop: 10,
    fontSize: 14,
  },
  commentsContainer: {
    backgroundColor: "#F9F9F9", // Light background to separate comments
    padding: 12,
    borderRadius: 10,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#ddd", // Subtle border for definition
  },
  comment: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  commentAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  commentContent: {
    flex: 1, // Ensures text doesn't overflow
  },
  commentAuthor: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  commentText: {
    fontSize: 14,
    color: "#555",
    marginTop: 2,
  },
  commentTime: {
    fontSize: 12,
    color: "#888",
    marginTop: 3,
  },
  noCommentsText: {
    textAlign: "center",
    fontSize: 14,
    color: "#666",
    marginVertical: 10,
  },
  commentInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
  },
  commentInput: {
    flex: 1,
    padding: 10,
    fontSize: 14,
    color: "#333",
    width: "90%",
  },
  commentButton: {
    padding: 10,
    fontSize: 14,
    color: "#333",
  },
  commentButtonText: {
    fontSize: 12,
  },
});


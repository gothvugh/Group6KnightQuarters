import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import KQLogo from '@/components/KQLogo';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "https://10.123.98.121/api";

export default function ConnectionsScreen() {
  const [activeTab, setActiveTab] = useState("Connections"); // Toggle Tab
  const [posts, setPosts] = useState([]); // Turn post into an array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [userId, setUserId] = useState(null);
  const [expandedPostId, setExpandedPostId] = useState(null);
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState("");
  const [communities, setCommunities] = useState([]);

  useEffect(() => {
    fetchUser();
    fetchPosts();
    fetchCommunities();
  }, []);

  // Get user ID from AsyncStorage
  const fetchUser = async () => {
    const storedUser = await AsyncStorage.getItem("user");
    if (storedUser) {
      setUserId(JSON.parse(storedUser).id);
    }
  };

  // Get posts from database
  const fetchPosts = async () => {
    try {
      const response = await axios.get(`${API_URL}/get_all_posts.php`);
      console.log("Fetched Posts:", response.data);

      if (response.data.success) {
        setPosts(response.data.posts);
      } else {
        setError("No posts found.");
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
      setError("Failed to load posts.");
    } finally {
      setLoading(false);
    }
  };

  // Get a post's comments based on post id
  const fetchComments = async (postId) => {
    try {
      const response = await axios.get(`${API_URL}/comments.php?post_id=${postId}`);
      setComments((prev) => ({
        ...prev,
        [postId]: response.data.comments || [],
      }));
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  // Get communities
  const fetchCommunities = async () => {
    try {
      const response = await axios.get(`${API_URL}/get_communities.php`);
      console.log("Fetched Communities:", response.data);

      if (response.data.success) {
        setCommunities(response.data.communities);
      } else {
        setError("No communities found.");
      }
    } catch (error) {
      console.error("Error fetching communities:", error);
      setError("Failed to load communities.");
    }
  };

  // Post a new comment
  const handleComment = async (postId) => {
    if (!newComment.trim()) {
      setError("Comment cannot be empty.");
      return;
    }

    setError("");

    try {
      const response = await axios.post(`${API_URL}/comments.php`, {
        user_id: userId,
        post_id: postId,
        content: newComment.trim(),
      });

      if (response.data.success) {
        setNewComment("");
        fetchComments(postId);
      } else {
        setError("Failed to add comment.");
        console.log("Submitting comment:", {
          creator_id: userId,
          post_id: postId,
          content: newComment.trim(),
        });
      }
    } catch (error) {
      console.error("Error adding comment:", error);
      setError("Error adding comment. Try again.");
    }
  };

  // Toggle comments section
  const toggleComments = (postId) => {
    setExpandedPostId(expandedPostId === postId ? null : postId);
    fetchComments(postId);
  };

  const renderButtons = () => (
    <ScrollView style={discoverStyles.groupScroll} horizontal={true} showsHorizontalScrollIndicator={true}>
      <View style={discoverStyles.itemContainer}>
        {Array.isArray(communities) && communities.length > 0 ? (
          communities.map((community) => (
              <TouchableOpacity
                key={community.id}
                style={discoverStyles.item}>
                <Text style={discoverStyles.itemText}>
                    {community.name}
                </Text>
              </TouchableOpacity>
            ))
            ) : (
              <Text style={discoverStyles.error}>No communities available.</Text>
         )}
      </View>
    </ScrollView>
  );

  const renderCommunities = () => (
    <View style={discoverStyles.groupContainer}>
    <ScrollView style={discoverStyles.groupScroll} nestedScrollEnabled={true}>
      {posts.map((item) => (
        <View key={item.id} style={discoverStyles.groupCard}>
          <View>
            <View style={discoverStyles.groupHeader} >
              <Text style={discoverStyles.groupName}>{item.community_name}</Text>
              <TouchableOpacity style={discoverStyles.groupButton}> 
                <Text style={discoverStyles.groupText}> Join </Text>
              </TouchableOpacity>
            </View>
          </View>
          <Text style={discoverStyles.content}> {item.description} </Text>
          <Text style={discoverStyles.content}> This is our group and you can join and be apart of it because I know that's what you want to do. </Text>
        </View>
      ))}
    </ScrollView>
  </View>
);

const renderPosts = () => (
  <FlatList
      data={posts}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.postContainer}>
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

          <Text style={styles.content}>{item.content}</Text>

          <TouchableOpacity onPress={() => toggleComments(item.id)}>
            <Text style={styles.commentsToggle}>
              Comments ({comments?.[item.id]?.length || 0})
            </Text>
          </TouchableOpacity>
        
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

              {error ? <Text style={discoverStyles.error}>{error}</Text> : null}        

              <View style={styles.commentInputContainer}>
                <TextInput
                  placeholder="Add a comment..."
                  value={newComment}
                  onChangeText={setNewComment}
                  style={styles.commentInput}
                />
                <TouchableOpacity onPress={() => handleComment(item.id)} style={styles.commentButton}>
                  <Text style={styles.commentButtonText}>Comment</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          <Text style={styles.footer}>Posted on: {new Date(item.created_at).toDateString()}</Text>
        </View>
      )}
    />
); 

  const renderConnections = () => (
    <View>
      {renderPosts()}
    </View>
  );

  const renderDiscover = () => (
    <View style={discoverStyles.container}>
      <Text style={discoverStyles.sectionTitle}>Explore Communities</Text>
      {renderButtons()}

      <Text style={discoverStyles.sectionTitle}>Groups You Might Like</Text>
      {renderCommunities()}

      <Text style={discoverStyles.sectionTitle}> Trending Posts </Text>
      {renderPosts()}

      {error ? <Text style={discoverStyles.error}>{error}</Text> : null}
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <KQLogo path="app/(tabs)/connections.tsx" />
      <View style={styles.tabContainer}>
        <TouchableOpacity onPress={() => setActiveTab("Connections")}>
          <Text style={[styles.tab, activeTab === "Connections" && styles.activeTab]}>Connections</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab("Discover")}>
          <Text style={[styles.tab, activeTab === "Discover" && styles.activeTab]}>Discover</Text>
        </TouchableOpacity>
      </View>
      {activeTab === "Connections" ? renderConnections() : renderDiscover()}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  tab: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#555",
  },
  activeTab: {
    color: "#000",
    borderBottomWidth: 2,
    borderBottomColor: "#000",
  },

  // Styling for Posts
  postContainer: {
    backgroundColor: "#FFF8E1",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
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

  // Styling for Comments 
  commentsToggle: {
    color: "#007BFF",
    marginTop: 10,
    fontSize: 14,
  },
  commentsContainer: {
    backgroundColor: "#F9F9F9",
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#ddd", 
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

const discoverStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    textAlign: "left",
  },

  // Styling for Community Buttons 
  communityContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  communityButton: {
    backgroundColor: "#FFD700",
    borderRadius: 15,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 10,
    marginBottom: 10,
    alignSelf: "flex-start",
  },
  communityText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
  },

  // Styling for Community Groups
  groupContainer: {
    width: "100%", 
    height: 150, // Height must be fixed
  },
  groupScroll: {
    flexGrow: 1, // allows scrolling  to work inside fixed height
  },
  groupCard: {
    borderRadius: 20,
    borderColor: "black",
    borderWidth: 1,
    padding: 15,
    marginBottom: 10,
  },
  groupHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  groupName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  groupButton: {
    backgroundColor: "blue",
    borderRadius: 5,
    width: 50,
    height: 25,
  },
  groupText: {
    fontSize: 14,
    fontWeight: 500,
    color: "#fff",
    textAlign: "center",
  },
  
  // Styling for Posts
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
  content: {
    fontSize: 16,
    marginTop: 10,
  },
  footer: {
    fontSize: 12,
    color: "#888",
    marginTop: 10,
  },
  
  // Styling for Buttons 
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
  selectedItem: {
    backgroundColor: "#FF8C00", // Highlight selected button
  },
  itemText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  selectedItemText: {
    color: "#FFF", // Change text color when selected
  },
  selectedText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#555",
    textAlign: "center",
    marginTop: 10,
  },
  error: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
    marginTop: 10,
  },
});

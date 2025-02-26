import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const posts = [
  {
    id: "1",
    author: "Huey Magoos",
    username: "User1234",
    content:
      "I'm thinking of joining ROTC but I'm scared that I won’t be able to keep up with the schedule. Does anyone have any tips or advice for how to improve my discipline?",
    time: "Newest",
    comments: 2,
  },
  {
    id: "2",
    author: "Am I Cooked?",
    username: "RSO123",
    content: "Looking forward to meeting everyone at next week's event!",
    time: "5 hrs ago",
    comments: 0,
  },
];

export default function ROTCCommunityPage() {
  const renderPost = ({ item }) => (
    <View style={styles.postContainer}>
      <View style={styles.postHeader}>
        <Image
          source={require("@/assets/images/avatar.png")}
          style={styles.avatar}
        />
        <View style={styles.postInfo}>
          <Text style={styles.author}>{item.author}</Text>
          <Text style={styles.username}>{item.username}</Text>
        </View>
        <Text style={styles.time}>{item.time}</Text>
      </View>
      <Text style={styles.content}>{item.content}</Text>
      <View style={styles.postFooter}>
        <Text style={styles.comments}>Comments ({item.comments})</Text>
        <Ionicons name="bookmark-outline" size={20} color="gray" />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="arrow-back" size={24} color="black" />
        <Text style={styles.title}>ROTC</Text>
      </View>

      {/* Members Section */}
      <View style={styles.membersContainer}>
        <Text style={styles.membersCount}>5.4k Members</Text>
        <TouchableOpacity style={styles.joinedButton}>
          <Text style={styles.joinedButtonText}>Joined</Text>
        </TouchableOpacity>
      </View>

      {/* Image Section */}
      <Image
        source={require("@/assets/images/rotc-building.png")}
        style={styles.communityImage}
      />

      {/* Posts Section */}
      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 10,
  },
  membersContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  membersCount: {
    fontSize: 16,
    color: "#888",
  },
  joinedButton: {
    backgroundColor: "#E0E0E0",
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 20,
  },
  joinedButtonText: {
    fontSize: 14,
    color: "#000",
  },
  communityImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  postContainer: {
    backgroundColor: "#FFFBEA",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  postInfo: {
    flex: 1,
  },
  author: {
    fontSize: 16,
    fontWeight: "bold",
  },
  username: {
    fontSize: 14,
    color: "#888",
  },
  time: {
    fontSize: 12,
    color: "#888",
  },
  content: {
    fontSize: 14,
    marginBottom: 10,
  },
  postFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  comments: {
    fontSize: 12,
    color: "#888",
  },
});

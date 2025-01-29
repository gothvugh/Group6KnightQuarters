import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router"; // Import useRouter for navigation
import KQLogo from "@/components/KQLogo";

const data = {
  posts: [
    {
      id: "1",
      author: "Huey Magoos",
      username: "User1234",
      content: "Gonna start a club for Huey Magoo's competitive eating. WHO'S DOWN???????",
      time: "5 hrs ago",
      comments: 22,
    },
    {
      id: "2",
      author: "Am I Cooked?",
      username: "RSO123",
      content: "Ice Cream Social\nMay 25th | 8:00pm | SU218C",
      image: require("@/assets/images/ice-cream-event.png"),
      time: "10 hrs ago",
      comments: 11,
    },
  ],
  communities: [
    {
      id: "1",
      name: "ROTC",
      members: "5.4k members",
      description: "Army ROTC is a program designed to develop individual leadership skills.",
    },
  ],
};

export default function UCFClubsScreen() {
  const [activeTab, setActiveTab] = useState("Posts");
  const router = useRouter(); // Initialize router for navigation

  const renderPost = ({ item }) => (
    <View style={styles.postContainer}>
      <Text style={styles.author}>{item.author}</Text>
      <Text style={styles.username}>@{item.username}</Text>
      {item.image && <Image source={item.image} style={styles.postImage} />}
      <Text style={styles.content}>{item.content}</Text>
      <Text style={styles.footer}>
        {item.comments} Comments • {item.time}
      </Text>
    </View>
  );

  const renderCommunity = ({ item }) => (
    <TouchableOpacity
      onPress={() => router.push("/rotc")} // Navigate to the ROTC page
      style={styles.communityContainer}
    >
      <Text style={styles.communityName}>{item.name}</Text>
      <Text style={styles.members}>{item.members}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <TouchableOpacity style={styles.joinButton}>
        <Text style={styles.joinButtonText}>Join</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <KQLogo path="app/ucfClubs.tsx" />
        <Text style={styles.title}>UCF Clubs</Text>
      </View>
      <View style={styles.searchContainer}>
          <TextInput
              placeholder="Search"
              style={styles.searchInput}
              placeholderTextColor="#A0A0A0"
            />
          <Ionicons name="search" size={20} color="#A0A0A0" />
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity onPress={() => setActiveTab("Posts")}>
          <Text style={[styles.tab, activeTab === "Posts" && styles.activeTab]}>
            Posts
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab("Communities")}>
          <Text
            style={[styles.tab, activeTab === "Communities" && styles.activeTab]}
          >
            Communities
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      {activeTab === "Posts" ? (
        <FlatList
          data={data.posts}
          renderItem={renderPost}
          keyExtractor={(item) => item.id}
          //contentContainerStyle={styles.listContainer}
        />
      ) : (
        <FlatList
          data={data.communities}
          renderItem={renderCommunity}
          keyExtractor={(item) => item.id}
          //contentContainerStyle={styles.listContainer}
        />
      )}
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
  header: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
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
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  tab: {
    fontSize: 16,
    paddingBottom: 5,
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  activeTab: {
    fontWeight: "bold",
    borderBottomColor: "#FFD700",
  },
  postContainer: {
    backgroundColor: "#FFFBEA",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  postImage: {
    width: "100%",
    height: 150,
    borderRadius: 10,
    marginVertical: 10,
  },
  author: {
    fontSize: 16,
    fontWeight: "bold",
  },
  username: {
    fontSize: 14,
    color: "#888",
    marginBottom: 10,
  },
  content: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 10,
  },
  footer: {
    fontSize: 12,
    color: "#888",
  },
  communityContainer: {
    backgroundColor: "#FFFBEA",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  communityName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  members: {
    fontSize: 12,
    color: "#888",
    marginVertical: 5,
  },
  description: {
    fontSize: 14,
    color: "#000",
    marginBottom: 10,
  },
  joinButton: {
    backgroundColor: "#007BFF",
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignSelf: "flex-start",
  },
  joinButtonText: {
    color: "#fff",
    fontSize: 14,
  },
});

import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import KQLogo from "@/components/KQLogo";

const screenWidth = Dimensions.get("window").width;

export default function SearchScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Logo */}
      <KQLogo path="app/(tabs)/search.tsx" />

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search"
          style={styles.searchInput}
          placeholderTextColor="#A0A0A0"
        />
        <Ionicons name="search" size={20} color="#A0A0A0" style={styles.searchIcon} />
      </View>

      {/* Buttons */}
      <ScrollView contentContainerStyle={styles.content}>
        <TouchableOpacity
          onPress={() => router.push("/screens/Housing")}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Housing</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push("/screens/Clubs")}
          style={styles.button}
        >
          <Text style={styles.buttonText}>UCF Clubs</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Events</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>UCF Professors</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Communities</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Forums</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Off Campus</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/screens/faq")} style={styles.button} >
          <Text style={styles.buttonText}>FAQs</Text>
        </TouchableOpacity>
      </ScrollView>
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
  content: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  button: {
    backgroundColor: "#FFFBEA",
    borderRadius: 20,
    width: (screenWidth - 50) / 2, // Adjust button width
    paddingVertical: 30,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
    shadowOffset: { width: 0, height: 3 },
    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: "#000",
  },
});

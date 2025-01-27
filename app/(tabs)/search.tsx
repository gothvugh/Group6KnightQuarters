import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import KQLogo from '@/components/KQLogo';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <KQLogo path="app/(tabs)/discover.tsx"/>
      {/* Header with Logo and Search Bar */}
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="gray" style={styles.searchIcon} />
          <TextInput
            placeholder="Search"
            style={styles.searchInput}
            placeholderTextColor="gray"
          />
        </View>
      </View>

      {/* Main Content */}
      <ScrollView contentContainerStyle={styles.content}>
        {[
          "Housing",
          "UCF Clubs",
          "Events",
          "UCF Professors",
          "Communities",
          "Forums",
          "Off Campus",
          "FAQs",
        ].map((item, index) => (
          <TouchableOpacity key={index} style={styles.button}>
            <Text style={styles.buttonText}>{item}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
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
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  logo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFC107",
    marginRight: 16,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    flex: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  content: {
    flex: 1, // Ensures this area stretches to fill available space
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between", // Evenly distributes buttons
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  button: {
    backgroundColor: "#FFC904",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginVertical: 6,
    width: "45%",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },
});

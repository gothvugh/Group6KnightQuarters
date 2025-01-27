import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import KQLogo from '@/components/KQLogo';

export default function CreatePostScreen() {
  return (
    <View style={styles.container}>
      <KQLogo path="app/(tabs)/discover.tsx"/>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Text style={styles.cancelButton}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.postButton}>
          <Text style={styles.postButtonText}>Post</Text>
        </TouchableOpacity>
      </View>

      {/* Post Input Section */}
      <View style={styles.postContainer}>
        <Ionicons name="person-circle" size={24} color="gray" style={styles.icon} />
        <TextInput
          style={styles.textInput}
          placeholder="..."
          placeholderTextColor="gray"
          multiline
        />
      </View>
      <TouchableOpacity>
        <Text style={styles.saveDraft}>Save Draft</Text>
      </TouchableOpacity>

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
  logo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFC107",
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
  saveDraft: {
    textAlign: "right",
    color: "gray",
    fontSize: 14,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  toolbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#e0e0e0",
    marginBottom: 16,
  },
});

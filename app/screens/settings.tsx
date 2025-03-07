import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import KQLogo from '@/components/KQLogo';
import { useRouter } from 'expo-router';

export default function SettingsScreen() {
  const router = useRouter();
  const handleFAQ = () => {
    router.replace('/screens/faq');
  }
  const handleProfile = () => {
    router.replace('/screens/update_profile');
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <KQLogo path="app/Settings.tsx" />
      </View>
      
      <Text style={styles.title}>Settings</Text>
      
      {/* Settings List */}
      <TouchableOpacity style={styles.settingItem} onPress={handleProfile}>
        <Text style={styles.settingText}>Update Profile</Text>
        <Ionicons name="chevron-forward" size={20} color="black" />
      </TouchableOpacity>

      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Notifications</Text>
        <Text style={styles.settingOption}>ON/OFF</Text>
      </View>
      
      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Sound</Text>
        <Text style={styles.settingOption}>ON/OFF</Text>
      </View>
      
      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Password</Text>
        <Text style={styles.settingOption}>•••••</Text>
      </View>
      
      <TouchableOpacity style={styles.settingItem}>
        <Text style={styles.settingText}>Blocked</Text>
        <Ionicons name="chevron-forward" size={20} color="black" />
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.settingItem} onPress={handleFAQ}>
        <Text style={styles.settingText}>FAQ</Text>
        <Ionicons name="chevron-forward" size={20} color="black" />
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
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  logo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFC107",
    textAlign: "center",
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: "#e0e0e0",
  },
  settingText: {
    fontSize: 16,
  },
  settingOption: {
    fontSize: 16,
    color: "gray",
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 12,
    borderTopWidth: 1,
    borderColor: "#e0e0e0",
    backgroundColor: "#fff",
  },
});

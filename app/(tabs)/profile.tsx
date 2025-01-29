import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import KQLogo from '@/components/KQLogo';

export default function ProfileScreen() {
  const router = useRouter();

  const handleLogout = () => {
    // Clear any session or user data here if necessary
    router.replace('/auth/login'); // Navigate back to the login screen
  };

  return (
    <View style={styles.container}>
        <KQLogo />
      {/* Profile Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="settings-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* User Info */}
      <View style={styles.profileSection}>
        <Image source={require('../../assets/images/avatar.png')} style={styles.avatar} />
        <Text style={styles.name}>John Doe</Text>
        <Text style={styles.major}>Biology major</Text>
        <Text style={styles.bio}>
          I wonder how hard it’ll be to become a Rocket Scientist
        </Text>
      </View>

      {/* Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Following</Text>
          <Text style={styles.statNumber}>145</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Followers</Text>
          <Text style={styles.statNumber}>53</Text>
        </View>
      </View>

      {/* Posts */}
      <Text style={styles.sectionTitle}>My posts</Text>
      <Text style={styles.noPosts}>No Posts Yet.</Text>

      {/* Communities */}
      <Text style={styles.sectionTitle}>My Communities</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.communityContainer}>
        <TouchableOpacity style={styles.communityButton}>
          <Ionicons name="person-circle-outline" size={20} color="black" />
          <Text style={styles.communityText}>Rotc</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.communityButton}>
          <Ionicons name="person-circle-outline" size={20} color="black" />
          <Text style={styles.communityText}>Tennis</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
  },
  logo: {
    width: 50,
    height: 50,
  },
  profileSection: {
    alignItems: 'center',
    marginVertical: 10,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
  },
  major: {
    fontSize: 14,
    color: 'gray',
  },
  bio: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 5,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
  },
  statBox: {
    alignItems: 'center',
    marginHorizontal: 20,
  },
  statLabel: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  statNumber: {
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
  },
  noPosts: {
    fontSize: 14,
    color: 'gray',
    textAlign: 'center',
    marginVertical: 10,
  },
  communityContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  communityButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF9E7',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
  },
  communityText: {
    marginLeft: 5,
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#E9C46A',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

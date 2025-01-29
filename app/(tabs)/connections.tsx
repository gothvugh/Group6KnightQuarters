import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import KQLogo from '@/components/KQLogo';

const connectionsPosts = [
  {
    id: '1',
    author: 'Huey Magoos',
    username: 'User1234',
    avatar: require('@/assets/images/avatar.png'),
    content:
      "Hey everybody! I'm looking for places near UCF main campus to get food that won't break the bank. I usually eat at the student union but I'm getting sick of eating Huey Magoo's all the time.",
    comments: [
      { id: '1', username: 'RSO123', text: 'You can try Blaze or Bento. Both are great options!' },
      { id: '2', username: 'Ilovecats', text: "I'll be there too!" },
    ],
    time: '5 hrs ago',
  },
  {
    id: '2',
    author: 'Am I Cooked?',
    username: 'RSO123',
    avatar: require('@/assets/images/avatar.png'),
    content: 'Ice Cream Social\nMay 25th | 8:00pm | SU218C',
    image: require('@/assets/images/ice-cream-event.png'),
    comments: [{ id: '1', username: 'Ilovecats', text: "I'll be there!" }],
    time: '10 hrs ago',
  },
  {
    id: '3',
    author: 'Knights United',
    username: 'Knight123',
    avatar: require('@/assets/images/avatar.png'),
    content: 'Looking for study buddies for late-night cramming sessions!',
    comments: [],
    time: '3 hrs ago',
  },
];

const trendingPosts = [
  {
    id: '1',
    author: 'Huey Magoos',
    content:
      "Hey Everybody, I'm looking for places near UCF main campus to get food that won't break the bank. I usually eat at the student union but I'm getting sick of eating Huey Magoo's all the time!",
    comments: [
      { id: '1', username: 'RSO123', text: 'You can try Blaze or Bento. Great options!' },
      { id: '2', username: 'Foodie', text: 'Try Lazy Moon for pizza!' },
    ],
  },
];

const discoverCommunities = [
  'Psychology',
  'Nursing',
  'Engineering',
  'Political Science',
  'Digital Media',
  'Computer Science',
  'Biology',
  'Graphic Design',
  'Anthropology',
];

const discoverGroups = [
  {
    id: '1',
    name: 'ROTC',
    members: '3.6k members',
    description:
      'Army ROTC is a program designed to develop individual leadership skills for either military or civilian career.',
  },
  {
    id: '2',
    name: 'KQR',
    members: '5.8k members',
    description:
      'KQR is Knights Experiential Robotics, a club for introducing Knights to real-world robotics.',
  },
  {
    id: '3',
    author: 'Knights United',
    username: 'Knight123',
    avatar: require('@/assets/images/avatar.png'),
    content: 'Looking for study buddies for late-night cramming sessions!',
    comments: [],
    time: '3 hrs ago',
  },
];

export default function ConnectionsScreen() {
  const [activeTab, setActiveTab] = useState('Connections');
  const [expandedPostId, setExpandedPostId] = useState(null);
  const [expandedTrendingId, setExpandedTrendingId] = useState(null);

  const toggleComments = (postId) => {
    setExpandedPostId((prevId) => (prevId === postId ? null : postId));
  };

  const toggleTrendingComments = (postId) => {
    setExpandedTrendingId((prevId) => (prevId === postId ? null : postId));
  };

  const renderConnectionsPost = ({ item }) => (
    <View style={styles.postContainer}>
      <View style={styles.headerContainer}>
        <Image source={item.avatar} style={styles.avatar} />
        <View>
          <Text style={styles.author}>{item.author}</Text>
          <Text style={styles.username}>@{item.username}</Text>
        </View>
      </View>
      {item.image && <Image source={item.image} style={styles.postImage} />}
      <Text style={styles.content}>{item.content}</Text>
      <TouchableOpacity onPress={() => toggleComments(item.id)}>
        <Text style={styles.commentsToggle}>
          Comments ({item.comments.length})
        </Text>
      </TouchableOpacity>
      {expandedPostId === item.id && (
        <View style={styles.commentsContainer}>
          {item.comments.map((comment) => (
            <View key={comment.id} style={styles.comment}>
              <Text style={styles.commentUsername}>{comment.username}</Text>
              <Text style={styles.commentText}>{comment.text}</Text>
            </View>
          ))}
          <TextInput
            placeholder="Add a response"
            style={styles.commentInput}
            placeholderTextColor="#A0A0A0"
          />
        </View>
      )}
      <Text style={styles.footer}>{item.time}</Text>
    </View>
  );

  const renderDiscoverContent = () => (
    <ScrollView style={discoverStyles.container}>
      <Text style={discoverStyles.sectionTitle}>Explore Communities</Text>
      <View style={discoverStyles.listContainer}>
        {discoverCommunities.map((item, index) => (
          <TouchableOpacity key={index} style={discoverStyles.item}>
            <Text style={discoverStyles.itemText}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={discoverStyles.sectionTitle}>Based on Groups You Might Like</Text>
      {discoverGroups.map((group) => (
        <View key={group.id} style={discoverStyles.card}>
          <View style={discoverStyles.iconContainer}>
            <View style={discoverStyles.icon}>
              <Text style={discoverStyles.iconText}>👤</Text>
            </View>
          </View>
          <View style={discoverStyles.infoContainer}>
            <Text style={discoverStyles.groupName}>
              {group.name} <Text style={discoverStyles.members}>{group.members}</Text>
            </Text>
            <Text style={discoverStyles.description}>{group.description}</Text>
          </View>
          <TouchableOpacity style={discoverStyles.joinButton}>
            <Text style={discoverStyles.joinButtonText}>Join</Text>
          </TouchableOpacity>
        </View>
      ))}
      <Text style={discoverStyles.sectionTitle}>Trending</Text>
      {trendingPosts.map((post) => (
        <View key={post.id} style={discoverStyles.trendingCard}>
          <Text style={discoverStyles.trendingUser}>{post.author}</Text>
          <Text style={discoverStyles.trendingText}>{post.content}</Text>
          <TouchableOpacity onPress={() => toggleTrendingComments(post.id)}>
            <Text style={discoverStyles.trendingComments}>
              Comments ({post.comments.length})
            </Text>
          </TouchableOpacity>
          {expandedTrendingId === post.id && (
            <View style={styles.commentsContainer}>
              {post.comments.map((comment) => (
                <View key={comment.id} style={styles.comment}>
                  <Text style={styles.commentUsername}>{comment.username}</Text>
                  <Text style={styles.commentText}>{comment.text}</Text>
                </View>
              ))}
              <TextInput
                placeholder="Add a response"
                style={styles.commentInput}
                placeholderTextColor="#A0A0A0"
              />
            </View>
          )}
        </View>
      ))}
    </ScrollView>
  );

  return (
    <ScrollView style={styles.container}>
      <KQLogo path="app/(tabs)/connections.tsx" />
      <View style={styles.header}>
        <View style={styles.tabContainer}>
          <TouchableOpacity onPress={() => setActiveTab('Connections')}>
            <Text style={[styles.tab, activeTab === 'Connections' && styles.activeTab]}>Connections</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setActiveTab('Discover')}>
            <Text style={[styles.tab, activeTab === 'Discover' && styles.activeTab]}>Discover</Text>
          </TouchableOpacity>
        </View>
      </View>
      {activeTab === 'Connections' ? (
        <FlatList
          data={connectionsPosts}
          renderItem={renderConnectionsPost}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        renderDiscoverContent()
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  header: {
    alignItems: 'center',
    marginBottom: 10,
  },
  tabContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  tab: {
    fontSize: 16,
    marginHorizontal: 10,
    color: '#A0A0A0',
  },
  activeTab: {
    fontWeight: 'bold',
    color: '#000',
  },
  listContainer: {
    paddingBottom: 20,
  },
  postContainer: {
    backgroundColor: '#FFFBEA',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  author: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  username: {
    fontSize: 14,
    color: '#888',
  },
  postImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginVertical: 10,
  },
  content: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 10,
  },
  commentsToggle: {
    fontSize: 12,
    color: '#A0A0A0',
    marginBottom: 10,
  },
  commentsContainer: {
    padding: 10,
    backgroundColor: '#FFFBEA',
    borderRadius: 8,
  },
  comment: {
    marginBottom: 10,
  },
  commentUsername: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  commentText: {
    fontSize: 14,
    color: '#555',
  },
  commentInput: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
  },
  footer: {
    fontSize: 12,
    color: '#888',
  },
});

const discoverStyles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  listContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
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
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
  },
  iconContainer: {
    marginRight: 15,
  },
  icon: {
    backgroundColor: '#E0D6FF',
    borderRadius: 50,
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    fontSize: 20,
    color: '#7F56D9',
  },
  infoContainer: {
    flex: 1,
  },
  groupName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  members: {
    fontSize: 12,
    fontWeight: 'normal',
    color: '#6E6E6E',
  },
  description: {
    fontSize: 14,
    color: '#6E6E6E',
  },
  joinButton: {
    backgroundColor: '#007BFF',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 5,
    alignSelf: 'flex-start',
  },
  joinButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  trendingCard: {
    padding: 15,
    backgroundColor: '#FFFBEA',
    borderRadius: 10,
    marginBottom: 20,
  },
  trendingUser: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 5,
  },
  trendingText: {
    fontSize: 14,
    marginBottom: 10,
  },
  trendingComments: {
    fontSize: 12,
    color: '#A0A0A0',
  },
});

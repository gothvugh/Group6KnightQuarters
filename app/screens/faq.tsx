import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";

export default function FAQScreen() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>KQ</Text>
      </View>

      <Text style={styles.title}>FAQs</Text>
      
      {/* FAQ Content */}
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.faqItem}>
          <Text style={styles.question}>What is Knight Quarters?</Text>
          <Text style={styles.answer}>
            Knight Quarters is a discussion-based app specifically designed for UCF students.
            It allows students to connect, discuss topics, stay updated on campus news, discover RSOs,
            and engage with UCF’s online community in real time.
          </Text>
        </View>

        <View style={styles.faqItem}>
          <Text style={styles.question}>How is Knight Quarters different from other social apps?</Text>
          <Text style={styles.answer}>
            Unlike general social apps, Knight Quarters is exclusively for UCF.
            It verifies users with a UCF email and provides a space tailored for the UCF community.
          </Text>
        </View>

        <View style={styles.faqItem}>
          <Text style={styles.question}>How do I sign up for Knight Quarters?</Text>
          <Text style={styles.answer}>
            Download the app, open it, and sign up using your UCF email.
            Once you complete registration, you can create a username and password to access all features.
          </Text>
        </View>

        <View style={styles.faqItem}>
          <Text style={styles.question}>How do sub-communities work?</Text>
          <Text style={styles.answer}>
            Sub-communities are discussion spaces categorized by topics.
            Examples include “Academics” for coursework discussions and “RSOs” for student organizations.
          </Text>
        </View>

        <View style={styles.faqItem}>
          <Text style={styles.question}>Can I post anonymously?</Text>
          <Text style={styles.answer}>
            Yes, Knight Quarters offers an anonymous posting feature.
            Just choose the anonymous option when creating a post.
          </Text>
        </View>
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
    textAlign: "center",
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  content: {
    paddingHorizontal: 16,
  },
  faqItem: {
    marginBottom: 20,
  },
  question: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  answer: {
    fontSize: 14,
    color: "gray",
  },
});

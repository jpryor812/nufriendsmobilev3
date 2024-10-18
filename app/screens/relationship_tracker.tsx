import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import FriendProfile from '../components/friend_profile';


const RelationshipTracker = () => {

  return (
    <View style={styles.pageContainer}>
      <FriendProfile 
        imageSource={require('../assets/images/profile picture.jpg')}
        name="Jpp123"
      />

      <TouchableOpacity style={styles.sendMessageButtonContainer} onPress={handleButtonClick}>
        <Image style={styles.sendMessageEnvelope} source={require('../assets/images/incoming_envelope.png')} />
        <Text style={styles.sendMessageRelationshipText}>Send Message</Text>
      </TouchableOpacity>

      <View style={styles.friendDescriptionContainer}>
        <View style={styles.friendLocationContainer}>
          <Image style={styles.homeIcon} source={require('../assets/images/Home_icon.png')} />
          <Text style={styles.friendLocationText}>Pittsburgh, PA</Text>
        </View>
        <View style={styles.genderContainer}>
          <Image style={styles.maleIcon} source={require('../assets/images/male_icon.png')} />
          <Text style={styles.genderText}>Male</Text>
        </View>
        <View style={styles.ageContainer}>
          <Image style={styles.cakeIcon} source={require('../assets/images/ph_cake.png')} />
          <Text style={styles.ageText}>26 years old</Text>
        </View>
      </View>

      <Text style={styles.messageListHeader}>Stats</Text>
      <View style={styles.friendStatsContainer}>
        <View style={styles.messageSentStatsContainer}>
          <Text style={styles.percentileTextFive}>Top 5%!!</Text>
          <Image style={styles.mailboxEmoji} source={require('../assets/images/mailbox_emoji (1).png')} />
          <Text style={styles.messagesSentText}>Messages Sent:</Text>
          <Text style={styles.friendMessageSentStats}>823 Messages</Text>
        </View>
        <View style={styles.longestStreakStatsContainer}>
          <Text style={styles.percentileTextTen}>Top 10%!!</Text>
          <Image style={styles.fireEmoji} source={require('../assets/images/fire emoji (1).png')} />
          <Text style={styles.longestStreakText}>Longest Streak:</Text>
          <Text style={styles.friendLongestStreakStats}>9 Days</Text>
        </View>
        <View style={styles.mutualFriendsStatsContainer}>
          <Text style={styles.percentileTextTwenty}>Top 20%!!</Text>
          <Image style={styles.wavingHandEmojiSmall} source={require('../assets/images/hand_progress_bar.png')} />
          <Text style={styles.mutualFriendsText}>Mutual Friends:</Text>
          <Text style={styles.mutualFriendsStats}>4 Friends</Text>
        </View>
      </View>

      <Text style={styles.messageListHeader}>Achievements</Text>
      <ScrollView style={styles.achievementsContainer}>
      <View style={styles.achievementsFirstLineContainer}>
        <View style={styles.achievementContainerAndLine}>
          <View style={styles.achievementSuccessContainer}>
            <Image style={styles.trophyIcon} source={require('../assets/images/trophy_emoji_progress_bar.png')} />
            <Image style={styles.emoji100} source={require('../assets/images/100_emoji.png')} />
            <Text style={styles.achievementBadgeText}>100 Messages Sent</Text>
          </View>
          <View style={styles.verticalLine} />
        </View>
        {/* Repeat similar structure for other achievements */}
      </View>

      {/* Repeat similar structure for other achievement lines */}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    // Add styles
  },
  personMessaging: {
    // Add styles
  },
  initialsIconPC: {
    // Add styles
  },
  pcText: {
    // Add styles
  },
  sendMessageButtonContainer: {
    // Add styles
  },
  sendMessageEnvelope: {
    // Add styles
  },
  sendMessageRelationshipText: {
    // Add styles
  },
  friendDescriptionContainer: {
    // Add styles
  },
  friendLocationContainer: {
    // Add styles
  },
  homeIcon: {
    // Add styles
  },
  friendLocationText: {
    // Add styles
  },
  genderContainer: {
    // Add styles
  },
  maleIcon: {
    // Add styles
  },
  genderText: {
    // Add styles
  },
  ageContainer: {
    // Add styles
  },
  cakeIcon: {
    // Add styles
  },
  ageText: {
    // Add styles
  },
  messageListHeader: {
    // Add styles
  },
  friendStatsContainer: {
    // Add styles
  },
  messageSentStatsContainer: {
    // Add styles
  },
  percentileTextFive: {
    // Add styles
  },
  mailboxEmoji: {
    // Add styles
  },
  messagesSentText: {
    // Add styles
  },
  friendMessageSentStats: {
    // Add styles
  },
  longestStreakStatsContainer: {
    // Add styles
  },
  percentileTextTen: {
    // Add styles
  },
  fireEmoji: {
    // Add styles
  },
  longestStreakText: {
    // Add styles
  },
  friendLongestStreakStats: {
    // Add styles
  },
  mutualFriendsStatsContainer: {
    // Add styles
  },
  percentileTextTwenty: {
    // Add styles
  },
  wavingHandEmojiSmall: {
    // Add styles
  },
  mutualFriendsText: {
    // Add styles
  },
  mutualFriendsStats: {
    // Add styles
  },
  achievementsContainer: {
    // Add styles
  },
  achievementsFirstLineContainer: {
    // Add styles
  },
  achievementContainerAndLine: {
    // Add styles
  },
  achievementSuccessContainer: {
    // Add styles
  },
  trophyIcon: {
    // Add styles
  },
  emoji100: {
    // Add styles
  },
  achievementBadgeText: {
    // Add styles
  },
  verticalLine: {
    // Add styles
  },
  // Add more style definitions for other components
});

export default RelationshipTracker;
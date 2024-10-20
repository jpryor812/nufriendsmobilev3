import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const FooterNavigation = () => {
  return (
    <View style={styles.footer}>
      <TouchableOpacity style={styles.footerItem}>
        <Image source={require('../assets/images/profile_icon.png')} style={styles.icon} />
        <Text style={styles.footerText}>Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.footerItem}>
        <Image source={require('../assets/images/mail_progress_bar.png')} style={styles.mailicon} />
        <Text style={styles.footerText}>Messages</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.footerItem}>
        <Image source={require('../assets/images/hand_progress_bar.png')} style={styles.icon} />
        <Text style={styles.footerText}>Friends</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.footerItem}>
        <Image source={require('../assets/images/yu_progress_bar.png')} style={styles.Yuicon} />
        <Text style={styles.footerText}>Yu</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 3,
    borderTopColor: '#e0e0e0',
    paddingVertical: 12,
  },
  footerItem: {
    alignItems: 'center',
  },
  icon: {
    width: 34,
    height: 34,
    marginBottom: 4,
  },
  Yuicon: {
    width: 40,
    height: 40,
    marginBottom: 4,
  },
  mailicon: {
    width: 40,
    height: 30,
    marginBottom: 4,
  },
  
  footerText: {
    marginTop: 6,
    fontSize: 12,
    justifiyContent: 'flex-end'
  },
});

export default FooterNavigation;
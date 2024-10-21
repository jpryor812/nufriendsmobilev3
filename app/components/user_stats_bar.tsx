import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';

const StatsBar = () => {
  const stats = [
    { number: '1,250', label: 'Activities' },
    { number: '239', label: 'Experiences' },
    { number: '125', label: 'Followers' },
    { number: '42', label: 'Friends' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {stats.map((stat, index) => (
        <React.Fragment key={stat.label}>
          {index > 0 && <View style={styles.separator} />}
          <View style={styles.statBlock}>
            <Text style={styles.statNumber}>{stat.number}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </View>
        </React.Fragment>
      ))}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    marginTop: '100',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statBlock: {
    alignItems: 'center',
        marginRight: 10,
    marginLeft: 10,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginRight: 10,
    marginLeft: 10,
  },
  statLabel: {
    fontSize: 12,
    color: '#888',
    marginTop: 5,
        marginRight: 10,
    marginLeft: 10,
  },
  separator: {
    width: 1,
    height: '100%',
    backgroundColor: '#e0e0e0',
  },
});

export default StatsBar;
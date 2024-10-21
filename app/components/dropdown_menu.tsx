import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList, StyleSheet } from 'react-native';

const Dropdown = ({ options, selectedValue, onSelect }) => {
  const [visible, setVisible] = useState(false);

  const toggleDropdown = () => {
    setVisible(!visible);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item} onPress={() => {
      onSelect(item.value);
      setVisible(false);
    }}>
      <Text>{item.label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={toggleDropdown}>
        <Text style={styles.buttonText}>
          {options.find(option => option.value === selectedValue)?.label || 'Select option'}
        </Text>
        <Text style={styles.icon}>▼</Text>
      </TouchableOpacity>
      <Modal visible={visible} transparent animationType="none">
        <TouchableOpacity 
          style={styles.overlay} 
          onPress={() => setVisible(false)}
        >
          <View style={styles.dropdown}>
            <FlatList
              data={options}
              renderItem={renderItem}
              keyExtractor={(item) => item.value}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    height: 40,
    width: '50%',
    paddingHorizontal: 10,
    zIndex: 1,
  },
  buttonText: {
    flex: 1,
  },
  icon: {
    marginLeft: 10,
  },
  overlay: {
    width: '100%',
    height: '100%',
  },
  dropdown: {
    position: 'absolute',
    backgroundColor: '#fff',
    top: 50,  // Adjust as needed
    right: 20,  // Adjust as needed
    width: '50%',
    shadowColor: '#000000',
    shadowRadius: 4,
    shadowOffset: { height: 4, width: 0 },
    shadowOpacity: 0.5,
  },
  item: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
});

export default Dropdown;
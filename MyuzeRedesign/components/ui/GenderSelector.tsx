import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

/**
 * Gender Selector Component
 * 
 * A two-option gender selector component
 * 
 * @param {Object} props - Component props
 * @param {string} props.value - Current selected value ('male', 'female', or null)
 * @param {(value: string) => void} props.onSelect - Function called when a gender is selected
 */
type GenderSelectorProps = {
  value: string | null;
  onSelect: (value: string) => void;
};

const GenderSelector = ({ value, onSelect }: GenderSelectorProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.option,
          value === 'male' ? styles.selectedOption : styles.unselectedOption
        ]}
        onPress={() => onSelect('male')}
        activeOpacity={0.7}
      >
        <Text
          style={[
            styles.optionText,
            value === 'male' ? styles.selectedText : styles.unselectedText
          ]}
        >
          Male
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.option,
          value === 'female' ? styles.selectedOption : styles.unselectedOption
        ]}
        onPress={() => onSelect('female')}
        activeOpacity={0.7}
      >
        <Text
          style={[
            styles.optionText,
            value === 'female' ? styles.selectedText : styles.unselectedText
          ]}
        >
          Female
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 8,
  },
  option: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D9DBE2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedOption: {
    backgroundColor: '#282A37',
  },
  unselectedOption: {
    backgroundColor: 'white',
  },
  optionText: {
    fontSize: 14,
  },
  selectedText: {
    color: 'white',
  },
  unselectedText: {
    color: '#282A37',
  },
});

export default GenderSelector; 
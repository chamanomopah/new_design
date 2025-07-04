import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Slider from '@react-native-community/slider';

/**
 * SkinToneSlider - A custom slider component for selecting skin tone
 * 
 * @param {Object} props - Component props
 * @param {string} props.value - The current selected skin tone name
 * @param {(value: string, position: number) => void} props.onChange - Callback when skin tone changes
 */
type SkinToneSliderProps = {
  value: string;
  onChange: (value: string, position: number) => void;
};

// Skin tone options mapping from position to name
const skinTones = [
  { position: 0, name: 'Limestone' },
  { position: 0.09, name: 'Porcelain' },
  { position: 0.18, name: 'Ivory' },
  { position: 0.27, name: 'Sand' },
  { position: 0.36, name: 'Beige' },
  { position: 0.45, name: 'Honey' },
  { position: 0.55, name: 'Amber' },
  { position: 0.64, name: 'Golden' },
  { position: 0.73, name: 'Caramel' },
  { position: 0.82, name: 'Chestnut' },
  { position: 0.91, name: 'Espresso' },
  { position: 1, name: 'Ebony' }
];

// Skin tone gradient colors
const skinToneColors = [
  '#EFD1C8', // Limestone
  '#E9B697', // Porcelain
  '#E5A189', // Ivory
  '#EDD1A9', // Sand
  '#F2C69E', // Beige
  '#EDA46D', // Honey
  '#D0AA82', // Amber
  '#C28847', // Golden
  '#C17733', // Caramel
  '#A9571F', // Chestnut
  '#814829', // Espresso
  '#512E17'  // Ebony
];

const SkinToneSlider = ({ value, onChange }: SkinToneSliderProps) => {
  // Find the current position based on the value name
  const currentTone = skinTones.find(tone => tone.name === value) || skinTones[0];
  const [sliderValue, setSliderValue] = useState(currentTone.position);

  const handleValueChange = (position: number) => {
    setSliderValue(position);
    
    // Find the closest tone to the current position
    const closestTone = skinTones.reduce((prev, curr) => {
      return (Math.abs(curr.position - position) < Math.abs(prev.position - position))
        ? curr
        : prev;
    });
    
    onChange(closestTone.name, position);
  };

  return (
    <View className="w-full">
      <LinearGradient
        colors={skinToneColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        className="h-10 rounded-full overflow-hidden"
      >
        <Slider
          value={sliderValue}
          onValueChange={handleValueChange}
          minimumValue={0}
          maximumValue={1}
          step={0.01}
          minimumTrackTintColor="transparent"
          maximumTrackTintColor="transparent"
          thumbTintColor="white"
          style={{ height: 40 }}
          thumbStyle={{ 
            height: 12, 
            width: 12, 
            borderRadius: 6,
            borderWidth: 1,
            borderColor: 'white',
            backgroundColor: '#030318',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 2
          }}
        />
      </LinearGradient>
    </View>
  );
};

export default SkinToneSlider; 
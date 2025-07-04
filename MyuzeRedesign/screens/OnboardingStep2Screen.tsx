import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, TextInput, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { LinearGradient } from 'expo-linear-gradient';
import Slider from '@react-native-community/slider';
import ProgressBar from '../components/ui/ProgressBar';

/**
 * Onboarding Step 2 Screen - Help Us Find Your Fit
 * 
 * Collects user information about skin tone, clothing size, and profile photo
 * 
 * @param {Object} props - Component props
 * @param {() => void} props.onNavigate - Function to navigate to the next screen
 */
type OnboardingStep2ScreenProps = {
  onNavigate?: () => void;
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

// Clothing sizes
const clothingSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

const OnboardingStep2Screen = ({ onNavigate }: OnboardingStep2ScreenProps) => {
  const [showSizeOptions, setShowSizeOptions] = useState(false);
  const [sliderPosition, setSliderPosition] = useState(0);
  
  // Form validation schema using zod
  const schema = z.object({
    skinTone: z.string().min(1, 'Please select your skin tone'),
    clothingSize: z.string().min(1, 'Please select your clothing size'),
  });

  type FormData = z.infer<typeof schema>;

  const { control, handleSubmit, formState: { errors }, setValue, watch } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      skinTone: 'Limestone',
      clothingSize: 'XL',
    }
  });

  const skinTone = watch('skinTone');
  const clothingSize = watch('clothingSize');

  const onSubmit = (data: FormData) => {
    console.log(data);
    // Navigate to next step
    if (onNavigate) {
      onNavigate();
    }
  };

  const handleSkinToneChange = (position: number) => {
    setSliderPosition(position);
    
    // Find the closest tone to the current position
    const closestTone = skinTones.reduce((prev, curr) => {
      return (Math.abs(curr.position - position) < Math.abs(prev.position - position))
        ? curr
        : prev;
    });
    
    setValue('skinTone', closestTone.name);
  };

  const selectSize = (size: string) => {
    setValue('clothingSize', size);
    setShowSizeOptions(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity 
            style={styles.backButton}
            activeOpacity={0.7}
          >
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          
          <ProgressBar step={2} totalSteps={4} />
        </View>
      </View>
      
      {/* Content */}
      <ScrollView style={styles.scrollView}>
        {/* Title section */}
        <View style={styles.titleSection}>
          <Text style={styles.title}>
            Help Us Find Your Fit
          </Text>
          <Text style={styles.subtitle}>
            Please complete your try-on information
          </Text>
        </View>

        {/* Skin tone section */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>
            What's your skin tone?
          </Text>
          
          <Controller
            control={control}
            name="skinTone"
            render={({ field: { value } }) => (
              <View>
                <View style={styles.skinToneDisplay}>
                  <Text style={styles.skinToneText}>{value}</Text>
                </View>
                
                <LinearGradient
                  colors={skinToneColors}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.skinToneGradient}
                >
                  <Slider
                    value={sliderPosition}
                    onValueChange={handleSkinToneChange}
                    minimumValue={0}
                    maximumValue={1}
                    step={0.01}
                    minimumTrackTintColor="transparent"
                    maximumTrackTintColor="transparent"
                    thumbTintColor="#FFFFFF"
                    style={styles.slider}
                  />
                </LinearGradient>
              </View>
            )}
          />
          {errors.skinTone && (
            <Text style={styles.errorText}>{errors.skinTone.message}</Text>
          )}
        </View>
        
        {/* Clothing size section */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>
            Clothing size
          </Text>
          
          <Controller
            control={control}
            name="clothingSize"
            render={({ field: { value } }) => (
              <View style={styles.dropdownContainer}>
                <TouchableOpacity
                  style={styles.dropdownButton}
                  onPress={() => setShowSizeOptions(!showSizeOptions)}
                >
                  <Text style={styles.dropdownText}>{value}</Text>
                  <Text style={styles.dropdownArrow}>▼</Text>
                </TouchableOpacity>
                
                {showSizeOptions && (
                  <View style={styles.dropdownOptions}>
                    {clothingSizes.map((size) => (
                      <TouchableOpacity
                        key={size}
                        style={[
                          styles.dropdownOption,
                          size === value && styles.dropdownOptionSelected
                        ]}
                        onPress={() => selectSize(size)}
                      >
                        <Text style={[
                          styles.dropdownOptionText,
                          size === value && styles.dropdownOptionTextSelected
                        ]}>
                          {size}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>
            )}
          />
          <Text style={styles.helperText}>
            Help us understand your clothing size to improve your fitting.
          </Text>
          {errors.clothingSize && (
            <Text style={styles.errorText}>{errors.clothingSize.message}</Text>
          )}
        </View>
        
        {/* Profile photo section */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>
            Profile Photo
          </Text>
          
          <View style={styles.photoContainer}>
            {/* Photo upload area */}
            <View style={styles.photoUploadArea}>
              <View style={styles.photoPlaceholder} />
            </View>
            
            {/* Button area */}
            <View style={styles.photoButtonsContainer}>
              <TouchableOpacity 
                style={styles.photoButton}
                activeOpacity={0.8}
              >
                <Text style={styles.photoButtonText}>Gallery</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.photoButton}
                activeOpacity={0.8}
              >
                <Text style={styles.photoButtonText}>Camera</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          {/* Photo tips */}
          <View style={styles.photoTips}>
            <Text style={styles.photoTipsTitle}>
              Please keep the shooting environment clean and lighting appropriate for best fitting effect.
            </Text>
            <Text style={styles.photoTipsText}>
              Please wear fitted clothes and keep your hands out of your pockets.
            </Text>
            <Text style={styles.photoTipsText}>
              Your photo stays private and securely stored — never shared!
            </Text>
          </View>
        </View>
      </ScrollView>
      
      {/* Bottom buttons */}
      <View style={styles.bottomButtons}>
        <TouchableOpacity
          style={styles.continueButton}
          onPress={handleSubmit(onSubmit)}
          activeOpacity={0.8}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.cancelButton}
          activeOpacity={0.8}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: '#E3E3E3',
    paddingBottom: 16,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: '#D9D9D9',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonText: {
    fontSize: 20,
    color: '#282A37',
  },
  scrollView: {
    flex: 1,
    padding: 24,
  },
  titleSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '500',
    color: '#343640',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#8288A0',
    textAlign: 'center',
    marginTop: 8,
  },
  section: {
    marginBottom: 20,
  },
  sectionLabel: {
    fontSize: 14,
    color: '#343640',
    marginBottom: 8,
  },
  skinToneDisplay: {
    height: 48,
    borderWidth: 1,
    borderColor: '#D9DBE2',
    borderRadius: 12,
    paddingHorizontal: 12,
    marginBottom: 8,
    justifyContent: 'center',
  },
  skinToneText: {
    fontSize: 14,
    color: '#282A37',
  },
  skinToneGradient: {
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
  },
  slider: {
    height: 40,
  },
  dropdownContainer: {
    position: 'relative',
  },
  dropdownButton: {
    height: 48,
    borderWidth: 1,
    borderColor: '#D9DBE2',
    borderRadius: 12,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dropdownText: {
    fontSize: 14,
    color: '#8288A0',
  },
  dropdownArrow: {
    fontSize: 14,
    color: '#282A37',
  },
  dropdownOptions: {
    position: 'absolute',
    top: 56,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#D9DBE2',
    borderRadius: 12,
    zIndex: 10,
  },
  dropdownOption: {
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  dropdownOptionSelected: {
    backgroundColor: '#F5F6F8',
  },
  dropdownOptionText: {
    fontSize: 14,
    color: '#8288A0',
  },
  dropdownOptionTextSelected: {
    color: '#282A37',
    fontWeight: '500',
  },
  helperText: {
    fontSize: 14,
    color: '#8288A0',
    marginTop: 8,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
  photoContainer: {
    borderWidth: 1,
    borderColor: '#D9D9D9',
    borderRadius: 16,
    overflow: 'hidden',
  },
  photoUploadArea: {
    height: 266,
    borderBottomWidth: 1,
    borderBottomColor: '#D9D9D9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoPlaceholder: {
    borderWidth: 1.5,
    borderColor: 'black',
    height: 226,
    width: 115,
  },
  photoButtonsContainer: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
  },
  photoButton: {
    flex: 1,
    height: 32,
    borderWidth: 1,
    borderColor: '#030318',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoButtonText: {
    color: '#030318',
    fontWeight: '500',
    fontSize: 14,
  },
  photoTips: {
    marginTop: 16,
  },
  photoTipsTitle: {
    fontSize: 14,
    color: '#343640',
    marginBottom: 8,
  },
  photoTipsText: {
    fontSize: 14,
    color: '#8288A0',
    marginBottom: 4,
  },
  bottomButtons: {
    padding: 20,
    gap: 12,
  },
  continueButton: {
    height: 48,
    backgroundColor: '#030318',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  continueButtonText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 16,
  },
  cancelButton: {
    height: 48,
    borderWidth: 1,
    borderColor: '#E6E7EC',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#8288A0',
    fontSize: 16,
  },
});

export default OnboardingStep2Screen; 
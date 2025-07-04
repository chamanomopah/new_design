import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, ScrollView, Platform, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import DateTimePicker from '@react-native-community/datetimepicker';
import ProgressBar from '../components/ui/ProgressBar';
import GenderSelector from '../components/ui/GenderSelector';

/**
 * Onboarding Step 1 Screen - Let's Get to Know You
 * 
 * Collects basic user information like name, username, gender and date of birth
 * 
 * @param {Object} props - Component props
 * @param {() => void} props.onNavigate - Function to navigate to the next screen
 */
type OnboardingStep1ScreenProps = {
  onNavigate?: () => void;
};

const OnboardingStep1Screen = ({ onNavigate }: OnboardingStep1ScreenProps) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  
  // Form validation schema using zod
  const schema = z.object({
    fullName: z.string().min(2, 'Please enter your full name'),
    username: z.string().min(3, 'Username must be at least 3 characters'),
    gender: z.string().min(1, 'Please select your gender'),
    dateOfBirth: z.date().refine(date => {
      // Ensure user is at least 13 years old
      const today = new Date();
      const thirteenYearsAgo = new Date(today.getFullYear() - 13, today.getMonth(), today.getDate());
      return date <= thirteenYearsAgo;
    }, 'You must be at least 13 years old')
  });

  type FormData = z.infer<typeof schema>;

  const { control, handleSubmit, formState: { errors }, setValue, watch } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: '',
      username: '',
      gender: '',
      dateOfBirth: new Date(2000, 0, 1)
    }
  });

  const dateOfBirth = watch('dateOfBirth');
  const gender = watch('gender');

  const onSubmit = (data: FormData) => {
    console.log(data);
    // Navigate to next step
    if (onNavigate) {
      onNavigate();
    }
  };

  const formatDateForDisplay = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
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
          
          <ProgressBar step={1} totalSteps={4} />
        </View>
      </View>
      
      {/* Content */}
      <ScrollView style={styles.scrollView}>
        {/* Title section */}
        <View style={styles.titleSection}>
          <Text style={styles.title}>
            Let's Get to Know You
          </Text>
          <Text style={styles.subtitle}>
            Please complete your try-on information
          </Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          {/* Full name input */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Full name</Text>
            <Controller
              control={control}
              name="fullName"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.textInput}
                  placeholder="Enter full name"
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />
            {errors.fullName && (
              <Text style={styles.errorText}>{errors.fullName.message}</Text>
            )}
          </View>
          
          {/* Username input */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Username</Text>
            <Controller
              control={control}
              name="username"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.textInput}
                  placeholder="Enter username"
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />
            {errors.username && (
              <Text style={styles.errorText}>{errors.username.message}</Text>
            )}
          </View>
          
          {/* Gender selector */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Gender</Text>
            <Controller
              control={control}
              name="gender"
              render={({ field: { onChange, value } }) => (
                <GenderSelector 
                  value={value} 
                  onSelect={onChange} 
                />
              )}
            />
            {errors.gender && (
              <Text style={styles.errorText}>{errors.gender.message}</Text>
            )}
          </View>
          
          {/* Date of birth */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Date of birth</Text>
            <TouchableOpacity
              style={styles.datePickerButton}
              onPress={() => setShowDatePicker(true)}
              activeOpacity={0.7}
            >
              <Text style={styles.dateText}>
                {formatDateForDisplay(dateOfBirth)}
              </Text>
              <View style={styles.calendarIcon}>
                <Text>📅</Text>
              </View>
            </TouchableOpacity>
            {errors.dateOfBirth && (
              <Text style={styles.errorText}>{errors.dateOfBirth.message}</Text>
            )}
            
            {showDatePicker && (
              <DateTimePicker
                value={dateOfBirth}
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={(event, selectedDate) => {
                  setShowDatePicker(Platform.OS === 'ios');
                  if (selectedDate) {
                    setValue('dateOfBirth', selectedDate);
                  }
                }}
                maximumDate={new Date()}
              />
            )}
          </View>
        </View>
      </ScrollView>
      
      {/* Bottom buttons */}
      <View style={styles.bottomButtons}>
        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSubmit(onSubmit)}
          activeOpacity={0.8}
        >
          <Text style={styles.saveButtonText}>Save</Text>
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
  form: {
    gap: 16,
  },
  inputContainer: {
    gap: 8,
  },
  inputLabel: {
    fontSize: 14,
    color: '#343640',
  },
  textInput: {
    height: 48,
    borderWidth: 1,
    borderColor: '#D9DBE2',
    borderRadius: 12,
    paddingHorizontal: 12,
    fontSize: 14,
  },
  datePickerButton: {
    height: 48,
    borderWidth: 1,
    borderColor: '#D9DBE2',
    borderRadius: 12,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dateText: {
    fontSize: 14,
    color: '#8288A0',
  },
  calendarIcon: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
  },
  bottomButtons: {
    padding: 20,
    gap: 12,
  },
  saveButton: {
    height: 48,
    backgroundColor: '#030318',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButtonText: {
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

export default OnboardingStep1Screen; 
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

/**
 * Progress Bar Component
 * 
 * Displays a progress bar with a gradient fill and optional step indicator
 * 
 * @param {Object} props - Component props
 * @param {number} props.step - Current step (1-based)
 * @param {number} props.totalSteps - Total number of steps
 * @param {boolean} props.showStepText - Whether to show step text (e.g. "1 of 4")
 */
type ProgressBarProps = {
  step: number;
  totalSteps: number;
  showStepText?: boolean;
};

const ProgressBar = ({
  step,
  totalSteps,
  showStepText = true,
}: ProgressBarProps) => {
  // Calculate progress percentage
  const progressPercentage = (step / totalSteps) * 100;
  
  return (
    <View style={styles.container}>
      <View style={styles.progressTrack}>
        <LinearGradient
          colors={['#595CFF', '#C6F8FF']}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={[
            styles.progressFill,
            { width: `${progressPercentage}%` }
          ]}
        />
      </View>
      
      {showStepText && (
        <Text style={styles.stepText}>
          {step} of {totalSteps}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  progressTrack: {
    flex: 1,
    backgroundColor: '#F5F6F8',
    borderRadius: 100,
    overflow: 'hidden',
    height: 10,
  },
  progressFill: {
    height: '100%',
    borderRadius: 50,
  },
  stepText: {
    color: '#1F242D',
    fontSize: 16,
  },
});

export default ProgressBar; 
import React, { useState, useRef } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

/**
 * OTP Input Component
 * 
 * A customizable OTP (One-Time Password) input field that consists of multiple separate inputs
 * 
 * @param {Object} props - Component props
 * @param {number} props.length - Number of OTP digits (default: 4)
 * @param {(otp: string) => void} props.onOtpChange - Callback function when OTP changes
 * @param {string} props.value - Current OTP value
 * @param {boolean} props.secure - Whether to hide the input as password (default: false)
 */
type OtpInputProps = {
  length?: number;
  onOtpChange: (otp: string) => void;
  value?: string;
  secure?: boolean;
};

const OtpInput = ({ 
  length = 4, 
  onOtpChange, 
  value = '',
  secure = false,
}: OtpInputProps) => {
  const inputRefs = useRef<(TextInput | null)[]>([]);
  const [otp, setOtp] = useState<string[]>(value.split('').slice(0, length).concat(Array(length).fill('').slice(value.length)));
  const [focusedInput, setFocusedInput] = useState<number | null>(null);
  
  const handleChange = (text: string, index: number) => {
    // Only allow one character
    const newText = text.slice(-1);
    
    // Update the OTP array
    const newOtp = [...otp];
    newOtp[index] = newText;
    setOtp(newOtp);
    
    // Call the callback
    onOtpChange(newOtp.join(''));
    
    // Move to next input if we entered a value
    if (newText && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    // Handle backspace to move to previous input
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
      
      // Update the OTP array for the previous box as well
      const newOtp = [...otp];
      newOtp[index - 1] = '';
      setOtp(newOtp);
      onOtpChange(newOtp.join(''));
    }
  };

  const handleFocus = (index: number) => {
    setFocusedInput(index);
    // Select all text on focus
    inputRefs.current[index]?.setNativeProps({ selection: { start: 0, end: 1 } });
  };

  const handleBlur = () => {
    setFocusedInput(null);
  };

  // Initialize refs array
  if (inputRefs.current.length !== length) {
    inputRefs.current = Array(length).fill(null);
  }

  return (
    <View style={styles.container}>
      {Array.from({ length }, (_, index) => (
        <TextInput
          key={index}
          ref={(ref) => (inputRefs.current[index] = ref)}
          style={[
            styles.input,
            focusedInput === index && styles.inputFocused
          ]}
          value={otp[index]}
          onChangeText={(text) => handleChange(text, index)}
          onKeyPress={(e) => handleKeyPress(e, index)}
          onFocus={() => handleFocus(index)}
          onBlur={handleBlur}
          keyboardType="numeric"
          maxLength={1}
          secureTextEntry={secure}
          selectTextOnFocus
          autoFocus={index === 0 && !value}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'center',
  },
  input: {
    width: 70,
    height: 70,
    borderWidth: 1,
    borderColor: '#D4DAE3',
    borderRadius: 16,
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '500',
  },
  inputFocused: {
    borderColor: '#282A37',
    borderWidth: 1.5,
  },
});

export default OtpInput; 
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import OtpInput from '../components/ui/OtpInput';

/**
 * Verify Code Screen Component
 * 
 * Allows users to enter a verification code sent to their email
 * to complete the authentication process
 * 
 * @param {Object} props - Component props
 * @param {() => void} props.onNavigate - Function to navigate to the next screen
 */
type VerifyCodeScreenProps = {
  onNavigate?: () => void;
};

const VerifyCodeScreen = ({ onNavigate }: VerifyCodeScreenProps) => {
  const [isResending, setIsResending] = useState(false);
  
  // Form validation schema using zod
  const schema = z.object({
    code: z.string().min(4, 'Please enter the complete code').max(4)
  });

  type FormData = z.infer<typeof schema>;

  const { control, handleSubmit, formState: { errors }, setValue, watch } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      code: '',
    }
  });

  const code = watch('code');

  const onSubmit = (data: FormData) => {
    console.log(data);
    // Handle verification code submission
    if (onNavigate) {
      onNavigate();
    }
  };

  const handleResend = () => {
    setIsResending(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsResending(false);
      // Show success message or toast
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Back button */}
      <View style={styles.backButtonContainer}>
        <TouchableOpacity 
          style={styles.backButton}
          activeOpacity={0.7}
          onPress={onNavigate}
        >
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
      </View>
      
      {/* Main content */}
      <View style={styles.content}>
        {/* Title section */}
        <View style={styles.titleSection}>
          <Text style={styles.title}>
            Check email for code
          </Text>
          <Text style={styles.subtitle}>
            Please enter your email address to receive{'\n'}a verification code
          </Text>
        </View>

        {/* OTP Input section */}
        <View style={styles.otpSection}>
          <Controller
            control={control}
            name="code"
            render={({ field: { onChange } }) => (
              <OtpInput 
                length={4}
                value={code}
                onOtpChange={(value) => {
                  onChange(value);
                  if (value.length === 4) {
                    // Auto submit when all 4 digits are filled
                    handleSubmit(onSubmit)();
                  }
                }}
              />
            )}
          />
          {errors.code && (
            <Text style={styles.errorText}>{errors.code.message}</Text>
          )}
          
          {/* Didn't receive code section */}
          <View style={styles.resendSection}>
            <Text style={styles.resendText}>Didn't receive a code?</Text>
            <TouchableOpacity 
              onPress={handleResend}
              disabled={isResending}
              activeOpacity={0.7}
              style={styles.resendButton}
            >
              <Text style={styles.resendButtonText}>
                {isResending ? 'Sending...' : 'Resend'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      
      {/* Bottom button */}
      <View style={styles.bottomButtonContainer}>
        <TouchableOpacity 
          style={styles.verifyButton}
          onPress={handleSubmit(onSubmit)}
          activeOpacity={0.8}
        >
          <Text style={styles.verifyButtonText}>Verify code</Text>
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
  backButtonContainer: {
    marginTop: 20,
    marginLeft: 24,
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
  backArrow: {
    fontSize: 20,
    color: '#282A37',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 64,
    gap: 32,
  },
  titleSection: {
    alignItems: 'center',
    gap: 12,
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
  },
  otpSection: {
    alignItems: 'center',
    gap: 16,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
  resendSection: {
    flexDirection: 'row',
    marginTop: 16,
  },
  resendText: {
    fontSize: 14,
    color: '#737373',
  },
  resendButton: {
    marginLeft: 6,
  },
  resendButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#00272E',
  },
  bottomButtonContainer: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  verifyButton: {
    height: 44,
    backgroundColor: '#030318',
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  verifyButtonText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 14,
  },
});

export default VerifyCodeScreen; 
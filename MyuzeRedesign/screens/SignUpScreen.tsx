import React from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, StyleSheet, Image, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

/**
 * Sign Up Screen Component
 * 
 * Allows users to sign up for the app by entering their email address
 * or continuing with social providers like Google or Facebook
 * 
 * @param {Object} props - Component props
 * @param {() => void} props.onNavigate - Function to navigate to the next screen
 */
type SignUpScreenProps = {
  onNavigate?: () => void;
};

const SignUpScreen = ({ onNavigate }: SignUpScreenProps) => {
  // Form validation schema using zod
  const schema = z.object({
    email: z.string().email('Please enter a valid email address'),
  });

  type FormData = z.infer<typeof schema>;

  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
    }
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
    // Handle sign up logic here
    if (onNavigate) {
      onNavigate();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      <View style={styles.backgroundContainer}>
        <Image
          source={require('../../assets/gradient_bg2.png')}
          style={styles.gradient2}
        />
        <Image
          source={require('../../assets/gradient_bg1.png')}
          style={styles.gradient1}
        />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.headerSection}>
          <Image
            source={require('../../assets/myuze_logo_full.svg')}
            style={styles.logo}
          />
          <Text style={styles.tagline}>
            Find your style with AI.{"\n"}Try it on. Own it.
          </Text>
        </View>

        <View style={styles.formSection}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Sign in</Text>
            <Text style={styles.subtitle}>
              Enter your email address to complete sign up
            </Text>
          </View>

          <View style={styles.socialButtons}>
            <TouchableOpacity 
              style={styles.socialButton}
              activeOpacity={0.7}
            >
              <Image 
                source={require('../../assets/google_icon.svg')} 
                style={styles.socialIcon} 
              />
              <Text style={styles.socialButtonText}>Continue with Google</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.socialButton}
              activeOpacity={0.7}
            >
              <Image 
                source={require('../../assets/facebook_icon.png')} 
                style={styles.socialIcon} 
              />
              <Text style={styles.socialButtonText}>Continue with Facebook</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>Or sign in with</Text>
            <View style={styles.dividerLine} />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Email address</Text>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value } }) => (
                <View style={styles.textFieldContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your email"
                    value={value}
                    onChangeText={onChange}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>
              )}
            />
            {errors.email && (
              <Text style={styles.errorText}>{errors.email.message}</Text>
            )}
          </View>

          <TouchableOpacity 
            style={styles.signInButton}
            onPress={handleSubmit(onSubmit)}
            activeOpacity={0.8}
          >
            <Text style={styles.signInButtonText}>Sign in</Text>
          </TouchableOpacity>
          
          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account?</Text>
            <TouchableOpacity>
              <Text style={styles.footerLink}>Sign in</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    overflow: 'hidden',
  },
  backgroundContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  gradient1: {
    position: 'absolute',
    width: 408,
    height: 336,
    top: 181.5,
    left: 135.5,
    resizeMode: 'stretch',
  },
  gradient2: {
    position: 'absolute',
    width: 408,
    height: 406,
    top: -120,
    left: -154,
    resizeMode: 'stretch',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
  },
  headerSection: {
    alignItems: 'center',
    paddingTop: 125,
  },
  logo: {
    width: 170,
    height: 52,
    resizeMode: 'contain',
  },
  tagline: {
    textAlign: 'center',
    fontSize: 16,
    color: '#8288A0',
    marginTop: 12,
  },
  formSection: {
    paddingBottom: 32,
    gap: 16,
  },
  titleContainer: {
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: '500',
    color: '#1D2F4E',
  },
  subtitle: {
    fontSize: 14,
    color: '#67696E',
    textAlign: 'center',
  },
  socialButtons: {
    gap: 12,
  },
  socialButton: {
    height: 44,
    borderWidth: 1,
    borderColor: '#E3E7F0',
    borderRadius: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialIcon: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
    marginRight: 8,
  },
  socialButtonText: {
    fontSize: 14,
    color: '#2F4366',
    fontWeight: '500',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  dividerLine: {
    height: 1,
    flex: 1,
    backgroundColor: '#E3E7F0',
  },
  dividerText: {
    fontSize: 12,
    color: '#636369',
  },
  inputContainer: {
    gap: 8,
  },
  inputLabel: {
    fontSize: 14,
    color: '#343640',
  },
  textFieldContainer: {
    height: 48,
    borderWidth: 1,
    borderColor: '#D9DBE2',
    borderRadius: 12,
    paddingHorizontal: 12,
    justifyContent: 'center',
  },
  input: {
    fontSize: 14,
    color: '#8288A0',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
  signInButton: {
    height: 44,
    backgroundColor: '#030318',
    borderRadius: 999,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signInButtonText: {
    color: '#EDEDED',
    fontWeight: '500',
    fontSize: 14,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
  },
  footerText: {
    fontSize: 14,
    color: '#737373',
  },
  footerLink: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000000',
  },
});

export default SignUpScreen; 
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';

// This will be our main entry point for the Myuze Redesign screens
// For now, we'll just create a placeholder that will be updated as we implement the screens

// Import our screens
import SignUpScreen from './MyuzeRedesign/screens/SignUpScreen';
import VerifyCodeScreen from './MyuzeRedesign/screens/VerifyCodeScreen';
import OnboardingStep1Screen from './MyuzeRedesign/screens/OnboardingStep1Screen';
import OnboardingStep2Screen from './MyuzeRedesign/screens/OnboardingStep2Screen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<string | null>(null);

  // Simple navigation handler
  const navigateTo = (screen: string | null) => {
    setCurrentScreen(screen);
  };

  // Screen selector menu
  const renderScreenSelector = () => {
    return (
      <ScrollView style={{ flex: 1, backgroundColor: 'white', padding: 24 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 24, textAlign: 'center' }}>
          Myuze App Screens
        </Text>
        
        <View style={{ gap: 16 }}>
          <TouchableOpacity 
            style={{ backgroundColor: '#030318', paddingVertical: 12, borderRadius: 12 }}
            onPress={() => navigateTo('signUp')}
          >
            <Text style={{ color: 'white', textAlign: 'center', fontWeight: '500' }}>Sign Up Screen</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={{ backgroundColor: '#030318', paddingVertical: 12, borderRadius: 12 }}
            onPress={() => navigateTo('verifyCode')}
          >
            <Text style={{ color: 'white', textAlign: 'center', fontWeight: '500' }}>Verify Code Screen</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={{ backgroundColor: '#030318', paddingVertical: 12, borderRadius: 12 }}
            onPress={() => navigateTo('onboarding1')}
          >
            <Text style={{ color: 'white', textAlign: 'center', fontWeight: '500' }}>Onboarding Step 1</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={{ backgroundColor: '#030318', paddingVertical: 12, borderRadius: 12 }}
            onPress={() => navigateTo('onboarding2')}
          >
            <Text style={{ color: 'white', textAlign: 'center', fontWeight: '500' }}>Onboarding Step 2</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  };

  // Render the appropriate screen
  const renderScreen = () => {
    switch (currentScreen) {
      case 'signUp':
        return <SignUpScreen onNavigate={() => navigateTo('verifyCode')} />;
      case 'verifyCode':
        return <VerifyCodeScreen onNavigate={() => navigateTo('onboarding1')} />;
      case 'onboarding1':
        return <OnboardingStep1Screen onNavigate={() => navigateTo('onboarding2')} />;
      case 'onboarding2':
        return <OnboardingStep2Screen onNavigate={() => navigateTo(null)} />;
      default:
        return renderScreenSelector();
    }
  };

  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      {renderScreen()}
    </SafeAreaProvider>
  );
} 
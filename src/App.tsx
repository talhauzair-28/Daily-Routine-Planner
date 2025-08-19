import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { ThemeProvider } from 'react-native-elements';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import LoadingScreen from '@/components/LoadingScreen';
import { Colors } from '@/constants/Colors';
import AppNavigator from '@/navigation/AppNavigator';
import { persistor, store } from '@/store';

const App: React.FC = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const theme = {
    colors: {
      primary: Colors.primary,
      secondary: Colors.secondary,
      success: Colors.success || '#4CAF50',
      warning: Colors.warning || '#FF9800',
      error: Colors.error || '#F44336',
      text: isDarkMode ? '#FFFFFF' : '#000000',
      background: isDarkMode ? '#121212' : '#FFFFFF',
      surface: isDarkMode ? '#1E1E1E' : '#F5F5F5',
    },
    Text: {
      style: {
        color: isDarkMode ? '#FFFFFF' : '#000000',
        fontFamily: 'System',
      },
    },
    Button: {
      titleStyle: {
        color: '#FFFFFF',
        fontWeight: 'bold',
      },
      buttonStyle: {
        backgroundColor: Colors.primary,
        borderRadius: 8,
        paddingVertical: 12,
      },
    },
    Card: {
      containerStyle: {
        backgroundColor: isDarkMode ? '#1E1E1E' : '#FFFFFF',
        borderRadius: 12,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        margin: 8,
      },
    },
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <PersistGate loading={<LoadingScreen />} persistor={persistor}>
          <ThemeProvider theme={theme}>
            <NavigationContainer>
              <StatusBar
                barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                backgroundColor={theme.colors.background}
              />
              <AppNavigator />
            </NavigationContainer>
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  );
};

export default App;
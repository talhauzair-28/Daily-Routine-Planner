import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import LoadingScreen from '@/components/LoadingScreen';
import { Colors } from '@/constants/Colors';
import AppNavigator from '@/navigation/AppNavigator';
import { persistor, store } from '@/store';
import { initializeLanguage } from '@/utils/i18n';

/**
 * App component - Root application wrapper
 * Provides Redux store, navigation, theme context, and i18n initialization
 */
const App: React.FC = () => {

  const isDarkMode = useColorScheme() === 'dark';
  const statusBarStyle = isDarkMode ? 'light-content' : 'dark-content';
  const statusBarBackground = isDarkMode ? Colors.black : Colors.background;

  // Initialize i18n on app start
  useEffect(() => {
    initializeLanguage();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <PersistGate loading={<LoadingScreen />} persistor={persistor}>
          <NavigationContainer>
            <StatusBar
              barStyle={statusBarStyle}
              backgroundColor={statusBarBackground}
            />
            <AppNavigator />
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  );
};

export default App;

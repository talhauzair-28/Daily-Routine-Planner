import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from 'react-native-paper';

// Import screens
import HomeScreen from '@/screens/HomeScreen';
import TodayScreen from '@/screens/TodayScreen';
import HabitsScreen from '@/screens/HabitsScreen';
import AnalyticsScreen from '@/screens/AnalyticsScreen';
import SettingsScreen from '@/screens/SettingsScreen';

// Import detailed screens
import PrayerDetailScreen from '@/screens/PrayerDetailScreen';
import ZikrDetailScreen from '@/screens/ZikrDetailScreen';
import QuranDetailScreen from '@/screens/QuranDetailScreen';
import FamilyTimeDetailScreen from '@/screens/FamilyTimeDetailScreen';
import DisciplineChallengesScreen from '@/screens/DisciplineChallengesScreen';
import StreakDetailScreen from '@/screens/StreakDetailScreen';

export type RootStackParamList = {
  Main: undefined;
  PrayerDetail: { prayerId: string };
  ZikrDetail: { sessionId: string };
  QuranDetail: undefined;
  FamilyTimeDetail: { familyTimeId?: string };
  DisciplineChallenges: undefined;
  StreakDetail: { habitName: string };
};

export type TabParamList = {
  Home: undefined;
  Today: undefined;
  Habits: undefined;
  Analytics: undefined;
  Settings: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();
const Stack = createStackNavigator<RootStackParamList>();

const TabNavigator: React.FC = () => {
  const theme = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string;

          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Today':
              iconName = focused ? 'calendar-today' : 'calendar-today';
              break;
            case 'Habits':
              iconName = focused ? 'chart-line' : 'chart-line-variant';
              break;
            case 'Analytics':
              iconName = focused ? 'chart-box' : 'chart-box-outline';
              break;
            case 'Settings':
              iconName = focused ? 'cog' : 'cog-outline';
              break;
            default:
              iconName = 'help';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.onSurfaceVariant,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.outline,
        },
        headerStyle: {
          backgroundColor: theme.colors.surface,
        },
        headerTintColor: theme.colors.onSurface,
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{ title: 'Dashboard' }}
      />
      <Tab.Screen 
        name="Today" 
        component={TodayScreen}
        options={{ title: 'Today' }}
      />
      <Tab.Screen 
        name="Habits" 
        component={HabitsScreen}
        options={{ title: 'Habits' }}
      />
      <Tab.Screen 
        name="Analytics" 
        component={AnalyticsScreen}
        options={{ title: 'Analytics' }}
      />
      <Tab.Screen 
        name="Settings" 
        component={SettingsScreen}
        options={{ title: 'Settings' }}
      />
    </Tab.Navigator>
  );
};

const AppNavigator: React.FC = () => {
  const theme = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.surface,
        },
        headerTintColor: theme.colors.onSurface,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen 
        name="Main" 
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="PrayerDetail" 
        component={PrayerDetailScreen}
        options={{ title: 'Prayer Details' }}
      />
      <Stack.Screen 
        name="ZikrDetail" 
        component={ZikrDetailScreen}
        options={{ title: 'Zikr Session' }}
      />
      <Stack.Screen 
        name="QuranDetail" 
        component={QuranDetailScreen}
        options={{ title: 'Quran Session' }}
      />
      <Stack.Screen 
        name="FamilyTimeDetail" 
        component={FamilyTimeDetailScreen}
        options={{ title: 'Family Time' }}
      />
      <Stack.Screen 
        name="DisciplineChallenges" 
        component={DisciplineChallengesScreen}
        options={{ title: 'Discipline Challenges' }}
      />
      <Stack.Screen 
        name="StreakDetail" 
        component={StreakDetailScreen}
        options={{ title: 'Streak Details' }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;

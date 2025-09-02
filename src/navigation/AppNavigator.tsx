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

// Import route constants
import { ROUTES, RouteParams } from './routes';

export type RootStackParamList = RouteParams;
export type TabParamList = Pick<RouteParams, typeof ROUTES.HOME | typeof ROUTES.TODAY | typeof ROUTES.HABITS | typeof ROUTES.ANALYTICS | typeof ROUTES.SETTINGS>;

const Tab = createBottomTabNavigator<TabParamList>();
const Stack = createStackNavigator<RootStackParamList>();

const TabNavigator: React.FC = () => {
  // ==========================================
  // Variable Declaration/States
  // ==========================================
  // (No state variables in this component)

  // ==========================================
  // Hooks/Custom Hooks
  // ==========================================
  const theme = useTheme();

  // ==========================================
  // Use Effects
  // ==========================================
  // (No useEffect in this component)

  // ==========================================
  // Helper Methods
  // ==========================================
  // (No helper methods in this component)

  // ==========================================
  // Event Handlers
  // ==========================================
  // (Event handlers are inline in this component)

  // ==========================================
  // Render Methods
  // ==========================================
  // (No separate render methods in this component)

  // ==========================================
  // Return
  // ==========================================
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string;

          switch (route.name) {
            case ROUTES.HOME:
              iconName = focused ? 'home' : 'home-outline';
              break;
            case ROUTES.TODAY:
              iconName = focused ? 'calendar-today' : 'calendar-today';
              break;
            case ROUTES.HABITS:
              iconName = focused ? 'chart-line' : 'chart-line-variant';
              break;
            case ROUTES.ANALYTICS:
              iconName = focused ? 'chart-box' : 'chart-box-outline';
              break;
            case ROUTES.SETTINGS:
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
        name={ROUTES.HOME}
        component={HomeScreen}
        options={{ title: 'Dashboard' }}
      />
      <Tab.Screen
        name={ROUTES.TODAY}
        component={TodayScreen}
        options={{ title: 'Today' }}
      />
      <Tab.Screen
        name={ROUTES.HABITS}
        component={HabitsScreen}
        options={{ title: 'Habits' }}
      />
      <Tab.Screen
        name={ROUTES.ANALYTICS}
        component={AnalyticsScreen}
        options={{ title: 'Analytics' }}
      />
      <Tab.Screen
        name={ROUTES.SETTINGS}
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
        name={ROUTES.MAIN}
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ROUTES.PRAYER_DETAIL}
        component={PrayerDetailScreen}
        options={{ title: 'Prayer Details' }}
      />
      <Stack.Screen
        name={ROUTES.ZIKR_DETAIL}
        component={ZikrDetailScreen}
        options={{ title: 'Zikr Session' }}
      />
      <Stack.Screen
        name={ROUTES.QURAN_DETAIL}
        component={QuranDetailScreen}
        options={{ title: 'Quran Session' }}
      />
      <Stack.Screen
        name={ROUTES.FAMILY_TIME_DETAIL}
        component={FamilyTimeDetailScreen}
        options={{ title: 'Family Time' }}
      />
      <Stack.Screen
        name={ROUTES.DISCIPLINE_CHALLENGES}
        component={DisciplineChallengesScreen}
        options={{ title: 'Discipline Challenges' }}
      />
      <Stack.Screen
        name={ROUTES.STREAK_DETAIL}
        component={StreakDetailScreen}
        options={{ title: 'Streak Details' }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Title, Paragraph, useTheme } from 'react-native-paper';

const StreakDetailScreen: React.FC = () => {
  const theme = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Title>Streak Detail Screen</Title>
      <Paragraph>Habit streak details and analytics will be implemented here.</Paragraph>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
});

export default StreakDetailScreen;

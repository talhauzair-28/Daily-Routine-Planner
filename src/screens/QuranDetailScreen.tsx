import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Title, Paragraph, useTheme } from 'react-native-paper';

const QuranDetailScreen: React.FC = () => {
  const theme = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Title>Quran Detail Screen</Title>
      <Paragraph>Quran recitation and translation tracking will be implemented here.</Paragraph>
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

export default QuranDetailScreen;

import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Badge, Button, Card, Text } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';

import { Colors } from '@/constants/Colors';
import { RootState } from '@/store';
import { initializeTodayChallenges } from '@/store/slices/disciplineSlice';
import { initializeTodayRecord } from '@/store/slices/habitSlice';

const HomeScreen: React.FC = () => {
  const dispatch = useDispatch();
  
  const { todayRecord } = useSelector((state: RootState) => state.habits);
  const { activeStreaks } = useSelector((state: RootState) => state.streaks);
  const { dailyScores } = useSelector((state: RootState) => state.discipline);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    if (!todayRecord || todayRecord.date !== today) {
      dispatch(initializeTodayRecord(today));
      
      // Determine work type for today
      const dayOfWeek = new Date().getDay();
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6; // Sunday or Saturday
      const isWFH = dayOfWeek === 3 || dayOfWeek === 5; // Wednesday or Friday
      const workType = isWeekend ? 'weekend' : isWFH ? 'wfh' : 'office';
      
      dispatch(initializeTodayChallenges({ workType }));
    }
  }, [dispatch, todayRecord]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getOverallScore = () => {
    return dailyScores.total;
  };

  const getScoreColor = (score: number, maxScore: number) => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 90) return Colors.excellent;
    if (percentage >= 80) return Colors.good;
    if (percentage >= 60) return Colors.average;
    if (percentage >= 40) return Colors.poor;
    return Colors.bad;
  };

  const getScoreLevel = (score: number, maxScore: number) => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 90) return 'Diamond 💎';
    if (percentage >= 80) return 'Gold 🥇';
    if (percentage >= 60) return 'Silver 🥈';
    if (percentage >= 40) return 'Bronze 🥉';
    return 'Needs Work 📈';
  };

  const getTodayWorkType = () => {
    const dayOfWeek = new Date().getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const isWFH = dayOfWeek === 3 || dayOfWeek === 5;
    
    if (isWeekend) return { type: 'Weekend', icon: 'home-heart', color: Colors.family };
    if (isWFH) return { type: 'Work from Home', icon: 'home-account', color: Colors.secondary };
    return { type: 'Office Day', icon: 'office-building', color: Colors.primary };
  };

  const workType = getTodayWorkType();
  const overallScore = getOverallScore();
  const maxScore = 32; // Based on your discipline scoring system

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header Card */}
      <Card containerStyle={styles.headerCard}>
        <View style={styles.headerContent}>
          <Text h3 style={styles.greeting}>
            Assalamu Alaikum! 🌅
          </Text>
          <Text style={styles.date}>
            {formatDate(new Date().toISOString())}
          </Text>
          <View style={styles.workTypeContainer}>
            <Icon 
              name={workType.icon} 
              size={20} 
              color={workType.color} 
              style={styles.workTypeIcon}
            />
            <Text style={[styles.workType, { color: workType.color }]}>
              {workType.type}
            </Text>
          </View>
        </View>
      </Card>

      {/* Daily Score Card */}
      <Card containerStyle={styles.scoreCard}>
        <Text h4 style={styles.cardTitle}>
          Today&apos;s Discipline Score
        </Text>
        <View style={styles.scoreContent}>
          <View style={styles.scoreCircle}>
            <Text h1 style={[styles.scoreNumber, { color: getScoreColor(overallScore, maxScore) }]}>
              {overallScore}
            </Text>
            <Text style={styles.scoreTotal}>/ {maxScore}</Text>
          </View>
          <View style={styles.scoreDetails}>
            <Badge
              value={getScoreLevel(overallScore, maxScore)}
              badgeStyle={[styles.levelBadge, { backgroundColor: getScoreColor(overallScore, maxScore) }]}
              textStyle={styles.levelText}
            />
            <Text style={styles.scorePercentage}>
              {Math.round((overallScore / maxScore) * 100)}% Complete
            </Text>
          </View>
        </View>
      </Card>

      {/* Category Scores */}
      <Card containerStyle={styles.categoryCard}>
        <Text h4 style={styles.cardTitle}>
          Category Breakdown
        </Text>
        <View style={styles.categoriesGrid}>
          <View style={styles.categoryItem}>
            <Icon name="clock-outline" size={24} color={Colors.primary} />
            <Text style={styles.categoryLabel}>Timing</Text>
            <Text style={[styles.categoryScore, { color: getScoreColor(dailyScores.timing, 11) }]}>
              {dailyScores.timing}/11
            </Text>
          </View>
          
          <View style={styles.categoryItem}>
            <Icon name="mosque" size={24} color={Colors.spiritual} />
            <Text style={styles.categoryLabel}>Spiritual</Text>
            <Text style={[styles.categoryScore, { color: getScoreColor(dailyScores.spiritual, 9) }]}>
              {dailyScores.spiritual}/9
            </Text>
          </View>
          
          <View style={styles.categoryItem}>
            <Icon name="heart-multiple" size={24} color={Colors.family} />
            <Text style={styles.categoryLabel}>Family</Text>
            <Text style={[styles.categoryScore, { color: getScoreColor(dailyScores.family, 4) }]}>
              {dailyScores.family}/4
            </Text>
          </View>
          
          <View style={styles.categoryItem}>
            <Icon name="dumbbell" size={24} color={Colors.accent} />
            <Text style={styles.categoryLabel}>Personal</Text>
            <Text style={[styles.categoryScore, { color: getScoreColor(dailyScores.personal, 8) }]}>
              {dailyScores.personal}/8
            </Text>
          </View>
        </View>
      </Card>

      {/* Active Streaks */}
      <Card containerStyle={styles.streaksCard}>
        <Text h4 style={styles.cardTitle}>
          Active Streaks 🔥
        </Text>
        <View style={styles.streaksContainer}>
          {activeStreaks.slice(0, 3).map((streak) => (
            <View key={streak.id} style={styles.streakItem}>
              <Text style={styles.streakName}>{streak.habitName}</Text>
              <Badge
                value={`${streak.currentStreak} days`}
                badgeStyle={[styles.streakBadge, { 
                  backgroundColor: streak.currentStreak >= 30 ? Colors.excellent :
                                   streak.currentStreak >= 14 ? Colors.good :
                                   streak.currentStreak >= 7 ? Colors.average : Colors.warning 
                }]}
                textStyle={styles.streakText}
              />
            </View>
          ))}
        </View>
      </Card>

      {/* Quick Actions */}
      <Card containerStyle={styles.actionsCard}>
        <Text h4 style={styles.cardTitle}>
          Quick Actions
        </Text>
        <View style={styles.actionsGrid}>
          <Button
            title="Today's Progress"
            icon={<Icon name="today" size={20} color="white" style={{ marginRight: 8 }} />}
            buttonStyle={[styles.actionButton, { backgroundColor: Colors.primary }]}
            onPress={() => {/* Navigate to Today Screen */}}
          />
          
          <Button
            title="Log Quality"
            icon={<Icon name="star" size={20} color="white" style={{ marginRight: 8 }} />}
            buttonStyle={[styles.actionButton, { backgroundColor: Colors.secondary }]}
            onPress={() => {/* Navigate to Quality Tracking */}}
          />
          
          <Button
            title="View Analytics"
            icon={<Icon name="chart-line" size={20} color="white" style={{ marginRight: 8 }} />}
            buttonStyle={[styles.actionButton, { backgroundColor: Colors.accent }]}
            onPress={() => {/* Navigate to Analytics */}}
          />
          
          <Button
            title="Habits"
            icon={<Icon name="format-list-checks" size={20} color="white" style={{ marginRight: 8 }} />}
            buttonStyle={[styles.actionButton, { backgroundColor: Colors.spiritual }]}
            onPress={() => {/* Navigate to Habits */}}
          />
        </View>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  headerCard: {
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
    elevation: 3,
  },
  headerContent: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  greeting: {
    color: Colors.primary,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  date: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginTop: 4,
    textAlign: 'center',
  },
  workTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  workTypeIcon: {
    marginRight: 6,
  },
  workType: {
    fontSize: 14,
    fontWeight: '600',
  },
  scoreCard: {
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: 12,
    elevation: 3,
  },
  cardTitle: {
    color: Colors.text,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  scoreContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  scoreCircle: {
    alignItems: 'center',
  },
  scoreNumber: {
    fontWeight: 'bold',
  },
  scoreTotal: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginTop: -8,
  },
  scoreDetails: {
    alignItems: 'center',
  },
  levelBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  levelText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  scorePercentage: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 8,
  },
  categoryCard: {
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: 12,
    elevation: 3,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryItem: {
    width: '48%',
    alignItems: 'center',
    padding: 12,
    backgroundColor: Colors.surface,
    borderRadius: 8,
    marginBottom: 8,
  },
  categoryLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  categoryScore: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 2,
  },
  streaksCard: {
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: 12,
    elevation: 3,
  },
  streaksContainer: {
    gap: 8,
  },
  streakItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  streakName: {
    fontSize: 14,
    color: Colors.text,
    flex: 1,
  },
  streakBadge: {
    borderRadius: 12,
    paddingHorizontal: 8,
  },
  streakText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  actionsCard: {
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 24,
    borderRadius: 12,
    elevation: 3,
  },
  actionsGrid: {
    gap: 12,
  },
  actionButton: {
    borderRadius: 8,
    paddingVertical: 12,
  },
});

export default HomeScreen;
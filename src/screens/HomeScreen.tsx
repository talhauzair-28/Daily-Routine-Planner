import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Badge, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';

import { Card, Text } from '@/components/atoms';

import { Colors } from '@/constants/Colors';
import {
  BORDER_RADIUS,
  CardVariant,
  ICON_SIZES,
  SPACING,
  SpacingSize,
} from '@/constants/design';
import { RootState } from '@/store';
import { initializeTodayChallenges } from '@/store/slices/disciplineSlice';
import { initializeTodayRecord } from '@/store/slices/habitSlice';
import { getScoreColor } from '@/utils';
import { ROUTES } from '@/navigation/routes';

const HomeScreen: React.FC = () => {
  // ==========================================
  // Variable Declaration/States
  // ==========================================
  const maxScore = 32; // Based on your discipline scoring system

  // ==========================================
  // Hooks/Custom Hooks
  // ==========================================
  const dispatch = useDispatch();
  const { todayRecord } = useSelector((state: RootState) => state.habits);
  const { activeStreaks } = useSelector((state: RootState) => state.streaks);
  const { dailyScores } = useSelector((state: RootState) => state.discipline);

  // ==========================================
  // Use Effects
  // ==========================================
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

  // ==========================================
  // Helper Methods
  // ==========================================
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

    if (isWeekend)
      return { type: 'Weekend', icon: 'home-heart', color: Colors.family };
    if (isWFH)
      return {
        type: 'Work from Home',
        icon: 'home-account',
        color: Colors.secondary,
      };
    return {
      type: 'Office Day',
      icon: 'office-building',
      color: Colors.primary,
    };
  };

  // ==========================================
  // Event Handlers
  // ==========================================
  // (No event handlers in this component)

  // ==========================================
  // Render Methods
  // ==========================================
  // (No separate render methods in this component)

  // Computed values for render
  const workType = getTodayWorkType();
  const overallScore = getOverallScore();

  // ==========================================
  // Return
  // ==========================================
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header Card */}
      <Card
        variant={CardVariant.DEFAULT}
        padding={SpacingSize.MD}
        style={styles.headerCard}
      >
        <View style={styles.headerContent}>
          <Text variant="h3" color="primary" style={styles.greeting}>
            Assalamu Alaikum! 🌅
          </Text>
          <Text variant="body" color="textSecondary" style={styles.date}>
            {formatDate(new Date().toISOString())}
          </Text>
          <View style={styles.workTypeContainer}>
            <Icon
              name={workType.icon}
              size={ICON_SIZES.MD}
              color={workType.color}
              style={styles.workTypeIcon}
            />
            <Text
              variant="bodySmall"
              style={[styles.workType, { color: workType.color }]}
            >
              {workType.type}
            </Text>
          </View>
        </View>
      </Card>

      {/* Daily Score Card */}
      <Card
        variant={CardVariant.DEFAULT}
        padding={SpacingSize.MD}
        style={styles.scoreCard}
      >
        <Text variant="h4" color="text" style={styles.cardTitle}>
          Today&apos;s Discipline Score
        </Text>
        <View style={styles.scoreContent}>
          <View style={styles.scoreCircle}>
            <Text
              variant="h1"
              style={[
                styles.scoreNumber,
                {
                  color: Colors[getScoreColor((overallScore / maxScore) * 100)],
                },
              ]}
            >
              {overallScore}
            </Text>
            <Text
              variant="body"
              color="textSecondary"
              style={styles.scoreTotal}
            >
              / {maxScore}
            </Text>
          </View>
          <View style={styles.scoreDetails}>
            <Badge
              value={getScoreLevel(overallScore, maxScore)}
              badgeStyle={[
                styles.levelBadge,
                {
                  backgroundColor:
                    Colors[getScoreColor((overallScore / maxScore) * 100)],
                },
              ]}
              textStyle={styles.levelText}
            />
            <Text
              variant="bodySmall"
              color="textSecondary"
              style={styles.scorePercentage}
            >
              {Math.round((overallScore / maxScore) * 100)}% Complete
            </Text>
          </View>
        </View>
      </Card>

      {/* Category Scores */}
      <Card
        variant={CardVariant.DEFAULT}
        padding={SpacingSize.MD}
        style={styles.categoryCard}
      >
        <Text variant="h4" color="text" style={styles.cardTitle}>
          Category Breakdown
        </Text>
        <View style={styles.categoriesGrid}>
          <View style={styles.categoryItem}>
            <Icon
              name="clock-outline"
              size={ICON_SIZES.LG}
              color={Colors.primary}
            />
            <Text
              variant="caption"
              color="textSecondary"
              style={styles.categoryLabel}
            >
              Timing
            </Text>
            <Text
              variant="body"
              style={[
                styles.categoryScore,
                {
                  color: Colors[getScoreColor((dailyScores.timing / 11) * 100)],
                },
              ]}
            >
              {dailyScores.timing}/11
            </Text>
          </View>

          <View style={styles.categoryItem}>
            <Icon name="mosque" size={ICON_SIZES.LG} color={Colors.spiritual} />
            <Text
              variant="caption"
              color="textSecondary"
              style={styles.categoryLabel}
            >
              Spiritual
            </Text>
            <Text
              variant="body"
              style={[
                styles.categoryScore,
                {
                  color:
                    Colors[getScoreColor((dailyScores.spiritual / 9) * 100)],
                },
              ]}
            >
              {dailyScores.spiritual}/9
            </Text>
          </View>

          <View style={styles.categoryItem}>
            <Icon
              name="heart-multiple"
              size={ICON_SIZES.LG}
              color={Colors.family}
            />
            <Text
              variant="caption"
              color="textSecondary"
              style={styles.categoryLabel}
            >
              Family
            </Text>
            <Text
              variant="body"
              style={[
                styles.categoryScore,
                {
                  color: Colors[getScoreColor((dailyScores.family / 4) * 100)],
                },
              ]}
            >
              {dailyScores.family}/4
            </Text>
          </View>

          <View style={styles.categoryItem}>
            <Icon name="dumbbell" size={ICON_SIZES.LG} color={Colors.accent} />
            <Text
              variant="caption"
              color="textSecondary"
              style={styles.categoryLabel}
            >
              Personal
            </Text>
            <Text
              variant="body"
              style={[
                styles.categoryScore,
                {
                  color:
                    Colors[getScoreColor((dailyScores.personal / 8) * 100)],
                },
              ]}
            >
              {dailyScores.personal}/8
            </Text>
          </View>
        </View>
      </Card>

      {/* Active Streaks */}
      <Card
        variant={CardVariant.DEFAULT}
        padding={SpacingSize.MD}
        style={styles.streaksCard}
      >
        <Text variant="h4" color="text" style={styles.cardTitle}>
          Active Streaks 🔥
        </Text>
        <View style={styles.streaksContainer}>
          {activeStreaks.slice(0, 3).map(streak => (
            <View key={streak.id} style={styles.streakItem}>
              <Text variant="bodySmall" color="text" style={styles.streakName}>
                {streak.habitName}
              </Text>
              <Badge
                value={`${streak.currentStreak} days`}
                badgeStyle={[
                  styles.streakBadge,
                  {
                    backgroundColor:
                      streak.currentStreak >= 30
                        ? Colors.excellent
                        : streak.currentStreak >= 14
                          ? Colors.good
                          : streak.currentStreak >= 7
                            ? Colors.average
                            : Colors.warning,
                  },
                ]}
                textStyle={styles.streakText}
              />
            </View>
          ))}
        </View>
      </Card>

      {/* Quick Actions */}
      <Card
        variant={CardVariant.DEFAULT}
        padding={SpacingSize.MD}
        style={styles.actionsCard}
      >
        <Text variant="h4" color="text" style={styles.cardTitle}>
          Quick Actions
        </Text>
        <View style={styles.actionsGrid}>
          <Button
            title="Today's Progress"
            icon={
              <Icon
                name="today"
                size={ICON_SIZES.MD}
                color="white"
                style={{ marginRight: SPACING.SM }}
              />
            }
            buttonStyle={[
              styles.actionButton,
              { backgroundColor: Colors.primary },
            ]}
            onPress={() => {
              /* Navigate to Today Screen */
              // navigation.navigate(ROUTES.TODAY);
            }}
          />

          <Button
            title="Log Quality"
            icon={
              <Icon
                name="star"
                size={ICON_SIZES.MD}
                color="white"
                style={{ marginRight: SPACING.SM }}
              />
            }
            buttonStyle={[
              styles.actionButton,
              { backgroundColor: Colors.secondary },
            ]}
            onPress={() => {
              /* Navigate to Quality Tracking */
              // navigation.navigate(ROUTES.DISCIPLINE_CHALLENGES);
            }}
          />

          <Button
            title="View Analytics"
            icon={
              <Icon
                name="chart-line"
                size={ICON_SIZES.MD}
                color="white"
                style={{ marginRight: SPACING.SM }}
              />
            }
            buttonStyle={[
              styles.actionButton,
              { backgroundColor: Colors.accent },
            ]}
            onPress={() => {
              /* Navigate to Analytics */
              // navigation.navigate(ROUTES.ANALYTICS);
            }}
          />

          <Button
            title="Habits"
            icon={
              <Icon
                name="format-list-checks"
                size={ICON_SIZES.MD}
                color="white"
                style={{ marginRight: SPACING.SM }}
              />
            }
            buttonStyle={[
              styles.actionButton,
              { backgroundColor: Colors.spiritual },
            ]}
            onPress={() => {
              /* Navigate to Habits */
              // navigation.navigate(ROUTES.HABITS);
            }}
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
    marginHorizontal: SPACING.MD,
    marginTop: SPACING.MD,
    borderRadius: BORDER_RADIUS.LG,
    elevation: 3,
  },
  headerContent: {
    alignItems: 'center',
    paddingVertical: SPACING.SM,
  },
  greeting: {
    textAlign: 'center',
  },
  date: {
    marginTop: SPACING.XS,
    textAlign: 'center',
  },
  workTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SPACING.SM,
  },
  workTypeIcon: {
    marginRight: SPACING.XS,
  },
  workType: {
    fontWeight: '600',
  },
  scoreCard: {
    marginHorizontal: SPACING.MD,
    marginTop: SPACING.SM + SPACING.XS, // 12px
    borderRadius: BORDER_RADIUS.LG,
    elevation: 3,
  },
  cardTitle: {
    textAlign: 'center',
    marginBottom: SPACING.MD,
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
    // Typography handled by variant
  },
  scoreTotal: {
    marginTop: -SPACING.SM,
  },
  scoreDetails: {
    alignItems: 'center',
  },
  levelBadge: {
    paddingHorizontal: SPACING.SM + SPACING.XS, // 12px
    paddingVertical: SPACING.XS,
    borderRadius: SPACING.MD + SPACING.XS, // 20px
  },
  levelText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  scorePercentage: {
    marginTop: SPACING.SM,
  },
  categoryCard: {
    marginHorizontal: SPACING.MD,
    marginTop: SPACING.SM + SPACING.XS, // 12px
    borderRadius: BORDER_RADIUS.LG,
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
    padding: SPACING.SM + SPACING.XS, // 12px
    backgroundColor: Colors.surface,
    borderRadius: BORDER_RADIUS.MD,
    marginBottom: SPACING.SM,
  },
  categoryLabel: {
    marginTop: SPACING.XS,
  },
  categoryScore: {
    fontWeight: 'bold',
    marginTop: 2, // Keep small value for tight spacing
  },
  streaksCard: {
    marginHorizontal: SPACING.MD,
    marginTop: SPACING.SM + SPACING.XS, // 12px
    borderRadius: BORDER_RADIUS.LG,
    elevation: 3,
  },
  streaksContainer: {
    gap: SPACING.SM,
  },
  streakItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.SM,
    paddingHorizontal: SPACING.XS,
  },
  streakName: {
    flex: 1,
  },
  streakBadge: {
    borderRadius: BORDER_RADIUS.LG,
    paddingHorizontal: SPACING.SM,
  },
  streakText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  actionsCard: {
    marginHorizontal: SPACING.MD,
    marginTop: SPACING.SM + SPACING.XS, // 12px
    marginBottom: SPACING.LG,
    borderRadius: BORDER_RADIUS.LG,
    elevation: 3,
  },
  actionsGrid: {
    gap: SPACING.SM + SPACING.XS, // 12px
  },
  actionButton: {
    borderRadius: BORDER_RADIUS.MD,
    paddingVertical: SPACING.SM + SPACING.XS, // 12px
  },
});

export default HomeScreen;

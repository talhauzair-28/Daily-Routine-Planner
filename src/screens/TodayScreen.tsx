import { useNavigation } from '@react-navigation/native';
import type { NavigationProp } from '@react-navigation/native';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { FAB } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';

import { Text, Card, Button } from '@/components/atoms';

import { Colors } from '@/constants/Colors';
import { ICON_SIZES, SPACING } from '@/constants/design/Dimensions';
import { ButtonVariant } from '@/models/enums';
import { RootState } from '@/store';
import type { RootStackParamList } from '@/navigation/AppNavigator';
import { ROUTES } from '@/navigation/routes';

const TodayScreen: React.FC = () => {
  // ==========================================
  // Variable Declaration/States
  // ==========================================
  // (No state variables in this component)

  // ==========================================
  // Hooks/Custom Hooks
  // ==========================================
  // (No hooks in this component)
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const todayRecord = useSelector((state: RootState) => state.habits.todayRecord);

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
  const renderStars = (quality: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name={index < quality ? 'star' : 'star-outline'}
        size={ICON_SIZES.SM}
        color={index < quality ? Colors.accent : Colors.textSecondary}
      />
    ));
  };

  // ==========================================
  // Return
  // ==========================================
  return (
    <View style={[styles.container, { backgroundColor: Colors.background }]}>
      <ScrollView style={styles.scrollView}>
        {/* Today's Overview */}
        <Card style={styles.card}>
            <Text variant="h4" color="text">
              Today&apos;s Progress
            </Text>
            <Text variant="body" color="textSecondary">
              {todayRecord?.dayOfWeek} -{' '}
              {todayRecord?.workType === 'office'
                ? 'Office Day'
                : todayRecord?.workType === 'wfh'
                  ? 'Work From Home'
                  : 'Weekend'}
            </Text>
        </Card>

        {/* Prayers Section */}
        <Card style={styles.card}>
            <View style={styles.sectionHeader}>
              <Icon
                name="mosque"
                size={ICON_SIZES.LG}
                color={Colors.spiritual}
              />
              <Text variant="h5" color="text" style={styles.sectionTitle}>
                Prayers
              </Text>
            </View>
            {todayRecord?.prayers.map(prayer => (
              <View key={prayer.id} style={styles.activityItem}>
                <View style={styles.activityInfo}>
                  <Text variant="body" color="text" style={styles.activityName}>
                    {prayer.name}
                  </Text>
                  <Text
                    variant="caption"
                    color="textSecondary"
                    style={styles.activityTime}
                  >
                    Target: {prayer.targetTime}
                    {prayer.actualTime && ` | Actual: ${prayer.actualTime}`}
                  </Text>
                  <View style={styles.qualityStars}>
                    {renderStars(prayer.quality)}
                  </View>
                </View>
                <View style={styles.activityStatus}>
                  <Icon
                    name={prayer.completed ? 'check-circle' : 'clock-outline'}
                    size={ICON_SIZES.LG}
                    color={prayer.completed ? Colors.success : Colors.warning}
                  />
                </View>
              </View>
            ))}
            <Button
              variant={ButtonVariant.OUTLINED}
              title="Manage Prayers"
              onPress={() => navigation.navigate(ROUTES.PRAYER_DETAIL, { prayerId: 'fajr' })}
              buttonStyle={styles.detailButton}
            />
        </Card>

        {/* Zikr Section */}
        <Card style={styles.card}>
            <View style={styles.sectionHeader}>
              <Icon
                name="hands-pray"
                size={ICON_SIZES.LG}
                color={Colors.spiritual}
              />
              <Text variant="h5" color="text" style={styles.sectionTitle}>
                Zikr Sessions
              </Text>
            </View>
            {todayRecord?.zikrSessions.map(session => (
              <View key={session.id} style={styles.activityItem}>
                <View style={styles.activityInfo}>
                  <Text variant="body" color="text" style={styles.activityName}>
                    {session.type === 'morning'
                      ? 'Morning Zikr'
                      : 'Evening Zikr'}
                  </Text>
                  <Text
                    variant="caption"
                    color="textSecondary"
                    style={styles.activityTime}
                  >
                    40 minutes session
                  </Text>
                  <View style={styles.qualityStars}>
                    {renderStars(session.quality)}
                  </View>
                  <View style={styles.zikrProgress}>
                    <Text
                      variant="captionSmall"
                      color="textSecondary"
                      style={styles.progressText}
                    >
                      Progress:{' '}
                      {Object.values(session.subtasks).reduce(
                        (acc, task) => acc + task.completed,
                        0
                      )}
                      /1200 total
                    </Text>
                  </View>
                </View>
                <View style={styles.activityStatus}>
                  <Icon
                    name={session.completed ? 'check-circle' : 'clock-outline'}
                    size={ICON_SIZES.LG}
                    color={session.completed ? Colors.success : Colors.warning}
                  />
                </View>
              </View>
            ))}
            <Button
              variant={ButtonVariant.OUTLINED}
              title="Start Zikr Session"
              onPress={() => navigation.navigate(ROUTES.ZIKR_DETAIL, { sessionId: 'morning-zikr' })}
              buttonStyle={styles.detailButton}
            />
        </Card>

        {/* Quran Section */}
        <Card style={styles.card}>
            <View style={styles.sectionHeader}>
              <Icon
                name="book-open"
                size={ICON_SIZES.LG}
                color={Colors.primary}
              />
              <Text variant="h5" color="text" style={styles.sectionTitle}>
                Quran Recitation
              </Text>
            </View>
            <View style={styles.quranSessions}>
              <View style={styles.quranSession}>
                <Text variant="body" color="text" style={styles.sessionType}>
                  Arabic Recitation
                </Text>
                <View style={styles.qualityStars}>
                  {renderStars(
                    todayRecord?.quranSession.arabicRecitation.quality || 1
                  )}
                </View>
                <Text
                  variant="caption"
                  color="textSecondary"
                  style={styles.duration}
                >
                  {todayRecord?.quranSession.arabicRecitation.duration || 0}{' '}
                  minutes
                </Text>
              </View>
              <View style={styles.quranSession}>
                <Text variant="body" color="text" style={styles.sessionType}>
                  Translation & Reflection
                </Text>
                <View style={styles.qualityStars}>
                  {renderStars(
                    todayRecord?.quranSession.translation.quality || 1
                  )}
                </View>
                <Text
                  variant="caption"
                  color="textSecondary"
                  style={styles.duration}
                >
                  {todayRecord?.quranSession.translation.duration || 0} minutes
                </Text>
              </View>
            </View>
            <Button
              variant={ButtonVariant.OUTLINED}
              title="Log Quran Session"
              onPress={() => navigation.navigate(ROUTES.QURAN_DETAIL)}
              buttonStyle={styles.detailButton}
            />
        </Card>

        {/* Family Time Section */}
        <Card style={styles.card}>
            <View style={styles.sectionHeader}>
              <Icon name="heart" size={ICON_SIZES.LG} color={Colors.family} />
              <Text variant="h5" color="text" style={styles.sectionTitle}>
                Family Time
              </Text>
            </View>
            {todayRecord?.familyTime.length === 0 ? (
              <Text variant="body" color="textSecondary">
                No family time logged yet today
              </Text>
            ) : (
              todayRecord?.familyTime.map(ft => (
                <View key={ft.id} style={styles.activityItem}>
                  <View style={styles.activityInfo}>
                    <Text
                      variant="body"
                      color="text"
                      style={styles.activityName}
                    >
                      {ft.timeSlot} - {ft.duration} minutes
                    </Text>
                    <View style={styles.qualityStars}>
                      {renderStars(ft.quality)}
                    </View>
                  </View>
                </View>
              ))
            )}
            <Button
              variant={ButtonVariant.OUTLINED}
              title="Log Family Time"
              onPress={() => navigation.navigate(ROUTES.FAMILY_TIME_DETAIL)}
              buttonStyle={styles.detailButton}
            />
        </Card>

        {/* Exercise Section */}
        <Card style={styles.card}>
            <View style={styles.sectionHeader}>
              <Icon
                name="dumbbell"
                size={ICON_SIZES.LG}
                color={Colors.accent}
              />
              <Text variant="h5" color="text" style={styles.sectionTitle}>
                Exercise
              </Text>
            </View>
            <View style={styles.exerciseProgress}>
              <View style={styles.exerciseComponent}>
                <Text variant="body" color="text">
                  Warm-up:{' '}
                  {todayRecord?.exercise.warmup.completed ? '✅' : '⏳'}
                </Text>
              </View>
              <View style={styles.exerciseComponent}>
                <Text variant="body" color="text">
                  Main Activity:{' '}
                  {todayRecord?.exercise.mainActivity.completed ? '✅' : '⏳'}
                  {todayRecord?.exercise.mainActivity.activity &&
                    ` (${todayRecord.exercise.mainActivity.activity})`}
                </Text>
              </View>
              <View style={styles.exerciseComponent}>
                <Text variant="body" color="text">
                  Cool-down:{' '}
                  {todayRecord?.exercise.cooldown.completed ? '✅' : '⏳'}
                </Text>
              </View>
            </View>
            <View style={styles.qualityStars}>
              {renderStars(todayRecord?.exercise.quality || 1)}
            </View>
        </Card>

        <View style={styles.bottomPadding} />
      </ScrollView>

      {/* Floating Action Button */}
      <FAB
        icon={<Icon name="plus" size={ICON_SIZES.LG} color="white" />}
        buttonStyle={[styles.fab, { backgroundColor: Colors.primary }]}
        onPress={() => navigation.navigate(ROUTES.DISCIPLINE_CHALLENGES)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    padding: SPACING.MD,
  },
  card: {
    marginBottom: SPACING.MD,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.SM + SPACING.XS, // 12px
  },
  sectionTitle: {
    marginLeft: SPACING.SM,
  },
  activityItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.SM,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  activityInfo: {
    flex: 1,
  },
  activityName: {
    marginBottom: SPACING.XS,
  },
  activityTime: {
    marginBottom: SPACING.XS,
  },
  activityStatus: {
    marginLeft: SPACING.SM + SPACING.XS, // 12px
  },
  qualityStars: {
    flexDirection: 'row',
    marginTop: SPACING.XS,
  },
  detailButton: {
    marginTop: SPACING.SM + SPACING.XS, // 12px
  },
  zikrProgress: {
    marginTop: SPACING.XS,
  },
  progressText: {
  },
  quranSessions: {
    marginBottom: SPACING.SM + SPACING.XS, // 12px
  },
  quranSession: {
    paddingVertical: SPACING.SM,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  sessionType: {
    marginBottom: SPACING.XS,
  },
  duration: {
    marginTop: SPACING.XS,
  },
  exerciseProgress: {
    marginBottom: SPACING.SM + SPACING.XS, // 12px
  },
  exerciseComponent: {
    paddingVertical: SPACING.XS,
  },
  fab: {
    position: 'absolute',
    margin: SPACING.MD,
    right: 0,
    bottom: 0,
  },
  bottomPadding: {
    height: 80,
  },
});

export default TodayScreen;

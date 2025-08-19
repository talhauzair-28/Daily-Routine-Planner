import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Card, FAB, Paragraph, Title, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';

import { Colors } from '@/constants/Colors';
import { RootState } from '@/store';

const TodayScreen: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  
  const { todayRecord } = useSelector((state: RootState) => state.habits);
  // Removed unused variables
  // const { todayChallenges } = useSelector((state: RootState) => state.discipline);
  // const getQualityColor = (quality: number) => { ... };

  const renderStars = (quality: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name={index < quality ? 'star' : 'star-outline'}
        size={16}
        color={index < quality ? Colors.accent : Colors.textSecondary}
      />
    ));
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView style={styles.scrollView}>
        {/* Today's Overview */}
        <Card style={styles.card}>
          <Card.Content>
            <Title>Today&apos;s Progress</Title>
            <Paragraph style={{ color: theme.colors.onSurfaceVariant }}>
              {todayRecord?.dayOfWeek} - {todayRecord?.workType === 'office' ? 'Office Day' : 
               todayRecord?.workType === 'wfh' ? 'Work From Home' : 'Weekend'}
            </Paragraph>
          </Card.Content>
        </Card>

        {/* Prayers Section */}
        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.sectionHeader}>
              <Icon name="mosque" size={24} color={Colors.spiritual} />
              <Title style={styles.sectionTitle}>Prayers</Title>
            </View>
            {todayRecord?.prayers.map((prayer) => (
              <View key={prayer.id} style={styles.activityItem}>
                <View style={styles.activityInfo}>
                  <Paragraph style={styles.activityName}>
                    {prayer.name}
                  </Paragraph>
                  <Paragraph style={styles.activityTime}>
                    Target: {prayer.targetTime}
                    {prayer.actualTime && ` | Actual: ${prayer.actualTime}`}
                  </Paragraph>
                  <View style={styles.qualityStars}>
                    {renderStars(prayer.quality)}
                  </View>
                </View>
                <View style={styles.activityStatus}>
                  <Icon
                    name={prayer.completed ? 'check-circle' : 'clock-outline'}
                    size={24}
                    color={prayer.completed ? Colors.success : Colors.warning}
                  />
                </View>
              </View>
            ))}
            <Button 
              mode="outlined" 
              onPress={() => navigation.navigate('PrayerDetail' as never, { prayerId: 'fajr' } as never)}
              style={styles.detailButton}
            >
              Manage Prayers
            </Button>
          </Card.Content>
        </Card>

        {/* Zikr Section */}
        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.sectionHeader}>
              <Icon name="hands-pray" size={24} color={Colors.spiritual} />
              <Title style={styles.sectionTitle}>Zikr Sessions</Title>
            </View>
            {todayRecord?.zikrSessions.map((session) => (
              <View key={session.id} style={styles.activityItem}>
                <View style={styles.activityInfo}>
                  <Paragraph style={styles.activityName}>
                    {session.type === 'morning' ? 'Morning Zikr' : 'Evening Zikr'}
                  </Paragraph>
                  <Paragraph style={styles.activityTime}>
                    40 minutes session
                  </Paragraph>
                  <View style={styles.qualityStars}>
                    {renderStars(session.quality)}
                  </View>
                  <View style={styles.zikrProgress}>
                    <Paragraph style={styles.progressText}>
                      Progress: {Object.values(session.subtasks).reduce((acc, task) => 
                        acc + task.completed, 0)}/1200 total
                    </Paragraph>
                  </View>
                </View>
                <View style={styles.activityStatus}>
                  <Icon
                    name={session.completed ? 'check-circle' : 'clock-outline'}
                    size={24}
                    color={session.completed ? Colors.success : Colors.warning}
                  />
                </View>
              </View>
            ))}
            <Button 
              mode="outlined" 
              onPress={() => navigation.navigate('ZikrDetail' as never, { sessionId: 'morning-zikr' } as never)}
              style={styles.detailButton}
            >
              Start Zikr Session
            </Button>
          </Card.Content>
        </Card>

        {/* Quran Section */}
        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.sectionHeader}>
              <Icon name="book-open" size={24} color={Colors.primary} />
              <Title style={styles.sectionTitle}>Quran Recitation</Title>
            </View>
            <View style={styles.quranSessions}>
              <View style={styles.quranSession}>
                <Paragraph style={styles.sessionType}>Arabic Recitation</Paragraph>
                <View style={styles.qualityStars}>
                  {renderStars(todayRecord?.quranSession.arabicRecitation.quality || 1)}
                </View>
                <Paragraph style={styles.duration}>
                  {todayRecord?.quranSession.arabicRecitation.duration || 0} minutes
                </Paragraph>
              </View>
              <View style={styles.quranSession}>
                <Paragraph style={styles.sessionType}>Translation & Reflection</Paragraph>
                <View style={styles.qualityStars}>
                  {renderStars(todayRecord?.quranSession.translation.quality || 1)}
                </View>
                <Paragraph style={styles.duration}>
                  {todayRecord?.quranSession.translation.duration || 0} minutes
                </Paragraph>
              </View>
            </View>
            <Button 
              mode="outlined" 
              onPress={() => navigation.navigate('QuranDetail' as never)}
              style={styles.detailButton}
            >
              Log Quran Session
            </Button>
          </Card.Content>
        </Card>

        {/* Family Time Section */}
        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.sectionHeader}>
              <Icon name="heart" size={24} color={Colors.family} />
              <Title style={styles.sectionTitle}>Family Time</Title>
            </View>
            {todayRecord?.familyTime.length === 0 ? (
              <Paragraph style={{ color: theme.colors.onSurfaceVariant }}>
                No family time logged yet today
              </Paragraph>
            ) : (
              todayRecord?.familyTime.map((ft) => (
                <View key={ft.id} style={styles.activityItem}>
                  <View style={styles.activityInfo}>
                    <Paragraph style={styles.activityName}>
                      {ft.timeSlot} - {ft.duration} minutes
                    </Paragraph>
                    <View style={styles.qualityStars}>
                      {renderStars(ft.quality)}
                    </View>
                  </View>
                </View>
              ))
            )}
            <Button 
              mode="outlined" 
              onPress={() => navigation.navigate('FamilyTimeDetail' as never)}
              style={styles.detailButton}
            >
              Log Family Time
            </Button>
          </Card.Content>
        </Card>

        {/* Exercise Section */}
        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.sectionHeader}>
              <Icon name="dumbbell" size={24} color={Colors.accent} />
              <Title style={styles.sectionTitle}>Exercise</Title>
            </View>
            <View style={styles.exerciseProgress}>
              <View style={styles.exerciseComponent}>
                <Paragraph>Warm-up: {todayRecord?.exercise.warmup.completed ? '✅' : '⏳'}</Paragraph>
              </View>
              <View style={styles.exerciseComponent}>
                <Paragraph>
                  Main Activity: {todayRecord?.exercise.mainActivity.completed ? '✅' : '⏳'}
                  {todayRecord?.exercise.mainActivity.activity && ` (${todayRecord.exercise.mainActivity.activity})`}
                </Paragraph>
              </View>
              <View style={styles.exerciseComponent}>
                <Paragraph>Cool-down: {todayRecord?.exercise.cooldown.completed ? '✅' : '⏳'}</Paragraph>
              </View>
            </View>
            <View style={styles.qualityStars}>
              {renderStars(todayRecord?.exercise.quality || 1)}
            </View>
          </Card.Content>
        </Card>

        <View style={styles.bottomPadding} />
      </ScrollView>

      {/* Floating Action Button */}
      <FAB
        icon="plus"
        style={[styles.fab, { backgroundColor: theme.colors.primary }]}
        onPress={() => navigation.navigate('DisciplineChallenges' as never)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    padding: 16,
  },
  card: {
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    marginLeft: 8,
  },
  activityItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  activityInfo: {
    flex: 1,
  },
  activityName: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  activityTime: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  activityStatus: {
    marginLeft: 12,
  },
  qualityStars: {
    flexDirection: 'row',
    marginTop: 4,
  },
  detailButton: {
    marginTop: 12,
  },
  zikrProgress: {
    marginTop: 4,
  },
  progressText: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  quranSessions: {
    marginBottom: 12,
  },
  quranSession: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  sessionType: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  duration: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  exerciseProgress: {
    marginBottom: 12,
  },
  exerciseComponent: {
    paddingVertical: 4,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  bottomPadding: {
    height: 80,
  },
});

export default TodayScreen;

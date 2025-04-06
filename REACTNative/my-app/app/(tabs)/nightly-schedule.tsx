import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Platform,
  SafeAreaView,
  FlatList,
} from 'react-native';
import { router, useFocusEffect } from 'expo-router';
import { useState, useEffect, useCallback } from 'react';
import { Calendar } from 'react-native-calendars';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Reminder {
  id: string;
  time: string;
  description: string;
}

const getLocalDateString = (date = new Date()) => {
  const year = date.getFullYear();
  const month = (`0${date.getMonth() + 1}`).slice(-2);
  const day = (`0${date.getDate()}`).slice(-2);
  return `${year}-${month}-${day}`;
};

export default function NightlyScheduleScreen() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const todayDateString = getLocalDateString(currentDateTime);
  const [reminders, setReminders] = useState<Reminder[]>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadRemindersForToday();
    }, [todayDateString])
  );

  const loadRemindersForToday = async () => {
    try {
      const storedReminders = await AsyncStorage.getItem(`reminders-${todayDateString}`);
      if (storedReminders) {
        setReminders(JSON.parse(storedReminders));
      } else {
        setReminders([]);
      }
    } catch (error) {
      console.error('Error loading reminders:', error);
    }
  };

  const handleDayPress = (day: { dateString: string }) => {
    router.push({
      pathname: '/reminder',
      params: { date: day.dateString },
    });
  };

  const handleTodayReminderPress = () => {
    router.push({
      pathname: '/reminder',
      params: { date: todayDateString },
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Back Button */}
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#ffffff" />
        </TouchableOpacity>

        {/* Title */}
        <Text style={styles.header}>Nightly Schedule</Text>

        {/* Calendar */}
        <Calendar
          onDayPress={handleDayPress}
          markedDates={{
            [todayDateString]: { selected: true, selectedColor: 'blue' },
          }}
          theme={{
            calendarBackground: '#1a1a2e',
            textSectionTitleColor: '#ffffff',
            selectedDayBackgroundColor: '#3498db',
            selectedDayTextColor: '#ffffff',
            todayTextColor: '#e74c3c',
            dayTextColor: '#ffffff',
            textDisabledColor: '#7f8c8d',
            arrowColor: '#ffffff',
            monthTextColor: '#ffffff',
            indicatorColor: '#ffffff',
          }}
        />

        {/* Today Reminder Button */}
        <TouchableOpacity style={styles.todayButton} onPress={handleTodayReminderPress}>
          <Text style={styles.todayButtonText}>Set Today's Reminders</Text>
        </TouchableOpacity>

        {/* Time Display */}
        <Text style={styles.currentTime}>
          Current Time: {currentDateTime.toLocaleTimeString()}
        </Text>

        {/* Reminder List */}
        <Text style={styles.reminderHeading}>Reminders for Today</Text>

        <FlatList
          data={reminders}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.reminderList}
          ListEmptyComponent={
            <Text style={styles.noReminders}>No reminders for today.</Text>
          }
          renderItem={({ item }) => (
            <View style={styles.reminderItem}>
              <Text style={styles.reminderText}>
                {item.time} - {item.description}
              </Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight || 25 : 0,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 10,
    marginLeft: 5,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 20,
    textAlign: 'center',
  },
  currentTime: {
    marginTop: 10,
    fontSize: 16,
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 20,
  },
  todayButton: {
    backgroundColor: '#4a90e2',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
  },
  todayButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  reminderHeading: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  reminderList: {
    paddingBottom: 100,
  },
  reminderItem: {
    backgroundColor: '#2c2c54',
    padding: 12,
    borderRadius: 6,
    marginBottom: 10,
  },
  reminderText: {
    color: '#ffffff',
    fontSize: 16,
  },
  noReminders: {
    color: '#888',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
});

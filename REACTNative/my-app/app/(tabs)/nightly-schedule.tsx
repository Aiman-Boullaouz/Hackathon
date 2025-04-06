import { StyleSheet, TouchableOpacity, Platform, View } from 'react-native';
import { router } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useState, useEffect } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { notificationManager } from '@/utils/notificationManager';
import { Ionicons } from '@expo/vector-icons';
import { Calendar } from 'react-native-calendars';

export default function NightlyScheduleScreen() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [notificationStatus, setNotificationStatus] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    // Update time every second
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(timer);
  }, []);

  const handleTimeChange = async (event: any, selectedDate?: Date) => {
    setShowTimePicker(false);
    if (selectedDate) {
      setSelectedTime(selectedDate);
      try {
        const result = await notificationManager.scheduleJournalReminder(
          selectedDate.getHours(),
          selectedDate.getMinutes()
        );
        setNotificationStatus(`Notification set for ${result.nextTrigger}`);
      } catch (error) {
        setNotificationStatus('Failed to set notification. Please check permissions.');
      }
    }
  };

  // Format the date and time
  const formattedDate = currentDateTime.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const formattedTime = currentDateTime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
      <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.push('/explore')}
        >
          <Ionicons name="arrow-back" size={24} color="#ffffff" />
        </TouchableOpacity>
      </ThemedView>
      <ThemedView style={styles.contentContainer}>
        <ThemedText type="title" style={styles.title}>Nightly Schedule</ThemedText>
        <ThemedText style={styles.subtitle}>Plan your evening routine</ThemedText>
        
        <View style={styles.calendarContainer}>
          <Calendar
            onDayPress={day => {
              setSelectedDate(day.dateString);
            }}
            markedDates={{
              [selectedDate]: {selected: true, marked: true, dotColor: '#4a90e2'}
            }}
            theme={{
              backgroundColor: '#1a1a2e',
              calendarBackground: '#1a1a2e',
              textSectionTitleColor: '#e6e6e6',
              selectedDayBackgroundColor: '#4a90e2',
              selectedDayTextColor: '#ffffff',
              todayTextColor: '#4a90e2',
              dayTextColor: '#e6e6e6',
              textDisabledColor: '#666666',
              dotColor: '#4a90e2',
              selectedDotColor: '#ffffff',
              arrowColor: '#4a90e2',
              monthTextColor: '#e6e6e6',
              indicatorColor: '#4a90e2',
              textDayFontWeight: '300',
              textMonthFontWeight: 'bold',
              textDayHeaderFontWeight: '300',
              textDayFontSize: 16,
              textMonthFontSize: 16,
              textDayHeaderFontSize: 16
            }}
          />
        </View>

        <ThemedView style={styles.datetimeContainer}>
          <ThemedText style={styles.dateText}>{formattedDate}</ThemedText>
          <ThemedText style={styles.timeText}>{formattedTime}</ThemedText>
        </ThemedView>

        <TouchableOpacity 
          style={styles.setTimeButton}
          onPress={() => setShowTimePicker(true)}
        >
          <ThemedText style={styles.buttonText}>Set Journal Reminder</ThemedText>
        </TouchableOpacity>

        {notificationStatus ? (
          <ThemedText style={styles.statusText}>{notificationStatus}</ThemedText>
        ) : null}

        {showTimePicker && (
          <DateTimePicker
            value={selectedTime}
            mode="time"
            is24Hour={false}
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={handleTimeChange}
          />
        )}
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  header: {
    padding: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#e6e6e6',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
    marginTop: 40,
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
    color: '#b3b3b3',
    fontStyle: 'italic',
    marginBottom: 20,
  },
  calendarContainer: {
    marginVertical: 20,
    borderRadius: 10,
    overflow: 'hidden',
  },
  datetimeContainer: {
    alignItems: 'center',
    marginVertical: 20,
    padding: 15,
    backgroundColor: 'rgba(74, 144, 226, 0.1)',
    borderRadius: 10,
  },
  dateText: {
    fontSize: 20,
    color: '#e6e6e6',
    marginBottom: 5,
  },
  timeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4a90e2',
  },
  setTimeButton: {
    backgroundColor: 'rgba(74, 144, 226, 0.2)',
    padding: 15,
    borderRadius: 10,
    marginVertical: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#e6e6e6',
    fontSize: 18,
    fontWeight: 'bold',
  },
  statusText: {
    textAlign: 'center',
    color: '#4a90e2',
    marginTop: 10,
    fontSize: 16,
  },
}); 
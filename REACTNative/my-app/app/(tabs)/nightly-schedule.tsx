import { StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useState, useEffect } from 'react';

export default function NightlyScheduleScreen() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    // Update time every second
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(timer);
  }, []);

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
      <ThemedView style={styles.contentContainer}>
        <ThemedText type="title" style={styles.title}>Nightly Schedule</ThemedText>
        <ThemedText style={styles.subtitle}>Plan your evening routine</ThemedText>
        
        <ThemedView style={styles.datetimeContainer}>
          <ThemedText style={styles.dateText}>{formattedDate}</ThemedText>
          <ThemedText style={styles.timeText}>{formattedTime}</ThemedText>
        </ThemedView>

        {/* Schedule content will go here */}
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
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
  comingSoon: {
    fontSize: 24,
    textAlign: 'center',
    color: '#4a90e2',
    marginTop: 40,
    fontStyle: 'italic',
  },
}); 
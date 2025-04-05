import { StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function NightlyScheduleScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.contentContainer}>
        <ThemedText type="title" style={styles.title}>Nightly Schedule</ThemedText>
        <ThemedText style={styles.subtitle}>Plan your evening routine</ThemedText>
        
        {/* Schedule content will go here */}
        <ThemedText style={styles.comingSoon}>Coming Soon!</ThemedText>
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
  comingSoon: {
    fontSize: 24,
    textAlign: 'center',
    color: '#4a90e2',
    marginTop: 40,
    fontStyle: 'italic',
  },
}); 
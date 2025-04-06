import { StyleSheet, Platform, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { router } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function TabTwoScreen() {
  const handleJournalPress = () => {
    router.push('/journal');
  };

  const handleNightlySchedulePress = () => {
    router.push('/nightly-schedule');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ThemedView style={styles.container}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <ThemedView style={styles.titleContainer}>
            <ThemedText type="title" style={styles.title}>Explore</ThemedText>
          </ThemedView>

          <TouchableOpacity style={styles.journalButton} onPress={handleJournalPress}>
            <ThemedText style={styles.journalButtonText}>Create a Journal Entry</ThemedText>
          </TouchableOpacity>

          <TouchableOpacity style={styles.nightlyScheduleButton} onPress={handleNightlySchedulePress}>
            <ThemedText style={styles.nightlyScheduleButtonText}>Nightly Schedule</ThemedText>
          </TouchableOpacity>
        </ScrollView>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  scrollView: {
    flex: 1,
    width: '100%',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  titleContainer: {
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#e6e6e6',
    textAlign: 'center',
  },
  journalButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: 'center',
    width: '100%',
  },
  journalButtonText: {
    color: '#e6e6e6',
    fontSize: 18,
    fontWeight: 'bold',
  },
  nightlyScheduleButton: {
    backgroundColor: 'rgba(74, 144, 226, 0.2)',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: 'center',
    width: '100%',
  },
  nightlyScheduleButtonText: {
    color: '#e6e6e6',
    fontSize: 18,
    fontWeight: 'bold',
  },
});


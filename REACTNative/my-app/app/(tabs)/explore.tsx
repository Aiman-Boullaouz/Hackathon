import { StyleSheet, Image, Platform, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import { LinearGradient } from 'expo-linear-gradient';

export default function TabTwoScreen() {
  const handleJournalPress = () => {
    router.push('/journal');
  };

  const handleNightlySchedulePress = () => {
    router.push('/nightly-schedule');
  };

  const title_background = 'rgba(255,255,255,0.05)';
  const button_background = 'rgba(74, 144, 226, 0.2)';
  const button_border = 'rgba(74, 144, 226, 0.2)';

  return (
    <ThemedView style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title" style={styles.title}>Explore</ThemedText>
        </ThemedView>
        
        <LinearGradient
          colors={[title_background, title_background, title_background]}
          style={styles.journalButton}
        >
          <TouchableOpacity onPress={handleJournalPress}>
            <ThemedText style={styles.journalButtonText}>Create a Journal Entry</ThemedText>
          </TouchableOpacity>
        </LinearGradient>

        <LinearGradient
          colors={[title_background, title_background, title_background]}
          style={styles.nightlyScheduleButton}
        >
          <TouchableOpacity onPress={handleNightlySchedulePress}>
            <ThemedText style={styles.nightlyScheduleButtonText}>Nightly Schedule</ThemedText>
          </TouchableOpacity>
        </LinearGradient>
      </ScrollView>
    </ThemedView>
  );
}


const title_background = 'rgba(255,255,255,0.05)';
const button_background = 'rgba(74, 144, 226, 0.2)';
const button_border = 'rgba(74, 144, 226, 0.2)';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(26, 26, 46, 1.00)', // background color for the page
    paddingTop: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  titleContainer: {
    marginVertical: 20,
    padding: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    // backgroundColor: 'rgba(255,255,255,0.05)',
    // borderColor: 'rgba(255,255,255,0.05)',
    // '#e6e6e6'  old color
    textAlign: 'center',
  },
  journalButton: {
    backgroundColor: button_border,
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: 'center',
  },
  journalButtonText: {
    color: '#e6e6e6',
    fontSize: 18,
    fontWeight: 'bold',
  },
  nightlyScheduleButton: {
    backgroundColor: button_border,
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: 'center',
  },
  nightlyScheduleButtonText: {
    color: '#e6e6e6',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

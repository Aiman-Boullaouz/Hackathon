import { StyleSheet, Image, Platform, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';

export default function TabTwoScreen() {
  const handleJournalPress = () => {
    router.push('/journal');
  };

  const handleNightlySchedulePress = () => {
    router.push('/nightly-schedule');
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title" style={styles.title}>Explore</ThemedText>
        </ThemedView>
        
        <TouchableOpacity 
          style={styles.journalButton}
          onPress={handleJournalPress}
        >
          <ThemedText style={styles.journalButtonText}>Create a Journal Entry</ThemedText>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.nightlyScheduleButton}
          onPress={handleNightlySchedulePress}
        >
          <ThemedText style={styles.nightlyScheduleButtonText}>Nightly Schedule</ThemedText>
        </TouchableOpacity>

        <Collapsible title="Android, iOS, and web support">
          <ThemedText>
            You can open this project on Android, iOS, and the web. To open the web version, press{' '}
            <ThemedText type="defaultSemiBold">w</ThemedText> in the terminal running this project.
          </ThemedText>
        </Collapsible>

        <Collapsible title="Custom fonts">
          <ThemedText>
            Open <ThemedText type="defaultSemiBold">app/_layout.tsx</ThemedText> to see how to load{' '}
            <ThemedText style={{ fontFamily: 'SpaceMono' }}>
              custom fonts such as this one.
            </ThemedText>
          </ThemedText>
          <ExternalLink href="https://docs.expo.dev/versions/latest/sdk/font">
            <ThemedText type="link">Learn more</ThemedText>
          </ExternalLink>
        </Collapsible>

        <Collapsible title="Light and dark mode components">
          <ThemedText>
            This template has light and dark mode support. The{' '}
            <ThemedText type="defaultSemiBold">useColorScheme()</ThemedText> hook lets you inspect
            what the user's current color scheme is.
          </ThemedText>
          <ExternalLink href="https://docs.expo.dev/develop/user-interface/color-themes/">
            <ThemedText type="link">Learn more</ThemedText>
          </ExternalLink>
        </Collapsible>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  titleContainer: {
    marginVertical: 20,
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
  },
  nightlyScheduleButtonText: {
    color: '#e6e6e6',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

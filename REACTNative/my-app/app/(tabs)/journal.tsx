import { StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { router } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useState } from 'react';

export default function JournalScreen() {
  const [journalEntry, setJournalEntry] = useState('');

  const handleSave = () => {
    if (journalEntry.trim()) {
      // Here you would typically save to a database or storage
      Alert.alert('Success', 'Journal entry saved!');
      setJournalEntry('');
    } else {
      Alert.alert('Error', 'Please write something before saving');
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.contentContainer}>
        <ThemedText type="title" style={styles.title}>Journal Entry</ThemedText>
        <ThemedText style={styles.subtitle}>Write about your day</ThemedText>
        
        <TextInput
          style={styles.input}
          multiline
          placeholder="Start writing your thoughts..."
          placeholderTextColor="#666"
          value={journalEntry}
          onChangeText={setJournalEntry}
        />

        <TouchableOpacity 
          style={styles.saveButton}
          onPress={handleSave}
        >
          <ThemedText style={styles.saveButtonText}>Save Entry</ThemedText>
        </TouchableOpacity>
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
  input: {
    flex: 1,
    backgroundColor: '#2a2a3e',
    color: '#ffffff',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    textAlignVertical: 'top',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#3a3a4e',
  },
  saveButton: {
    backgroundColor: '#4a90e2',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
}); 
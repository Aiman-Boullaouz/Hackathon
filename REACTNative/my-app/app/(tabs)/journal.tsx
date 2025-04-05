import { StyleSheet, TouchableOpacity, TextInput, Alert, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useState, useEffect } from 'react';
import { journalStorage, JournalEntry } from '@/utils/journalStorage';

export default function JournalScreen() {
  const [journalEntry, setJournalEntry] = useState('');
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load entries when component mounts
  useEffect(() => {
    loadEntries();
  }, []);

  const loadEntries = async () => {
    try {
      const allEntries = await journalStorage.getAllEntries();
      setEntries(allEntries);
    } catch (error) {
      console.error('Error loading entries:', error);
      Alert.alert('Error', 'Failed to load journal entries');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (journalEntry.trim()) {
      try {
        await journalStorage.saveEntry(journalEntry);
        Alert.alert('Success', 'Journal entry saved!');
        setJournalEntry('');
        loadEntries(); // Reload entries after saving
      } catch (error) {
        console.error('Error saving entry:', error);
        Alert.alert('Error', 'Failed to save journal entry');
      }
    } else {
      Alert.alert('Error', 'Please write something before saving');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await journalStorage.deleteEntry(id);
      loadEntries(); // Reload entries after deletion
      Alert.alert('Success', 'Entry deleted successfully');
    } catch (error) {
      console.error('Error deleting entry:', error);
      Alert.alert('Error', 'Failed to delete entry');
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

        <ScrollView style={styles.entriesContainer}>
          {entries.map((entry) => (
            <ThemedView key={entry.id} style={styles.entryContainer}>
              <ThemedText style={styles.entryDate}>
                {new Date(entry.timestamp).toLocaleDateString()}
              </ThemedText>
              <ThemedText style={styles.entryContent}>{entry.content}</ThemedText>
              <TouchableOpacity 
                style={styles.deleteButton}
                onPress={() => handleDelete(entry.id)}
              >
                <ThemedText style={styles.deleteButtonText}>Delete</ThemedText>
              </TouchableOpacity>
            </ThemedView>
          ))}
        </ScrollView>
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
    height: 150,
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
  entriesContainer: {
    flex: 1,
  },
  entryContainer: {
    backgroundColor: '#2a2a3e',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#3a3a4e',
  },
  entryDate: {
    color: '#b3b3b3',
    fontSize: 14,
    marginBottom: 8,
  },
  entryContent: {
    color: '#ffffff',
    fontSize: 16,
    marginBottom: 10,
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
    padding: 8,
    borderRadius: 5,
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  deleteButtonText: {
    color: '#ffffff',
    fontSize: 14,
  },
}); 
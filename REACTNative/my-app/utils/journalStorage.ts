import AsyncStorage from '@react-native-async-storage/async-storage';

export interface JournalEntry {
  id: string;
  content: string;
  timestamp: number;
  title?: string;
  analysis?: string;
}

const JOURNAL_STORAGE_KEY = '@journal_entries';

export const journalStorage = {
  // Save a new journal entry
  async saveEntry(content: string, title?: string, analysis?: string): Promise<JournalEntry> {
    try {
      const entries = await this.getAllEntries();
      
      const newEntry: JournalEntry = {
        id: Date.now().toString(),
        content,
        timestamp: Date.now(),
        title,
        analysis
      };

      entries.unshift(newEntry); // Add new entry at the beginning
      await AsyncStorage.setItem(JOURNAL_STORAGE_KEY, JSON.stringify(entries));
      
      return newEntry;
    } catch (error) {
      console.error('Error saving journal entry:', error);
      throw error;
    }
  },

  // Get all journal entries
  async getAllEntries(): Promise<JournalEntry[]> {
    try {
      const entriesJson = await AsyncStorage.getItem(JOURNAL_STORAGE_KEY);
      return entriesJson ? JSON.parse(entriesJson) : [];
    } catch (error) {
      console.error('Error getting journal entries:', error);
      return [];
    }
  },

  // Get a specific entry by ID
  async getEntry(id: string): Promise<JournalEntry | null> {
    try {
      const entries = await this.getAllEntries();
      return entries.find(entry => entry.id === id) || null;
    } catch (error) {
      console.error('Error getting journal entry:', error);
      return null;
    }
  },

  // Delete an entry
  async deleteEntry(id: string): Promise<boolean> {
    try {
      const entries = await this.getAllEntries();
      const filteredEntries = entries.filter(entry => entry.id !== id);
      await AsyncStorage.setItem(JOURNAL_STORAGE_KEY, JSON.stringify(filteredEntries));
      return true;
    } catch (error) {
      console.error('Error deleting journal entry:', error);
      return false;
    }
  },

  // Update an entry
  async updateEntry(id: string, content: string, title?: string, analysis?: string): Promise<JournalEntry | null> {
    try {
      const entries = await this.getAllEntries();
      const entryIndex = entries.findIndex(entry => entry.id === id);
      
      if (entryIndex === -1) return null;

      const updatedEntry: JournalEntry = {
        ...entries[entryIndex],
        content,
        title,
        analysis
      };

      entries[entryIndex] = updatedEntry;
      await AsyncStorage.setItem(JOURNAL_STORAGE_KEY, JSON.stringify(entries));
      
      return updatedEntry;
    } catch (error) {
      console.error('Error updating journal entry:', error);
      return null;
    }
  },
}; 
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Platform,
  StatusBar,
  TextInput,
  FlatList,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import { Ionicons } from '@expo/vector-icons';

interface Reminder {
  id: string;
  time: string;
  description: string;
}

export default function ReminderScreen() {
  const { date } = useLocalSearchParams();
  const router = useRouter();
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [reminderDescription, setReminderDescription] = useState('');
  const [reminders, setReminders] = useState<Reminder[]>([]);

  useEffect(() => {
    loadReminders();
    requestNotificationPermissions();

    const subscription = Notifications.addNotificationReceivedListener(notification => {
      console.log("📬 Notification received:", notification);
      Alert.alert("Reminder", notification.request.content.body ?? "No content available");
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const loadReminders = async () => {
    try {
      const storedReminders = await AsyncStorage.getItem(`reminders-${date}`);
      if (storedReminders) {
        setReminders(JSON.parse(storedReminders));
      }
    } catch (error) {
      console.error('Error loading reminders:', error);
    }
  };

  const saveReminders = async (newReminders: Reminder[]) => {
    try {
      await AsyncStorage.setItem(`reminders-${date}`, JSON.stringify(newReminders));
      setReminders(newReminders);
    } catch (error) {
      console.error('Error saving reminders:', error);
    }
  };

  const requestNotificationPermissions = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    console.log("Notification permission status:", status);
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'You need to enable notifications to use this feature.');
    }
  };

  const scheduleNotification = async (reminderDate: Date, description: string) => {
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Reminder',
          body: description,
          sound: true,
        },
        trigger: {
          type: 'date',
          date: reminderDate,
        } as Notifications.DateTriggerInput,
      });
      console.log('✅ Notification scheduled for:', reminderDate.toISOString());
    } catch (error) {
      console.error('Error scheduling notification:', error);
    }
  };

  const handleAddReminder = async () => {
    if (!reminderDescription.trim()) {
      Alert.alert('Error', 'Please enter a description for the reminder.');
      return;
    }

    const [year, month, day] = (date as string).split('-').map(Number);
    const reminderDate = new Date(year, month - 1, day, selectedTime.getHours(), selectedTime.getMinutes());

    if (reminderDate <= new Date()) {
      Alert.alert('Invalid Time', 'The reminder time must be in the future.');
      return;
    }

    const newReminder: Reminder = {
      id: Date.now().toString(),
      time: reminderDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      description: reminderDescription.trim(),
    };

    const updatedReminders = [...reminders, newReminder];
    await saveReminders(updatedReminders);
    await scheduleNotification(reminderDate, newReminder.description);

    setReminderDescription('');
    Alert.alert('Reminder Added', `Reminder set for ${newReminder.time}`);
  };

  const handleDeleteReminder = async (id: string): Promise<void> => {
    const updatedReminders = reminders.filter(reminder => reminder.id !== id);
    await saveReminders(updatedReminders);
  };

  const handleTimeChange = (event: any, selected?: Date) => {
    setShowTimePicker(false);
    if (selected) {
      setSelectedTime(selected);
    }
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="#ffffff" />
      </TouchableOpacity>

      <View style={styles.centeredContent}>
        <Text style={styles.title}>Set Reminder for {date}</Text>

        <TextInput
          style={styles.input}
          placeholder="What do you need to do?"
          placeholderTextColor="#aaa"
          value={reminderDescription}
          onChangeText={setReminderDescription}
        />

        <TouchableOpacity style={styles.timePickerButton} onPress={() => setShowTimePicker(true)}>
          <Text style={styles.timePickerButtonText}>
            {`Pick a Time: ${selectedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`}
          </Text>
        </TouchableOpacity>

        {showTimePicker && (
          <DateTimePicker
            value={selectedTime}
            mode="time"
            is24Hour={true}
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={handleTimeChange}
          />
        )}

        <TouchableOpacity style={styles.addButton} onPress={handleAddReminder}>
          <Text style={styles.addButtonText}>Add Reminder</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={reminders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.reminderItem}>
            <Text style={styles.reminderText}>{item.time} - {item.description}</Text>
            <TouchableOpacity onPress={() => handleDeleteReminder(item.id)}>
              <Text style={styles.deleteButton}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#1a1a2e',
  },
  backButton: {
    alignSelf: 'flex-start',
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight || 20 : 40,
    marginBottom: 10,
    marginLeft: 5,
  },
  centeredContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    color: '#ffffff',
    width: '80%',
  },
  timePickerButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    width: '80%',
    alignItems: 'center',
  },
  timePickerButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  addButton: {
    backgroundColor: '#2ecc71',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    width: '80%',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  reminderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#2c2c54',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  reminderText: {
    fontSize: 16,
    color: '#ffffff',
  },
  deleteButton: {
    color: '#e74c3c',
    fontWeight: 'bold',
  },
});

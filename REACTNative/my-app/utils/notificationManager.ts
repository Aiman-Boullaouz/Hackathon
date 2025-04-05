import * as Notifications from 'expo-notifications';

// Configure notifications
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export const notificationManager = {
  // Request permissions
  async requestPermissions() {
    const { status } = await Notifications.requestPermissionsAsync();
    return status === 'granted';
  },

  // Schedule a notification
  async scheduleJournalReminder(hour: number, minute: number) {
    const hasPermission = await this.requestPermissions();
    
    if (!hasPermission) {
      throw new Error('Notification permissions not granted');
    }

    // Cancel any existing notifications first
    await Notifications.cancelAllScheduledNotificationsAsync();

    // Create a date object for the next occurrence of the specified time
    const now = new Date();
    const scheduledTime = new Date(now);
    scheduledTime.setHours(hour, minute, 0, 0); // Set hours and minutes, zero out seconds and ms

    // If the time has already passed today, schedule for tomorrow
    if (scheduledTime <= now) {
      scheduledTime.setDate(scheduledTime.getDate() + 1);
    }

    // Calculate seconds until first trigger
    const secondsUntilTrigger = Math.floor((scheduledTime.getTime() - now.getTime()) / 1000);

    // Schedule the notification
    const notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title: "Time to Journal!",
        body: "Take a moment to reflect on your day and write in your journal.",
        sound: true,
      },
      trigger: {
        seconds: secondsUntilTrigger,
      },
    });

    const formattedTime = scheduledTime.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });

    return {
      notificationId,
      nextTrigger: formattedTime
    };
  },

  // Cancel all scheduled notifications
  async cancelAllNotifications() {
    await Notifications.cancelAllScheduledNotificationsAsync();
  },

  // Get all pending notifications
  async getPendingNotifications() {
    return await Notifications.getAllScheduledNotificationsAsync();
  }
}; 
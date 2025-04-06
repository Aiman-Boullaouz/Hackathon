import { StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useEffect, useRef } from 'react';
import { router } from 'expo-router';

export default function HomeScreen() {
  const titleFadeAnim = useRef(new Animated.Value(0)).current;
  const subtitleFadeAnim = useRef(new Animated.Value(0)).current;
  const blinkAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Title animation
    Animated.timing(titleFadeAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();

    // Subtitle animation with delay
    setTimeout(() => {
      Animated.timing(subtitleFadeAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }).start();

      // Start blinking animation 2 seconds after subtitle appears
      setTimeout(() => {
        Animated.loop(
          Animated.sequence([
            Animated.timing(blinkAnim, {
              toValue: 1,
              duration: 1000,
              useNativeDriver: true,
            }),
            Animated.timing(blinkAnim, {
              toValue: 0,
              duration: 1000,
              useNativeDriver: true,
            }),
          ])
        ).start();
      }, 2000);
    }, 1000);
  }, []);

  const handlePress = () => {
    router.push('/explore');
  };

  return (
    <TouchableOpacity 
      style={styles.container} 
      activeOpacity={1} 
      onPress={handlePress}
    >
      <Animated.View style={[styles.animatedContainer]}>
        <Animated.View style={{ opacity: titleFadeAnim }}>
          <ThemedText type="title" style={styles.title}>PillowPath</ThemedText>
        </Animated.View>
        <Animated.View style={{ opacity: subtitleFadeAnim }}>
          <ThemedText type="subtitle" style={styles.subtitle}>Welcome To Your New Nightly Routine</ThemedText>
        </Animated.View>
      </Animated.View>
      <Animated.View style={[styles.tapContainer, { opacity: blinkAnim }]}>
        <ThemedText type="subtitle" style={styles.tapText}>Tap to begin</ThemedText>
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1a1a2e', // Deep navy background
  },
  animatedContainer: {
    alignItems: 'center',
    padding: 20,
    borderRadius: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.05)', // Very subtle white overlay
  },
  tapContainer: {
    position: 'absolute',
    bottom: 50,
  },
  title: {
    fontFamily: 'FjallaOne-Regular',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#e6e6e6', // Soft white
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
    padding: 20,
  },
  subtitle: {
    fontSize: 15,
    textAlign: 'center',
    marginTop: 30,
    color: '#b3b3b3', // Muted gray
    fontStyle: 'italic',
    paddingBottom: 10,
  },
  tapText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#e6e6e6',
    fontStyle: 'italic',
  },
});

import { useColorScheme } from 'react-native';

export const useTheme = () => {
  const colorScheme = useColorScheme();
  
  const theme = {
    background: colorScheme === 'dark' ? '#1a1a2e' : '#ffffff',
    text: colorScheme === 'dark' ? '#e6e6e6' : '#000000',
    primary: '#4a90e2',
    secondary: colorScheme === 'dark' ? '#2a2a3a' : '#f5f5f5',
  };

  return { theme };
}; 
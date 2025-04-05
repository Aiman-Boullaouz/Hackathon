import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { generateText } from '../config/gemini';

export const ExampleGemini = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    setError('');
    
    try {
      const result = await generateText(prompt);
      setResponse(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={prompt}
        onChangeText={setPrompt}
        placeholder="Enter your prompt"
        multiline
      />
      <Button
        title={loading ? "Generating..." : "Generate"}
        onPress={handleGenerate}
        disabled={loading || !prompt.trim()}
      />
      {error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <Text style={styles.response}>{response}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  response: {
    marginTop: 16,
    padding: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  error: {
    marginTop: 16,
    color: 'red',
  },
}); 
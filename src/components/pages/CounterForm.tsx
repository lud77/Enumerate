import { StyleSheet, Alert, TouchableOpacity, View, Text, TextInput, StatusBar } from "react-native";

import { useState } from "react";
import { Counter } from "../../types";

// Counter Form Component
const CounterForm: React.FC<{
  counter?: Counter;
  onSave: (title: string, initialValue: number) => void;
  onCancel: () => void;
  onDelete?: () => void;
}> = ({ counter, onSave, onCancel, onDelete }) => {
  const [title, setTitle] = useState(counter?.title || '');
  const [currentValue, setCurrentValue] = useState(
    counter?.value?.toString() || '0'
  );

  const handleSave = () => {
    if (!title.trim()) {
      Alert.alert('Error', 'Please enter a title for the counter');
      return;
    }

    const numValue = parseInt(currentValue) || 0;
    onSave(title.trim(), numValue);
  };

  const handleDelete = () => {
    if (onDelete) {
      Alert.alert(
        'Delete Counter',
        'Are you sure you want to delete this counter? This action cannot be undone.',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Delete', style: 'destructive', onPress: onDelete },
        ]
      );
    }
  };

  return <>
    <StatusBar
      barStyle="dark-content"
      backgroundColor="#fff" /><View style={counterFormStyles.form}>
        <Text style={counterFormStyles.formTitle}>
          {counter ? 'Edit Counter' : 'New Counter'}
        </Text>

        <View style={counterFormStyles.inputGroup}>
          <Text style={counterFormStyles.label}>Title</Text>
          <TextInput
            style={counterFormStyles.input}
            value={title}
            onChangeText={setTitle}
            placeholder="Enter counter title"
            autoFocus />
        </View>

        <View style={counterFormStyles.inputGroup}>
          <Text style={counterFormStyles.label}>Current Value</Text>
          <TextInput
            style={counterFormStyles.input}
            value={currentValue}
            onChangeText={setCurrentValue}
            placeholder="0"
            keyboardType="numeric"
            />
        </View>

        <View style={counterFormStyles.buttonContainer}>
          <TouchableOpacity style={counterFormStyles.saveButton} onPress={handleSave}>
            <Text style={counterFormStyles.saveButtonText}>Save</Text>
          </TouchableOpacity>

          <TouchableOpacity style={counterFormStyles.cancelButton} onPress={onCancel}>
            <Text style={counterFormStyles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>

        {counter && onDelete && (
          <TouchableOpacity style={counterFormStyles.deleteButton} onPress={handleDelete}>
            <Text style={counterFormStyles.deleteButtonText}>Delete Counter</Text>
          </TouchableOpacity>
        )}
      </View>
    </>;
};

const counterFormStyles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 20,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '600',
  },
  deleteButton: {
    marginTop: 30,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#FF3B30',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CounterForm;

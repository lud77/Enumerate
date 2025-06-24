// App.tsx
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { Counter } from '../types';
import CounterForm from './pages/CounterForm';
import CounterItem from './CounterItem';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

const Router: React.FC = () => {
  const [counters, setCounters] = useState<Counter[]>([]);
  const [currentView, setCurrentView] = useState<'list' | 'form'>('list');
  const [editingCounter, setEditingCounter] = useState<Counter | undefined>();
  const insets = useSafeAreaInsets();

  const generateId = (): string => {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  };

  const handleAddCounter = () => {
    setEditingCounter(undefined);
    setCurrentView('form');
  };

  const handleEditCounter = (counter: Counter) => {
    setEditingCounter(counter);
    setCurrentView('form');
  };

  const handleSaveCounter = (title: string, currentValue: number) => {
    if (editingCounter) {
      // Update existing counter
      setCounters((prev) =>
        prev.map(c =>
          c.id === editingCounter.id
            ? {
                ...c,
                title,
                value: currentValue,
              }
            : c
        )
      );
    } else {
      // Create new counter
      const newCounter: Counter = {
        id: generateId(),
        title,
        value: currentValue,
      };
      setCounters(prev => [...prev, newCounter]);
    }

    setCurrentView('list');
    setEditingCounter(undefined);
  };

  const handleDeleteCounter = () => {
    if (editingCounter) {
      setCounters(prev => prev.filter(c => c.id !== editingCounter.id));
      setCurrentView('list');
      setEditingCounter(undefined);
    }
  };

  const handleIncrementCounter = (counterId: string) => {
    setCounters(prev =>
      prev.map(c => (c.id === counterId ? { ...c, value: c.value + 1 } : c))
    );
  };

  const handleCancel = () => {
    setCurrentView('list');
    setEditingCounter(undefined);
  };

  switch (currentView) {
    case 'form': return (
      <SafeAreaView style={[styles.container, { bottom: insets.bottom }]} edges={['top', 'bottom']}>
        <CounterForm
        counter={editingCounter}
        onSave={handleSaveCounter}
        onCancel={handleCancel}
        onDelete={editingCounter ? handleDeleteCounter : undefined}
        />
      </SafeAreaView>
    );

    case 'list': return (
      <SafeAreaView style={[styles.container, { bottom: insets.bottom }]} edges={['top', 'bottom']}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="#fff"
          />

        <View style={listStyles.header}>
          <Text style={listStyles.title}>Counter Tracker</Text>
          <TouchableOpacity style={styles.addButton} onPress={handleAddCounter}>
            <Text style={styles.addButtonText}>+ Add Counter</Text>
          </TouchableOpacity>
        </View>

        {counters.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No counters yet!</Text>
            <Text style={styles.emptyStateSubtext}>
              Tap "Add Counter" to get started
            </Text>
          </View>
        ) : (
          <FlatList
            data={counters}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <CounterItem
                counter={item}
                onPress={() => handleEditCounter(item)}
                onIncrement={() => handleIncrementCounter(item.id)}
              />
            )}
            style={styles.list}
          />
        )}
      </SafeAreaView>
    );
  }
};

const listStyles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  addButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  list: {
    flex: 1,
    padding: 20,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyStateText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
  },
});

export default Router;

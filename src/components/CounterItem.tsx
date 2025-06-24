import { StyleSheet, TouchableOpacity, View, Text } from "react-native";

import { Counter } from "../types";

// Counter Item Component
const CounterItem: React.FC<{
  counter: Counter;
  onPress: () => void;
  onIncrement: () => void;
}> = ({ counter, onPress, onIncrement }) => (
  <View style={counterItemStyles.counterItem}>
    <TouchableOpacity style={counterItemStyles.counterInfo} onPress={onPress}>
      <Text style={counterItemStyles.counterTitle}>{counter.title}</Text>
      <Text style={counterItemStyles.counterValue}>Count: {counter.value}</Text>
    </TouchableOpacity>
    <TouchableOpacity style={counterItemStyles.incrementButton} onPress={onIncrement}>
      <Text style={counterItemStyles.incrementButtonText}>+1</Text>
    </TouchableOpacity>
  </View>
);

const counterItemStyles = StyleSheet.create({
  counterItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  counterInfo: {
    flex: 1,
  },
  counterTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  counterValue: {
    fontSize: 16,
    color: '#666',
  },
  incrementButton: {
    backgroundColor: '#34C759',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    justifyContent: 'center',
  },
  incrementButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default CounterItem;

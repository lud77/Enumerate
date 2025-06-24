import { TouchableOpacity, View, Text } from "react-native";
import { counterItemStyles } from "../styles";
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

export default CounterItem;

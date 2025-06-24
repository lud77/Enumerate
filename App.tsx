// App.tsx
import React from 'react';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import Router from './src/components/Router';

// Main App Component
const App: React.FC = () => {
  return <SafeAreaProvider>
    <Router />
  </SafeAreaProvider>;
};

export default App;
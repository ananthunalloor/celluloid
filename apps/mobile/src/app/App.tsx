import { useState } from 'react';
import { config, TamaguiProvider, LoginScreen, SignupScreen } from '@celluloid/ui';

export const App = () => {
  const [screen, setScreen] = useState<'login' | 'signup'>('login');

  return (
    <TamaguiProvider config={config} defaultTheme="celluloid">
      {screen === 'login' ? (
        <LoginScreen
          onSubmit={(values) => console.log('login submit', values)}
          onForgotPassword={() => console.log('forgot password')}
          onGoToSignup={() => setScreen('signup')}
        />
      ) : (
        <SignupScreen
          onSubmit={(values) => console.log('signup submit', values)}
          onGoToLogin={() => setScreen('login')}
        />
      )}
    </TamaguiProvider>
  );
};

export default App;

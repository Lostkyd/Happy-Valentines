import { useState } from 'react';
import Card from './components/card/Card';
import Keyboard from './components/keyboard/Keyboard';
import EmailForm from './components/email/EmailForm';

function App() {
  const [stage, setStage] = useState('entry');
  const [enteredCode, setEnteredCode] = useState('');

  const handleKeyboardSubmit = (value) => {
    const v = value.toUpperCase();
    setEnteredCode(v);
    if (v === 'YES') {
      setStage('email');
    } else {
      alert('That is not YES — please try again');
    }
  };

  const handleEmailSent = () => {
    setStage('done');
  };

  return (
    <div className="app-container">
      {stage === 'entry' && (
        <Card 
          title="Happy Valentine's Day" 
          message="You're awesome!" 
          emoji="💕"
        >
          <Keyboard onSubmit={handleKeyboardSubmit} />
        </Card>
      )}

      {stage === 'email' && (
        <Card title="Happy Valentines love" message="" emoji="💌">
          <EmailForm onSent={handleEmailSent} code={enteredCode} />
        </Card>
      )}

      {stage === 'done' && (
        <Card title="Thank you!" message="We'll be in touch." emoji="💖" />
      )}
    </div>
  )
}

export default App

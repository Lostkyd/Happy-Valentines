import { useState } from 'react';
import { launchConfetti } from './lib/confetti';
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
      sendAutoEmail();
    } else {
      alert('That is not YES — please try again');
    }
  };

  const sendAutoEmail = async () => {
    setStage('sending');
    const message = `Happy Valentine's Day, my love! 💕\n\nDate Information:\n📅 Date: 02/16/2026 (Monday)\n⏰ Time: 1:00 PM - 5:00 PM\n📍 Venue: Farmer's Cubao - Wok It Out\n\n✨ Wear your best OOTD — I want to see you shine!\n💞 I love you so much.\n\n🌹 Can't wait to see you! 🌹`;

    const formData = new FormData();
    formData.append('access_key', '7df23f42-30ec-4557-927e-f4049f767485');
    formData.append('subject', "Happy Valentine's Day!");
    formData.append('from_name', 'Ronn Kevin A. Rubio');
    formData.append('message', message);

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });
      const json = await res.json();
      if (json.success) {
          try { launchConfetti(); } catch (e) {}
          // advance to done after a short delay so confetti is visible
          setTimeout(() => {
            setStage('done');
          }, 750);
        } else {
        alert('Submission failed — please check access_key');
        setStage('entry');
      }
    } catch (err) {
      console.error(err);
      alert('Network error while sending');
      setStage('entry');
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
        <>
          <Card
            title="Thank you!"
            message={`Don't even think about backing out. Happy Valentine's Day ulit mahal ko. Pakaganda mo since nung nakilala kita. Kaso habang tumatagal nagiging dragon ka. Labyuuuuu!!!!!`}
            emoji="💖"
          />
          <div className="overlay-note">Kindly check your email</div>
        </>
      )}
    </div>
  )
}

export default App

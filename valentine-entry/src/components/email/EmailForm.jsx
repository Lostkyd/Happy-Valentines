import { useState } from 'react';
import './EmailForm.css';
import { launchConfetti } from '../../lib/confetti';

export default function EmailForm({ onSent }) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      alert('Please enter your email');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('access_key', '7df23f42-30ec-4557-927e-f4049f767485');
    formData.append('subject', 'Happy Valentine\'s Day!');
    formData.append('from_name', 'Ronn Kevin A. Rubio');
    formData.append('to_email', email);
    const message = `Happy Valentine's Day, my love! 💕\n\nDate Information:\n📅 Date: 02/16/2026 (Monday)\n⏰ Time: 1:00 PM - 5:00 PM\n📍 Venue: Farmer's Cubao - Wok It Out\n\n✨ Wear your best OOTD — I want to see you shine!\n💞 I love you so much.\n\n🌹 Can't wait to see you! 🌹`;
    formData.append('message', message);
    formData.append('reply_to', email);

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });
      const json = await res.json();
      if (json.success) {
        try { launchConfetti(); } catch (e) {}
        setTimeout(() => {
          if (typeof onSent === 'function') onSent();
        }, 700);
        setEmail('');
        try {
          const mailto = `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent("Happy Valentine's Day!")}&body=${encodeURIComponent(message)}`;
          window.open(mailto, '_blank');
        } catch (e) {
        }
      } else {
        alert('Submission failed — please check access_key');
      }
    } catch (err) {
      console.error(err);
      alert('Network error while sending');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="email-form">
      <p className="email-instruction">Kindly input your email</p>
      <input
        type="email"
        name="email"
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="email-input"
        required
      />
      <button type="submit" className="control-btn submit" disabled={loading}>
        {loading ? 'Sending...' : 'SUBMIT'}
      </button>
    </form>
  );
}
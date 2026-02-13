import { useState } from 'react';

export default function EmailForm({ onSent, code, templateId }) {
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
    formData.append('email', email);
    const message = `Card: Happy Valentines love\nResponse: ${code || ''}\nEmail: ${email}`;
    formData.append('message', message);
    if (templateId) {
      formData.append('template_id', templateId);
    }

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });
      const json = await res.json();
      if (json.success) {
        alert('Thank you — email submitted');
        setEmail('');
        if (typeof onSent === 'function') onSent();
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

import './Card.css';

export default function Card({ title, message, emoji = "💝", children }) {
  return (
    <div className="card">
      <div className="card-emoji">{emoji}</div>
      <h2 className="card-title">{title}</h2>
      <p className="card-message">{message}</p>
      {children && <div className="card-content">{children}</div>}
    </div>
  );
}

import "./borderButton.styles.css";

export default function BorderButton({ label, onClick }) {
  return (
    <button onClick={onClick} class="border_button">
      {label}
    </button>
  );
}

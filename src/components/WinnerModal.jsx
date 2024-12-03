import './WinnerModal.css';

const WinnerModal = ({ message, onGoHome }) => {
    const username = localStorage.getItem('username');

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>¡Felicidades {username}!</h2>
        <p>{message}</p>
        <button onClick={onGoHome}>Volver al inicio</button>
      </div>
    </div>
  );
};

export default WinnerModal;
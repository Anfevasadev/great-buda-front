import './Modal.css';

const Modal = ({ title, message, onGoHome }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{title}</h2>
        <p>{message}</p>
        <button onClick={onGoHome}>Volver al inicio</button>
      </div>
    </div>
  );
};

export default Modal;
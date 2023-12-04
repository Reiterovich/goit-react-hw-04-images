import { useEffect } from 'react';

export const Modal = ({ closeModal, tags, modalImg }) => {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      closeModal();
    }
  };

  const handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      closeModal();
    }
  };

  return (
    <div onClick={handleBackdropClick} className="Overlay">
      <div className="Modal">
        <img src={modalImg} alt={tags} />
      </div>
    </div>
  );
};

import { useEffect } from 'react';

export const Modal = ({ closeModal, tags, modalImg }) => {
  const handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      closeModal();
    }
  };

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeModal]);

  return (
    <div onClick={handleBackdropClick} className="Overlay">
      <div className="Modal">
        <img src={modalImg} alt={tags} />
      </div>
    </div>
  );
};

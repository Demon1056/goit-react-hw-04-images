import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { BackDrop, ModalImg } from './ModalStyled';

export const Modal = ({ img, closeModal, updateLageImage }) => {
  useEffect(() => {
    window.addEventListener('keydown', e => {
      if (e.code === 'Escape') {
        updateLageImage();
      }
    });
  }, [updateLageImage]);

  return (
    <BackDrop onClick={closeModal} onKeyDown={closeModal}>
      <ModalImg src={img} alt={img} />
    </BackDrop>
  );
};

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  img: PropTypes.string.isRequired,
  updateLageImage: PropTypes.func.isRequired,
};

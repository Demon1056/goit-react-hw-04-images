import PropTypes from 'prop-types';
import { Component } from 'react';
import { BackDrop, ModalImg } from './ModalStyled';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', e => {
      if (e.code === 'Escape') {
        this.props.updateLageImage();
      }
    });
  }
  render() {
    const { img, closeModal } = this.props;
    return (
      <BackDrop onClick={closeModal} onKeyDown={closeModal}>
        <ModalImg src={img} alt={img} />
      </BackDrop>
    );
  }
}
Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  img: PropTypes.string.isRequired,
};

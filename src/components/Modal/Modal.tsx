import React from 'react';
import ReactModal from 'react-modal';
import styles from './styles.module.css';

interface ModalProps {
  isOpen: boolean;
  handleModal: () => void;
  title?: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, handleModal, title, children }) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={handleModal}
      className={{
        base: styles.modal,
        afterOpen: styles['modal--after-open'],
        beforeClose: styles['modal--before-close']
      }}
      overlayClassName={{
        base: styles.overlay,
        afterOpen: styles['overlay--after-open'],
        beforeClose: styles['overlay--before-close']
      }}
      closeTimeoutMS={300}
      ariaHideApp={false} // Add this if your app is not a top-level application
    >
      {title && <h2 className={styles.title}>{title}</h2>}
      <button className={styles.closeButton} onClick={handleModal}>
        &times;
      </button>
      <div className={styles.content}>{children}</div>
    </ReactModal>
  );
};

export default Modal;

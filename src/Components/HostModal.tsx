import React, { FC, ReactNode } from "react";
import Modal from "react-modal";

Modal.setAppElement("#easy-suites-root");

type HostModalProps = {
  isOpen: boolean;
  onRequestClose: () => void;
  children: ReactNode;
};

const HostModal: FC<HostModalProps> = ({ isOpen, onRequestClose, children }) => {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      border: "1px solid #ccc",
      background: "#fff",
      overflow: "auto",
      borderRadius: "4px",
      outline: "none",
      padding: "20px",
    },
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customStyles} contentLabel="Example Modal">
      {children}
    </Modal>
  );
};

export default HostModal;

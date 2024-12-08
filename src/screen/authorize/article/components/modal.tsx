import React, { ReactNode } from "react";

interface ModalProps {
  id: string;
  children?: ReactNode;
  fullscreen?: boolean;
  isOpen?: boolean;
  onBackdropClick?: () => void;
}

const Modal: React.FC<ModalProps> = ({
  id,
  children,
  fullscreen = false,
  isOpen,
  onBackdropClick,
}) => {
  const cx = `modal-box ${
    fullscreen ? "w-full h-full !max-w-[calc(100vw-5em)]" : ""
  } !p-0`;

  return (
    <div id={id} className={`modal ${isOpen ? "modal-open" : ""}`}>
      <div className={cx}>{children}</div>

      <form method="dialog" className="modal-backdrop">
        <button onClick={onBackdropClick}>close</button>
      </form>
    </div>
  );
};

export default Modal;

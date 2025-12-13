import React, { useEffect } from "react";
import { createPortal } from "react-dom";

const Modal = ({ title, children, onClose }) => {
  const target = document.getElementById("modal-root") || document.body;

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const content = (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <div className="modal-card" role="dialog" aria-modal="true" onMouseDown={(e) => e.stopPropagation()}>
        {title && <h3 style={{ marginTop: 0 }}>{title}</h3>}
        <div>{children}</div>
      </div>
    </div>
  );

  return createPortal(content, target);
};

export default Modal;

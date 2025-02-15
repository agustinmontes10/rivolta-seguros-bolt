import React from 'react';

export type ToastProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactElement;
};

export type ToastActionElement = React.ReactElement;

const Toast: React.FC<ToastProps> = ({ open, onOpenChange, title, description, action }) => {
  if (!open) return null;

  return (
    <div className="toast">
      {title && <div className="toast-title">{title}</div>}
      {description && <div className="toast-description">{description}</div>}
      {action && <div className="toast-action">{action}</div>}
      <button onClick={() => onOpenChange(false)}>Close</button>
    </div>
  );
};

export default Toast;
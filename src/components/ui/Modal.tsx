import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "../../utils/cn";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
  actions?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, className, actions }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.body.style.overflow = "unset";
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      {/* Content */}
      <div 
        ref={modalRef}
        className={cn(
          "relative w-full max-w-4xl bg-card border border-border/60 shadow-2xl flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200",
          className
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 px-6 border-b border-border/40 bg-muted/20">
            {title && (
                <div className="flex items-center gap-2">
                     <span className="w-2 h-2 rounded-full bg-primary" />
                     <h3 className="font-display font-medium uppercase tracking-wider text-sm">{title}</h3>
                </div>
            )}
            <div className="flex items-center gap-2">
                {actions}
                <button 
                onClick={onClose}
                className="p-2 hover:bg-muted rounded-full transition-colors text-muted-foreground hover:text-foreground"
            >
                <X size={20} />
            </button>
            </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-auto p-0">
            {children}
        </div>
      </div>
    </div>,
    document.body
  );
};

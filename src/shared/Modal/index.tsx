"use client";

import React from "react";

import Icon from "@/shared/icon";
import { ModalProps } from "@/interface";
import Button from "../button";

import Modal from "react-modal";

const SiteModal = ({
  isOpen,
  onClose,
  title,
  showCloseButton = true,
  showFooter = false,
  cancelText = "Cancel",
  saveText = "Save",
  onCancel,
  onSave,
  saveDisabled = false,
  widthClass = "max-w-[500px]",
  children,
}: ModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      shouldCloseOnOverlayClick={false}
      ariaHideApp={false}
      overlayClassName="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      className={`relative flex flex-col overflow-hidden max-h-[85vh] w-full ${widthClass} rounded-[35px] bg-white border border-theme-white-100 shadow-sm outline-none`}
    >
      {/* ===== Header ===== */}
      {(title || showCloseButton) && (
        <div className="flex items-center justify-between px-4 pt-4">
          {title ? (
            <h2 className="text-lg 1xl:text-xl font-semibold text-theme-black-00">
              {title}
            </h2>
          ) : (
            <div />
          )}

          {showCloseButton && (
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-theme-white-50 transition"
            >
              <Icon name="cross-icon" className="w-5 h-5 text-theme-black-50" />
            </button>
          )}
        </div>
      )}

      {/* ===== Body ===== */}
      <div className="w-full p-6 overflow-auto">{children}</div>

      {/* ===== Footer ===== */}
      {showFooter && (
        <div className="flex items-center justify-end gap-3 px-4 pb-4">
          <Button
            onClick={onCancel || onClose}
            disabled={saveDisabled}
            title={cancelText}
          />
          <Button onClick={onSave} disabled={saveDisabled} title={saveText} />
        </div>
      )}
    </Modal>
  );
};

export default SiteModal;

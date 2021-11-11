import React from "react";

export default function PuzzleModal({ open, children, onClose }) {
    if (!open) return null;

    return (
        <>
            <div className="Overlay-modal" />
            <div  className="Modal-styles">
                {children}
                <div className="Modal-close">
                    <button className="btn btn-md btn-danger" onClick={onClose}>
                        Close
                    </button>
                </div>

            </div>
        </>
    );
}

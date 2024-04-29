import React from 'react';

function Modal({ children }) {
    return (
        <div className="w-full h-full absolute bg-black/50 top-0 left-0 z-10 flex items-center justify-center">
            <div className="bg-box font-poppins text-white rounded-md w-1/3">
                {children}
            </div>
        </div>
    );
}

export default Modal;

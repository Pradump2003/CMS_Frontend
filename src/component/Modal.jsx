import React from 'react';
import { useEffect } from 'react';
import ReactDOM from 'react-dom';

export default function Modal({
  closeModel,
  children,
  btnLabel = 'Back',
  btnClick
}) {
  useEffect(() => {
    document.body.classList.add('overflow-hidden');
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, []);

  const btnClickHandling = btnClick ? btnClick : closeModel;

  return ReactDOM.createPortal(
    <>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
        onClick={closeModel}
      >
        <div
          className="relative w-full max-w-md p-6 bg-white border-2 border-black rounded-lg shadow-lg"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="pb-6"> {children}</div>
          <div>
            <button
              className="text-white bg-blue-500 px-6 py-1 rounded"
              onClick={btnClickHandling}
            >
              {btnLabel}
            </button>
          </div>
        </div>
      </div>
    </>,
    document.body
  );
}

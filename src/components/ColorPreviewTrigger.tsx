'use client';

import { useState } from 'react';
// import ColorPreview from './ColorPreview'; // Component doesn't exist

const ColorPreviewTrigger = () => {
  const [showPreview, setShowPreview] = useState(false);

  return (
    <>
      {/* Floating trigger button */}
      <button
        onClick={() => setShowPreview(true)}
        className="fixed bottom-4 right-4 z-50 bg-gradient-to-r from-accent to-tertiary text-white px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 font-medium text-sm"
        style={{
          background: 'linear-gradient(135deg, #6366f1, #f43f5e)',
        }}
      >
        🎨 Preview Colors
      </button>

      {/* Color preview modal - commented out until ColorPreview component is created */}
      {/* {showPreview && (
        <div id="color-preview">
          <ColorPreview />
          <div
            className="fixed inset-0 z-[9998]"
            onClick={() => setShowPreview(false)}
          />
        </div>
      )} */}
    </>
  );
};

export default ColorPreviewTrigger;

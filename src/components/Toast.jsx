// This component displays a toast notification for 3 seconds when it receives a message prop.

import React, { useEffect, useState } from 'react';

export default function Toast({ message }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setVisible(false); // hide via state
    }, 3000);
    return () => clearTimeout(timeout);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed top-4 right-4 bg-green-600 text-white px-4 py-2 rounded shadow transition-all duration-300 z-50">
      {message}
    </div>
  );
}

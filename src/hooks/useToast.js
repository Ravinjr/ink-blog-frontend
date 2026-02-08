import { useState, useEffect } from 'react';

export const useToast = () => {
  const [toast, setToast] = useState('');

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(''), 2200);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const showToast = (message) => setToast(message);

  return { toast, showToast };
};
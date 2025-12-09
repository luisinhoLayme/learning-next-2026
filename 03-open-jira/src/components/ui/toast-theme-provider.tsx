'use client'

import { UIContext } from '@/context/ui';
import { use } from 'react';
import { ToastContainer, Zoom } from 'react-toastify';

export default function ToastThemeProvider() {
  const { theme } = use(UIContext)

  return (
    <ToastContainer
      position="top-right"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme={theme}
      transition={Zoom}
    />
  );
}

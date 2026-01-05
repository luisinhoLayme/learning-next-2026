import { useState, useEffect } from 'react';

/**
 * Hook para manejar la visibilidad temporal de errores.
 * @param {any} trigger - El estado o error que dispara el temporizador.
 * @param {number} duration - Tiempo en ms antes de ocultar el error (default 3000).
 */
export function useErrorTimeout(trigger:any, duration: number = 3000) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Si el trigger (ej. state.error) existe, mostramos el mensaje
    if (trigger) {
      setIsVisible(true);

      const timer = setTimeout(() => {
        setIsVisible(false);
      }, duration);

      // Limpieza del timer si el componente se desmonta o el trigger cambia
      return () => clearTimeout(timer);
    }
  }, [trigger, duration]);

  return [isVisible, setIsVisible];
}

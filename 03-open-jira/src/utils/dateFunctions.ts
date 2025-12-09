import { formatDistanceToNow, parseISO } from 'date-fns';
// Para el idioma español, necesitarás importar el locale (opcional si solo quieres inglés)
import { es, enUS } from 'date-fns/locale';

/**
 * Convierte una marca de tiempo ISO (de la DB) en una cadena de tiempo relativo.
 * Ejemplo: "5 minutos", "alrededor de 1 hora".
 * @param dateString La fecha en formato ISO (e.g., '2025-12-08T16:15:24.194Z')
 * @returns La distancia de tiempo formateada.
 */
export function timeAgo(dateString: string): string {
  // 1. Convertir la cadena ISO a un objeto Date
  const date = parseISO(dateString);

  // 2. Calcular y formatear la distancia de tiempo
  const result = formatDistanceToNow(date, {
    addSuffix: true, // Añade el sufijo "ago" o "hace"
    locale: enUS//es,      // Usar el idioma español (si se requiere)
  });

  // El resultado será, por ejemplo, "hace 5 minutos" o "5 minutes ago"
  return result;
}

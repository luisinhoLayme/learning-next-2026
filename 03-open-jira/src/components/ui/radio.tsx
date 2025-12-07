import React, { useState } from 'react';

const Radio = () => {
  // 1. Estado para almacenar el valor seleccionado
  const [estadoSeleccionado, setEstadoSeleccionado] = useState('pending');

  // Opciones del radio
  const status = [
    { value: 'pending', label: 'Pendiente' },
    { value: 'progress', label: 'En Progreso' },
    { value: 'finished', label: 'Terminado' },
  ];

  // 2. Función para manejar el cambio
  const handleChange = (event) => {
    // Obtenemos el nuevo valor seleccionado
    setEstadoSeleccionado(event.target.value);
    // Aquí puedes realizar cualquier otra acción con event.target.value
    console.log("Nuevo estado seleccionado:", event.target.value);
  };

  return (
    <div className="p-4 bg-base-100 rounded-lg shadow-md">
      <p className="mb-3 font-semibold text-lg">Status Entry</p>

      <div className="flex flex-col space-y-2">
        {status.map((s) => (
          <label
            key={s.value}
            className="label cursor-pointer justify-start space-x-3"
          >
            {/* Input de Radio con la clase de daisyUI 'radio' */}
            <input
              type="radio"
              name="tarea-estado"
              value={s.value}
              // El radio se marca si su valor coincide con el estado
              checked={estadoSeleccionado === s.value}
              onChange={handleChange}
              // Clase 'radio' de daisyUI
              className="radio radio-primary"
            />

            {/* Etiqueta visible */}
            <span className="label-text text-base">{s.label}</span>
          </label>
        ))}
      </div>

      <p className="mt-4 text-sm text-gray-600">
        Valor obtenido: <span className="font-bold text-primary">{estadoSeleccionado}</span>
      </p>
    </div>
  );
};

export default Radio;

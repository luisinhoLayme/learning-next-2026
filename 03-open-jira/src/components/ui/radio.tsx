import { EntryStatus } from '@/interfaces/entry';
import { ChangeEvent, type Dispatch, type FC, type SetStateAction, useState } from 'react';

interface Props {
  status: EntryStatus
  setStatus: Dispatch<SetStateAction<EntryStatus>>
}

const Radio:FC<Props> = ({ status, setStatus }) => {

  const validStatus = [
    { value: 'pending', label: 'Pending' },
    { value: 'progress', label: 'Progress' },
    { value: 'finished', label: 'Finished' },
  ];

  const onStatusChanged = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value as EntryStatus
    setStatus(value);
  };

  return (
    <div className="p-4 bg-base-100/50 rounded-lg shadow-md mt-2 mb-4">
      <p className="mb-3 font-semibold text-lg">Status Entry</p>

      <div className="flex flex-col space-y-2">
        {validStatus.map((s) => (
          <label
            key={s.value}
            className="label cursor-pointer justify-start space-x-3"
          >
            {/* Input de Radio con la clase de daisyUI 'radio' */}
            <input
              type="radio"
              name="tarea-estado"
              value={s.value}
              checked={status === s.value}
              onChange={onStatusChanged}
              className="radio radio-secondary"
            />

            {/* Etiqueta visible */}
            <span className="label-text text-base">{s.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default Radio;

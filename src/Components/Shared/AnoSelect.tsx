import React, { SetStateAction } from "react";

type AnoSelectProps = {
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  ano: string;
};

const AnoSelect: React.FC<AnoSelectProps> = ({ ano, onChange }) => {
  const anos = Array.from({ length: 49 }, (_, i) => (2023 + i).toString());

  return (
    <div className="flex flex-col">
      <label htmlFor="ano-select" className="text-gray-700 font-bold mb-1">
        Ano Referente
      </label>
      <select required value={ano || ""} onChange={onChange} className="border rounded p-2 w-full focus:border-blue-500">
        <option value="">Ano</option>
        {anos.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );
};

export default AnoSelect;

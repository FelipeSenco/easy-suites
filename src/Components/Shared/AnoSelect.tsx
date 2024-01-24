import React, { SetStateAction } from "react";

type AnoSelectProps = {
  setAno: React.Dispatch<SetStateAction<string>>;
  ano: string;
};

const AnoSelect: React.FC<AnoSelectProps> = ({ ano, setAno }) => {
  const anos = Array.from({ length: 49 }, (_, i) => (2023 + i).toString());

  return (
    <div className="flex flex-col">
      <label htmlFor="ano-select" className="text-gray-700 font-bold mb-1">
        Ano Referente
      </label>
      <select required value={ano} onChange={(e) => setAno(e.target.value)} className="border rounded p-2 w-full focus:border-blue-500">
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

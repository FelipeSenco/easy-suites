import React from "react";

type AnoSelectProps = {
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  year: string;
  required?: boolean;
};

const SelectYear: React.FC<AnoSelectProps> = ({ year, onChange, required = false }) => {
  const years = Array.from({ length: 49 }, (_, i) => (2023 + i).toString());

  return (
    <div className="flex flex-col">
      <label htmlFor="year-select" className="text-gray-700 font-bold mb-1">
        Ano Referente
      </label>
      <select
        required={required}
        value={year || ""}
        onChange={onChange}
        name="year-select"
        id="year-select"
        className="border rounded p-2 w-full focus:border-blue-500"
      >
        <option value="">------</option>
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectYear;

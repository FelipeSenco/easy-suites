import { useGetAllPropriedades } from "@/EasySuitesApi/EasySuitesQueries";
import React, { FC, SetStateAction } from "react";

type PropriedadeSelectProps = {
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  propriedadeId: number;
  required?: boolean;
};

export const PropriedadeSelect: FC<PropriedadeSelectProps> = ({ propriedadeId, onChange, required = true }) => {
  const { data: propriedades } = useGetAllPropriedades();

  return (
    <div className="flex flex-col">
      <label htmlFor="propriedade-select" className="text-gray-700 font-bold mb-1">
        Propriedade
      </label>
      <select
        id="propriedade-select"
        className="border rounded p-2 w-full focus:border-blue-500"
        value={propriedadeId ?? ""}
        onChange={onChange}
        required={required}
      >
        <option value="">-------</option>
        {propriedades &&
          propriedades.map((propriedade) => (
            <option key={propriedade.Id} value={propriedade.Id}>
              {propriedade.Nome}
            </option>
          ))}
      </select>
    </div>
  );
};

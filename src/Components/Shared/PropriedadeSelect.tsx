import { useGetAllPropriedades } from "@/EasySuitesApi/EasySuitesQueries";
import React, { FC, SetStateAction } from "react";

type PropriedadeSelectProps = {
  setPropriedadeId: React.Dispatch<SetStateAction<number>>;
  propriedadeId: number;
  required?: boolean;
};

export const PropriedadeSelect: FC<PropriedadeSelectProps> = ({ propriedadeId, setPropriedadeId, required = true }) => {
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
        onChange={(e) => setPropriedadeId(e.target.value ? Number(e.target.value) : null)}
        required={required}
      >
        <option value="" disabled>
          Selecione uma propriedade
        </option>
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

import { useGetAllInquilinos } from "@/EasySuitesApi/EasySuitesQueries";
import React, { FC, SetStateAction, useEffect } from "react";

type InquilinoSelectProps = {
  setInquilinoId: React.Dispatch<SetStateAction<number>>;
  inquilinoId: number;
  required?: boolean;
  propriedadeId?: number;
};

export const InquilinoSelect: FC<InquilinoSelectProps> = ({ inquilinoId, setInquilinoId, propriedadeId, required = true }) => {
  const { data: inquilinos } = useGetAllInquilinos();

  return (
    <div className="flex flex-col">
      <label htmlFor="inquilino-select" className="text-gray-700 font-bold mb-1">
        Inquilino
      </label>
      <select
        id="inquilino-select"
        className="border rounded p-2 w-full focus:border-blue-500"
        value={inquilinoId ?? ""}
        onChange={(e) => setInquilinoId(e.target.value ? Number(e.target.value) : null)}
        required={required}
      >
        <option value="">-------</option>
        {inquilinos &&
          inquilinos
            .filter((i) => i.PropriedadeId === propriedadeId || !propriedadeId)
            .sort((a, b) => a.Nome.localeCompare(b.Nome))
            .map((inquilino) => (
              <option key={inquilino.Id} value={inquilino.Id}>
                {inquilino.Nome}
              </option>
            ))}
      </select>
    </div>
  );
};

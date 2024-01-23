import { useGetAllQuartos } from "@/EasySuitesApi/EasySuitesQueries";
import React, { FC, SetStateAction } from "react";

type QuartoSelectProps = {
  setQuartoId: React.Dispatch<SetStateAction<number>>;
  quartoId: number;
  propriedadeId: number;
  required?: boolean;
};

export const QuartoSelect: FC<QuartoSelectProps> = ({ quartoId, setQuartoId, propriedadeId, required = true }) => {
  const { data: quartos } = useGetAllQuartos();

  return (
    <div className="flex flex-col">
      <label htmlFor="propriedade-select" className="text-gray-700 font-bold mb-1">
        Quarto
      </label>
      <select
        id="quarto-select"
        className="border rounded p-2 w-full focus:border-blue-500"
        value={quartoId ?? ""}
        onChange={(e) => setQuartoId(e.target.value ? Number(e.target.value) : null)}
        required={required}
      >
        <option value="" disabled>
          Selecione um quarto
        </option>
        {quartos &&
          propriedadeId &&
          quartos
            .filter((q) => q.PropriedadeId === propriedadeId)
            .map((quarto) => (
              <option key={quarto.Id} value={quarto.Id}>
                {quarto.NumeroQuarto}
              </option>
            ))}
      </select>
    </div>
  );
};

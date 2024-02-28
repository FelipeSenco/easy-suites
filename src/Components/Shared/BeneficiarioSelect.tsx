import { useGetAllBeneficiarios } from "@/EasySuitesApi/EasySuitesQueries";
import React, { FC, SetStateAction } from "react";

type BeneficiarioSelectProps = {
  setBeneficiarioId: React.Dispatch<SetStateAction<number>>;
  beneficiarioId: number;
  required?: boolean;
};

export const BeneficiarioSelect: FC<BeneficiarioSelectProps> = ({ beneficiarioId, setBeneficiarioId, required = true }) => {
  const { data: beneficiarios } = useGetAllBeneficiarios();

  return (
    <div className="flex flex-col">
      <label htmlFor="beneficiario-select" className="text-gray-700 font-bold mb-1">
        Beneficiário
      </label>
      <select
        id="beneficiario-select"
        className="border rounded p-2 w-full focus:border-blue-500"
        value={beneficiarioId ?? ""}
        onChange={(e) => setBeneficiarioId(e.target.value ? Number(e.target.value) : null)}
        required={required}
      >
        <option value="">------</option>
        {beneficiarios &&
          beneficiarios.map((beneficiario) => (
            <option key={beneficiario.Id} value={beneficiario.Id}>
              {beneficiario.Nome}
            </option>
          ))}
      </select>
    </div>
  );
};

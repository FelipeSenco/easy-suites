import { useGetAllBeneficiaries } from "@/EasySuitesApi/EasySuitesQueries";
import React, { FC, SetStateAction } from "react";

type BeneficiarySelectProps = {
  setBeneficiaryId: React.Dispatch<SetStateAction<number>>;
  beneficiaryId: number;
  required?: boolean;
};

export const BeneficiarySelect: FC<BeneficiarySelectProps> = ({ beneficiaryId, setBeneficiaryId, required = true }) => {
  const { data: beneficiaries } = useGetAllBeneficiaries();

  return (
    <div className="flex flex-col">
      <label htmlFor="beneficiary-select" className="text-gray-700 font-bold mb-1">
        Beneficiário
      </label>
      <select
        id="beneficiary-select"
        name="beneficiary-select"
        className="border rounded p-2 w-full focus:border-blue-500"
        value={beneficiaryId ?? ""}
        onChange={(e) => setBeneficiaryId(e.target.value ? Number(e.target.value) : null)}
        required={required}
      >
        <option value="">------</option>
        {beneficiaries &&
          beneficiaries.map((b) => (
            <option key={b.Id} value={b.Id}>
              {b.Nome}
            </option>
          ))}
      </select>
    </div>
  );
};

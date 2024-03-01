import { Beneficary } from "@/types/Beneficiary";
import { FC } from "react";

type BeneficiariesProps = {
  beneficiaries: Beneficary[];
};

export const Beneficiaries: FC<BeneficiariesProps> = ({ beneficiaries }) => {
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {beneficiaries.map((b) => (
          <BeneficiaryCard key={b.Id} beneficiary={b} />
        ))}
      </div>
    </div>
  );
};
type BeneficiaryCardProps = {
  beneficiary: Beneficary;
};

export const BeneficiaryCard: FC<BeneficiaryCardProps> = ({ beneficiary }) => {
  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div className="p-4">
        <div className="font-bold text-lg mb-2">{beneficiary.Nome}</div>
        <div className="text-gray-700 text-base">
          <div>
            <span className="font-bold">Cpf:</span> {beneficiary.Cpf || "não registrado"}
          </div>
          <div>
            <span className="font-bold">Banco:</span> {`${beneficiary.Banco} (${beneficiary.BancoCodigo})`}
          </div>
          <div>
            <span className="font-bold">Agência:</span> {beneficiary.Agencia}
          </div>
          <div>
            <span className="font-bold">Conta:</span> {`${beneficiary.NumeroConta}-${beneficiary.DigitoConta}`}
          </div>
          <div>
            <span className="font-bold">Pix:</span> {beneficiary.ChavePix || "não registrada"}
          </div>
        </div>
      </div>
    </div>
  );
};

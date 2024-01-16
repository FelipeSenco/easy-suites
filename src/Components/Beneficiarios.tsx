import { Beneficario } from "@/types/Beneficiario";
import { FC } from "react";

type BeneficiariosProps = {
  beneficiarios: Beneficario[];
};

export const Beneficiarios: FC<BeneficiariosProps> = ({ beneficiarios }) => {
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {beneficiarios.map((beneficiario) => (
          <CardBeneficiario key={beneficiario.Id} beneficiario={beneficiario} />
        ))}
      </div>
    </div>
  );
};
type CardBeneficiarioProps = {
  beneficiario: Beneficario;
};

export const CardBeneficiario: FC<CardBeneficiarioProps> = ({ beneficiario }) => {
  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div className="p-4">
        <div className="font-bold text-lg mb-2">{beneficiario.Nome}</div>
        <div className="text-gray-700 text-base">
          <div>
            <span className="font-bold">Cpf:</span> {beneficiario.Cpf || "não registrado"}
          </div>
          <div>
            <span className="font-bold">Banco:</span> {`${beneficiario.Banco} (${beneficiario.BancoCodigo})`}
          </div>
          <div>
            <span className="font-bold">Agência:</span> {beneficiario.Agencia}
          </div>
          <div>
            <span className="font-bold">Conta:</span> {`${beneficiario.NumeroConta}-${beneficiario.DigitoConta}`}
          </div>
          <div>
            <span className="font-bold">Pix:</span> {beneficiario.ChavePix || "não registrada"}
          </div>
        </div>
      </div>
    </div>
  );
};

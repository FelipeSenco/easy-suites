import { Inquilino } from "@/types/Inquilino";
import { FC } from "react";

type InquilinosProps = {
  inquilinos: Inquilino[];
};

export const Inquilinos: FC<InquilinosProps> = ({ inquilinos }) => {
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-start">
        {inquilinos.map((inquilino) => (
          <CardInquilino key={inquilino.Id} inquilino={inquilino} />
        ))}
      </div>
    </div>
  );
};

type CardInquilinoProps = {
  inquilino: Inquilino;
};

export const CardInquilino: FC<CardInquilinoProps> = ({ inquilino }) => {
  return (
    <div className={`max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl propriedade-${inquilino.PropriedadeId}`}>
      <div className="p-4">
        <div className="font-bold text-lg mb-2">{inquilino.Nome}</div>
        <div className="text-gray-700 text-base">
          <div>
            <span className="font-bold">Cpf:</span> {inquilino.Cpf}
          </div>
          <div>
            <span className="font-bold">Propriedade:</span> {inquilino.PropriedadeNome}
          </div>
          <div>
            <span className="font-bold">Quarto Número:</span> {inquilino.NumeroQuarto}
          </div>
          <div>
            <span className="font-bold">Aluguel:</span>{" "}
            {inquilino.InicioAluguel
              ? `De ${inquilino.InicioAluguel.toLocaleDateString()} até ${inquilino.FimAluguel?.toLocaleDateString()}`
              : "Não registrado"}
          </div>
          <div>
            <span className="font-bold">Dia de Vencimento:</span> {inquilino.DiaVencimento || "Não definido"}
          </div>
          {inquilino.BeneficiarioNome && (
            <div>
              <span className="font-bold">Beneficiário:</span> {inquilino.BeneficiarioNome}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

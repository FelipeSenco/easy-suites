import { Propriedade } from "@/types/Propriedade";
import { FC } from "react";

type PropriedadesProps = {
  propriedades: Propriedade[];
};

const Propriedades: FC<PropriedadesProps> = ({ propriedades }) => {
  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {propriedades.map((propriedade) => (
          <CardPropriedade key={propriedade.Id} propriedade={propriedade} />
        ))}
      </div>
    </div>
  );
};

type CardPropriedadeProps = {
  propriedade: Propriedade;
};

const CardPropriedade: FC<CardPropriedadeProps> = ({ propriedade }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-4">
        <div className="font-bold text-lg mb-2">{propriedade.Nome}</div>
        <div className="text-gray-700 text-base">
          <div>
            <span className="font-bold">Endereço:</span>{" "}
            {`${propriedade.Rua}, ${propriedade.Numero}, ${propriedade.cep}, ${propriedade.Cidade}, ${propriedade.Uf}`}
          </div>
          <div>
            <span className="font-bold">Quartos:</span> {propriedade.numeroQuartos}
          </div>
          <div>
            <span className="font-bold">Inquilinos:</span> {propriedade.numeroInquilinos}
          </div>
          <div>
            <span className="font-bold">Vagas Disponíveis:</span> {propriedade.numeroQuartos - propriedade.numeroInquilinos}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Propriedades;

import { Quarto } from "@/types/Quarto";
import { FC } from "react";

type QuartosProps = {
  quartos: Quarto[];
};

export const Quartos: FC<QuartosProps> = ({ quartos }) => {
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-start">
        {quartos.map((quarto) => (
          <CardQuarto key={quarto.Id} quarto={quarto} />
        ))}
      </div>
    </div>
  );
};

type CardQuartoProps = {
  quarto: Quarto;
};

export const CardQuarto: FC<CardQuartoProps> = ({ quarto }) => {
  return (
    <div className={`max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl propriedade-${quarto.PropriedadeId}`}>
      <div className="p-4">
        <div className="font-bold text-lg mb-2">{`Quarto ${quarto.NumeroQuarto} (${quarto.PropriedadeNome})`}</div>
        <div className="text-gray-700 text-base">
          {quarto.InquilinoId && (
            <div>
              <span className="font-bold">Inquilino:</span> {quarto.InquilinoNome}
            </div>
          )}
          {!quarto.InquilinoId && <div className="text-red-500">Vago</div>}
        </div>
      </div>
    </div>
  );
};

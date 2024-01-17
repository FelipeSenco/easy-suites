"use client";
import { Quarto } from "@/types/Quarto";
import { FC, useState } from "react";
import HostModal from "./HostModal";

type QuartosProps = {
  quartos: Quarto[];
};

export const Quartos: FC<QuartosProps> = ({ quartos }) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingQuarto, setEditingQuarto] = useState({} as Quarto);

  const onCardClick = (quarto: Quarto) => {
    setEditingQuarto(quarto);
    setIsEditOpen(true);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-start">
        {quartos.map((quarto) => (
          <CardQuarto key={quarto.Id} quarto={quarto} onCardClick={onCardClick} />
        ))}
        <HostModal isOpen={isEditOpen} onRequestClose={() => setIsEditOpen(false)}>
          <QuartoEdit quarto={editingQuarto} />
        </HostModal>
      </div>
    </div>
  );
};

type CardQuartoProps = {
  quarto: Quarto;
  onCardClick: (quarto: Quarto) => void;
};

export const CardQuarto: FC<CardQuartoProps> = ({ quarto, onCardClick }) => {
  return (
    <div
      onClick={() => onCardClick(quarto)}
      className={`max-w-md mx-auto bg-white cursor-pointer rounded-xl shadow-md overflow-hidden md:max-w-2xl propriedade-${quarto.PropriedadeId}`}
    >
      <div className="p-4">
        <div className="font-bold text-lg mb-2">{`Quarto ${quarto.NumeroQuarto} (${quarto.PropriedadeNome})`}</div>
        <div className="text-gray-700 text-base">
          {quarto.InquilinoId && (
            <div>
              <span className="font-bold">Inquilino:</span> {quarto.InquilinoNome}
            </div>
          )}
          {!quarto.InquilinoId && <div className="text-red-500">Vago</div>}
          <div>
            <span className="font-bold">Valor:</span> {quarto.Valor}
          </div>
        </div>
      </div>
    </div>
  );
};

type EditQuartoProps = {
  quarto: Quarto;
};

export const QuartoEdit: FC<EditQuartoProps> = ({ quarto }) => {
  return (
    <div>
      {quarto.NumeroQuarto} {quarto.PropriedadeNome}
    </div>
  );
};

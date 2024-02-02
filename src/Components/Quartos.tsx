"use client";
import { Quarto } from "@/types/Quarto";
import { FC, FormEvent, useState } from "react";
import HostModal from "./Shared/HostModal";
import { ButtonCancelarConfirmar } from "./Shared/ButtonCancelarConfirmar";
import { useEditarValorQuarto } from "@/EasySuitesApi/EasySuitesQueries";

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
          <EditarQuartoForm quarto={editingQuarto} onCancel={() => setIsEditOpen(false)} />
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
  onCancel: () => void;
};

export const EditarQuartoForm: FC<EditQuartoProps> = ({ quarto, onCancel }) => {
  const [valor, setValor] = useState(quarto.Valor || 0);
  const { mutateAsync: editarQuartoValor, isLoading, isError, error } = useEditarValorQuarto();
  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await editarQuartoValor({ novoValor: valor, quartoId: quarto.Id });
    if (!isError) {
      onCancel();
    }
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col justify-center items-center gap-4 py-2 px-14">
      <div className="text-gray-700 font-bold mb-1 text-lg">
        {quarto.PropriedadeNome} - Quarto: {quarto.NumeroQuarto}
      </div>
      <div className="flex flex-col">
        <label htmlFor="amount" className="text-gray-700  font-bold mb-1">
          Valor
        </label>
        <input
          type="number"
          id="quarto-valor-input"
          name="quarto-valor"
          required
          min={0.01}
          max={100000}
          step={0.01}
          className="border rounded p-2 w-full focus:border-blue-500"
          placeholder="Quantia"
          value={valor}
          onChange={(e) => setValor(parseFloat(e.target.value))}
        />
      </div>
      <ButtonCancelarConfirmar onCancel={onCancel} />
      {isError && !isLoading && <p className="py-5 text-red-500">{error.message}</p>}
    </form>
  );
};

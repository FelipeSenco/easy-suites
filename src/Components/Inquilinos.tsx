"use client";
import { Inquilino } from "@/types/Inquilino";
import { FC, FormEvent, useState } from "react";
import { ButtonCancelarConfirmar } from "./Shared/ButtonCancelarConfirmar";
import HostModal from "./Shared/HostModal";
import { CardAdicionar } from "./Shared/CardAdicionar";
import { useAdicionarEditarInquilino, useExcluirInquilino } from "@/EasySuitesApi/EasySuitesQueries";
import { QuartoSelect } from "./Shared/QuartoSelect";
import { PropriedadeSelect } from "./Shared/PropriedadeSelect";
import { BeneficiarioSelect } from "./Shared/BeneficiarioSelect";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { ExcluirConfirma } from "./Shared/ExcluirConfirma";

type InquilinosProps = {
  inquilinos: Inquilino[];
};

export const Inquilinos: FC<InquilinosProps> = ({ inquilinos }) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [inquilinoEdit, setInquilinoEdit] = useState<Inquilino>(null);
  const [modalExcluirOpen, setModalExcluirOpen] = useState(false);
  const [inquilinoExcluir, setInquilinoExcluir] = useState<Inquilino>(null);
  const { mutateAsync: exluirInquilino, isError: isDeleteError, isLoading: isDeleteLoading, error } = useExcluirInquilino();

  const onCardClick = (inquilino?: Inquilino) => {
    setIsEditOpen(true);
    setInquilinoEdit(inquilino);
  };
  const onExcluirClick = (inquilino: Inquilino) => {
    setInquilinoExcluir(inquilino);
    setModalExcluirOpen(true);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-start">
        <CardAdicionar onCardClick={() => onCardClick(undefined)} />
        {inquilinos.map((inquilino) => (
          <CardInquilino key={inquilino.Id} inquilino={inquilino} onCardClick={onCardClick} onExcluirClick={onExcluirClick} />
        ))}
      </div>
      <HostModal isOpen={isEditOpen} onRequestClose={() => setIsEditOpen(false)}>
        <InquilinosForm inquilino={inquilinoEdit} onCancel={() => setIsEditOpen(false)} />
      </HostModal>
      <HostModal isOpen={modalExcluirOpen} onRequestClose={() => setModalExcluirOpen(false)}>
        <ExcluirConfirma
          onCancel={() => setModalExcluirOpen(false)}
          onConfirm={() => exluirInquilino(inquilinoExcluir.Id)}
          mensagem={`Tem certeza que quer excluir '${inquilinoExcluir?.Nome}'?`}
          isError={isDeleteError}
          isLoading={isDeleteLoading}
          error={error}
        />
      </HostModal>
    </div>
  );
};

type CardInquilinoProps = {
  inquilino: Inquilino;
  onCardClick: (inquilino: Inquilino) => void;
  onExcluirClick: (inquilino: Inquilino) => void;
};

export const CardInquilino: FC<CardInquilinoProps> = ({ inquilino, onCardClick, onExcluirClick }) => {
  return (
    <div
      onClick={() => onCardClick(inquilino)}
      className={`max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl cursor-pointer propriedade-${inquilino.PropriedadeId}`}
    >
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
            <span className="font-bold">Dia de Vencimento:</span> {inquilino.DiaVencimento || "Não definido"}
          </div>
          <div>
            <span className="font-bold">Telefone:</span> {inquilino.Telefone || "---------"}
          </div>
          {!!inquilino.BeneficiarioNome && (
            <div>
              <span className="font-bold">Beneficiário:</span> {inquilino.BeneficiarioNome}
            </div>
          )}
          <div className=" flex justify-end items-center p-1">
            <FontAwesomeIcon
              icon={faTrash}
              className="text-xl hover:bg-red-500 p-1"
              onClick={(e) => {
                e.stopPropagation();
                onExcluirClick(inquilino);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

type InquilinosFormProps = {
  inquilino?: Inquilino;
  onCancel: () => void;
};

const InquilinosForm: FC<InquilinosFormProps> = ({ inquilino, onCancel }) => {
  const { mutateAsync: adicionarEditarInquilino, isLoading, isError, error } = useAdicionarEditarInquilino();

  const [quartoId, setQuartoId] = useState(inquilino?.QuartoId);
  const [propriedadeId, setPropriedadeId] = useState<number>(inquilino?.PropriedadeId);
  const [nome, setNome] = useState(inquilino?.Nome);
  const [beneficiarioId, setBeneficiarioId] = useState(inquilino?.BeneficiarioId);
  const [inicioAluguel, setInicioAluguel] = useState(inquilino?.InicioAluguel);
  const [fimAluguel, setFimAluguel] = useState(inquilino?.FimAluguel);
  const [diaVencimento, setDiaVencimento] = useState(inquilino?.DiaVencimento);
  const [cpf, setCpf] = useState(inquilino?.Cpf);
  const [telefone, setTelefone] = useState(inquilino?.Telefone);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();

    await adicionarEditarInquilino({
      id: inquilino?.Id,
      quartoId,
      propriedadeId,
      nome,
      beneficiarioId,
      inicioAluguel,
      fimAluguel,
      diaVencimento,
      cpf,
      telefone,
    });
    if (!isError) {
      onCancel();
    }
  };

  const onChangePropriedade = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPropriedadeId(e.target.value ? Number(e.target.value) : null);
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col justify-center items-start gap-4 py-2 px-14">
      <div className="flex flex-row gap-2">
        <PropriedadeSelect propriedadeId={propriedadeId} onChange={onChangePropriedade} />
        {propriedadeId && <QuartoSelect quartoId={quartoId} propriedadeId={propriedadeId} setQuartoId={setQuartoId} />}
        <BeneficiarioSelect beneficiarioId={beneficiarioId} setBeneficiarioId={setBeneficiarioId} />
      </div>
      <div className="flex flex-row w-full justify-between">
        <div className="flex flex-col">
          <label htmlFor="inquilino-nome" className="text-gray-700 font-bold mb-1">
            Nome
          </label>
          <input
            maxLength={100}
            minLength={3}
            type="text"
            id="inquilino-nome-input"
            name="inquilino-nome"
            required
            className="border rounded p-2 w-full focus:border-blue-500"
            placeholder="Nome do inquilino"
            value={nome || ""}
            onChange={(e) => setNome(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="inquilino-inicio-aluguel" className="text-gray-700 font-bold mb-1">
            Início Aluguel
          </label>
          <input
            type="date"
            id="inquilino-inicio-aluguel-input"
            name="inquilino-inicio-aluguel"
            required
            className="border rounded p-2 w-full focus:border-blue-500"
            value={inicioAluguel ? new Date(inicioAluguel).toISOString().substring(0, 10) : ""}
            onChange={(e) => setInicioAluguel(new Date(e.target.value))}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="inquilino-fim-aluguel" className="text-gray-700 font-bold mb-1">
            Fim Aluguel
          </label>
          <input
            type="date"
            id="inquilino-fim-aluguel-input"
            name="inquilino-fim-aluguel"
            className="border rounded p-2 w-full focus:border-blue-500"
            value={fimAluguel ? new Date(fimAluguel).toISOString().substring(0, 10) : ""}
            onChange={(e) => setFimAluguel(e.target.value ? new Date(e.target.value) : null)}
          />
        </div>
      </div>
      <div className="flex flex-row w-full justify-between">
        <div className="flex flex-col">
          <label htmlFor="inquilino-vencimento" className="text-gray-700 font-bold mb-1">
            Vencimento
          </label>
          <input
            max={31}
            min={1}
            type="number"
            id="inquilino-vencimento-input"
            name="inquilino-vencimento"
            required
            className="border rounded p-2 w-full focus:border-blue-500"
            placeholder="Dia do vencimento"
            value={diaVencimento | 0}
            onChange={(e) => setDiaVencimento(e.target.value ? Number(e.target.value) : null)}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="inquilino-cpf" className="text-gray-700 font-bold mb-1">
            Cpf
          </label>
          <input
            maxLength={15}
            minLength={14}
            type="text"
            id="inquilino-cpf-input"
            name="inquilino-cpf"
            required
            className="border rounded p-2 w-full focus:border-blue-500"
            placeholder="Cpf do inquilino"
            value={cpf || ""}
            onChange={(e) => setCpf(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="inquilino-telefone" className="text-gray-700 font-bold mb-1">
            Telefone
          </label>
          <input
            maxLength={20}
            minLength={8}
            type="text"
            id="inquilino-telefone-input"
            name="inquilino-telefone"
            required
            className="border rounded p-2 w-full focus:border-blue-500"
            placeholder="Telefone do Inquilino"
            value={telefone || ""}
            onChange={(e) => setTelefone(e.target.value)}
          />
        </div>
      </div>
      <ButtonCancelarConfirmar onCancel={onCancel} />
      {isError && !isLoading && <p className="py-5 text-red-500">{error.message}</p>}
    </form>
  );
};

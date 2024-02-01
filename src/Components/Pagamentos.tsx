"use client";
import { FC, FormEvent, useState } from "react";
import HostModal from "./Shared/HostModal";
import { Pagamento } from "@/types/Pagamento";
import { ButtonCancelarConfirmar } from "./Shared/ButtonCancelarConfirmar";
import { useAdicionarEditarPagamento, useExcluirPagamento, useGetAllPagamentos } from "@/EasySuitesApi/EasySuitesQueries";
import { InquilinoSelect } from "./Shared/InquilinoSelect";
import MesSelect from "./Shared/MesSelect";
import AnoSelect from "./Shared/AnoSelect";
import { Meses, formatDateToDDMMYYYY } from "@/app/utils";
import { ExcluirConfirma } from "./Shared/ExcluirConfirma";
import { ComprovanteForm } from "./Comprovantes";
import IntersectionObserverContainer from "./Shared/IntersectionObserverContainer";

export const Pagamentos: FC = () => {
  const { pagamentos, hasNextPage, fetchNextPage } = useGetAllPagamentos();
  const { mutateAsync: excluirPagamento, isError: isDeleteError, isLoading: isDeleteLoading, error: deleteError } = useExcluirPagamento();
  const [pagamentoAtual, setPagamentoAtual] = useState(null);
  const [adicionarEditarPagamentoOpen, setAdicionarEditarPagamentoOpen] = useState(false);
  const [excluirPagamentoOpen, setExcluirPagamentoOpen] = useState(false);
  const [pagamentoExcluir, setPagamentoExcluir] = useState<Pagamento>(null);
  const [editarComprovanteOpen, setEditarComprovanteOpen] = useState(false);

  return (
    <>
      <div className="flex items-center justify-center mt-5 px-4 rounded p-absolute">
        <button
          onClick={() => setAdicionarEditarPagamentoOpen(true)}
          className="bg-green-500 hover:bg-green-700 text-white font-bold text-lg py-2 px-8 rounded"
        >
          Adicionar
        </button>
      </div>
      <div className="mt-100 h-[750px] overflow-y-auto">
        <table className="border-collapse w-full mt-5">
          <thead>
            <tr className="bg-white">
              <th className="border p-2">Nome</th>
              <th className="border p-2">Imovel</th>
              <th className="border p-2">Quarto</th>
              <th className="border p-2">Valor</th>
              <th className="border p-2">Data do Pagamento</th>
              <th className="border p-2">Mes</th>
              <th className="border p-2">Ano</th>
              <th className="border p-2">Comprovante</th>
              <th className="border p-2 w-1"></th>
              <th className="border p-2 w-1"></th>
            </tr>
          </thead>
          <tbody>
            {pagamentos.map((p) => (
              <tr key={p.Id} className={`bg-green-200`}>
                <td className="border border-gray-300 p-2">{p.NomeInquilino}</td>
                <td className="border border-gray-300 p-2">{p.PropriedadeNome}</td>
                <td className="border border-gray-300 p-2">{p.NumeroQuarto}</td>
                <td className="border border-gray-300 p-2">R$ {p.Valor}</td>
                <td className="border border-gray-300 p-2">{formatDateToDDMMYYYY(p.DataPagamento)}</td>
                <td className="border border-gray-300 p-2">{Object.keys(Meses).find((key) => Meses[key] === p.MesReferente)}</td>
                <td className="border border-gray-300 p-2">{p.AnoReferente}</td>
                <td className="border border-gray-300 p-2">
                  <button
                    className={"font-bold py-1 px-2 rounded hover:bg-gray-300"}
                    style={!p.ComprovanteUrl ? { color: "red" } : { color: "green" }}
                    onClick={() => {
                      setPagamentoAtual(p);
                      setEditarComprovanteOpen(true);
                    }}
                  >
                    {p.ComprovanteUrl ? "Comprovante" : "Sem Comprovante"}
                  </button>
                </td>
                <td className="border border-gray-300 p-2">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                    onClick={() => {
                      setPagamentoAtual(p);
                      setAdicionarEditarPagamentoOpen(true);
                    }}
                  >
                    Editar
                  </button>
                </td>
                <td className="border border-gray-300 p-2">
                  <button
                    onClick={() => {
                      setPagamentoExcluir(p);
                      setExcluirPagamentoOpen(true);
                    }}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {hasNextPage && <IntersectionObserverContainer handleIntersection={fetchNextPage} />}
      </div>
      <HostModal isOpen={adicionarEditarPagamentoOpen} onRequestClose={() => setAdicionarEditarPagamentoOpen(false)}>
        <AdcionarEditarPagamentoForm onCancel={() => setAdicionarEditarPagamentoOpen(false)} pagamento={pagamentoAtual} />
      </HostModal>
      <HostModal isOpen={excluirPagamentoOpen} onRequestClose={() => setExcluirPagamentoOpen(false)}>
        <ExcluirConfirma
          onCancel={() => setExcluirPagamentoOpen(false)}
          onConfirm={() => excluirPagamento(pagamentoExcluir.Id)}
          mensagem={`Tem certeza que quer excluir o pagamento de '${pagamentoExcluir?.NomeInquilino}'?`}
          isError={isDeleteError}
          isLoading={isDeleteLoading}
          error={deleteError}
        />
      </HostModal>
      <HostModal isOpen={editarComprovanteOpen} onRequestClose={() => setEditarComprovanteOpen(false)}>
        <ComprovanteForm onCancel={() => setEditarComprovanteOpen(false)} pagamento={pagamentoAtual} />
      </HostModal>
    </>
  );
};

type AdcionarEditarPagamentoFormProps = {
  onCancel: () => void;
  pagamento?: Pagamento;
};

const AdcionarEditarPagamentoForm: FC<AdcionarEditarPagamentoFormProps> = ({ onCancel, pagamento }) => {
  const { mutateAsync: adicionarEditarPagamento, isError, isLoading, error } = useAdicionarEditarPagamento();
  const [inquilinoId, setInquilinoid] = useState(pagamento?.InquilinoId);
  const [valor, setValor] = useState(pagamento?.Valor);
  const [dataPagamento, setDataPagamento] = useState(pagamento?.DataPagamento);
  const [mesReferente, setMesreferente] = useState(pagamento?.MesReferente);
  const [anoReferente, setAnoReferente] = useState(pagamento?.AnoReferente);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await adicionarEditarPagamento({ id: pagamento?.Id, inquilinoId, valor, dataPagamento, mesReferente, anoReferente });
    if (!isError) {
      onCancel();
    }
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col justify-center items-start gap-4 py-2 px-14">
      <div className="flex flex-row gap-2">
        <InquilinoSelect inquilinoId={inquilinoId} setInquilinoId={setInquilinoid} />
      </div>
      <div className="flex flex-row w-full justify-between">
        <div className="flex flex-col">
          <label htmlFor="pagamento-valor" className="text-gray-700 font-bold mb-1">
            Valor
          </label>
          <input
            max={10000}
            min={200}
            type="number"
            id="pagamento-valor-input"
            name="pagamento-valor"
            required
            className="border rounded p-2 w-full focus:border-blue-500"
            placeholder="Valor do Pagamento"
            value={valor || ""}
            onChange={(e) => setValor(e.target.value ? Number(e.target.value) : 0)}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="pagamento-data" className="text-gray-700 font-bold mb-1">
            Data do Pagamento
          </label>
          <input
            type="date"
            required
            id="pagamento-data-input"
            name="pagamento-data"
            className="border rounded p-2 w-full focus:border-blue-500"
            value={dataPagamento ? new Date(dataPagamento).toISOString().substring(0, 10) : ""}
            onChange={(e) => setDataPagamento(e.target.value ? new Date(e.target.value) : null)}
          />
        </div>
      </div>
      <div className="flex flex-row gap-5">
        <div className="flex flex-col">
          <MesSelect mes={mesReferente} setMes={setMesreferente} />
        </div>
        <AnoSelect ano={anoReferente} setAno={setAnoReferente} />
      </div>
      <ButtonCancelarConfirmar onCancel={onCancel} />
      {isError && !isLoading && <p className="py-5 text-red-500">{error.message}</p>}
    </form>
  );
};

"use client";
import { FC, FormEvent, useState } from "react";
import HostModal from "./Shared/HostModal";
import { Pagamento } from "@/types/Pagamento";
import { ButtonCancelarConfirmar } from "./Shared/ButtonCancelarConfirmar";
import { useAdicionarEditarPagamento, useExcluirPagamento, useGetAllPagamentos } from "@/EasySuitesApi/EasySuitesQueries";
import { InquilinoSelect } from "./Shared/InquilinoSelect";
import MesSelect from "./Shared/MesSelect";
import AnoSelect from "./Shared/AnoSelect";
import { Meses, formatDateToDDMMMYYYY } from "@/app/utils";
import { ExcluirConfirma } from "./Shared/ExcluirConfirma";
import { ComprovanteForm } from "./Comprovantes";
import IntersectionObserverContainer from "./Shared/IntersectionObserverContainer";
import { PropriedadeSelect } from "./Shared/PropriedadeSelect";
import { BeneficiarioSelect } from "./Shared/BeneficiarioSelect";

export const Pagamentos: FC = () => {
  const [mesReferente, setMesReferente] = useState(null);
  const [anoReferente, setAnoReferente] = useState(null);
  const [propriedadeId, setPropriedadeId] = useState(null);
  const [inquilinoId, setInquilinoId] = useState(null);
  const [beneficiarioId, setBeneficiarioId] = useState(null);
  const { pagamentos, hasNextPage, fetchNextPage, refetch } = useGetAllPagamentos({ anoReferente, mesReferente, inquilinoId, propriedadeId, beneficiarioId });
  const { mutateAsync: excluirPagamento, isError: isDeleteError, isLoading: isDeleteLoading, error: deleteError } = useExcluirPagamento();
  const [pagamentoAtual, setPagamentoAtual] = useState(null);
  const [adicionarEditarPagamentoOpen, setAdicionarEditarPagamentoOpen] = useState(false);
  const [excluirPagamentoOpen, setExcluirPagamentoOpen] = useState(false);
  const [pagamentoExcluir, setPagamentoExcluir] = useState<Pagamento>(null);
  const [editarComprovanteOpen, setEditarComprovanteOpen] = useState(false);
  const [observacaoOpen, setObservacaoOpen] = useState(false);

  const onCancel = () => {
    setAdicionarEditarPagamentoOpen(false);
    setPagamentoAtual(null);
  };

  const onCloseObservacao = () => {
    setObservacaoOpen(false);
    setPagamentoAtual(null);
  };

  const onChangeAno = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (!e.target.value) {
      setMesReferente(null);
    }
    setAnoReferente(e.target.value);
  };

  const onChangePropriedade = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setInquilinoId(null);
    setPropriedadeId(e.target.value ? Number(e.target.value) : null);
  };

  return (
    <>
      <div className="flex flex-row items-end justify-between mt-5 px-4 rounded p-absolute">
        <div className="flex items-end gap-5 w-3/4">
          <AnoSelect ano={anoReferente} onChange={onChangeAno} />
          {anoReferente && <MesSelect mes={mesReferente} setMes={setMesReferente} />}
          <PropriedadeSelect propriedadeId={propriedadeId} onChange={onChangePropriedade} />
          <InquilinoSelect inquilinoId={inquilinoId} setInquilinoId={setInquilinoId} propriedadeId={propriedadeId} />
          <BeneficiarioSelect beneficiarioId={beneficiarioId} setBeneficiarioId={setBeneficiarioId} />
          <button onClick={() => refetch()} className="bg-purple-500 hover:bg-purple-700 text-white h-1/2 font-bold text-lg py-2 px-8 rounded">
            Filtrar
          </button>
        </div>
        <button
          onClick={() => setAdicionarEditarPagamentoOpen(true)}
          className="bg-green-500 hover:bg-green-700 text-white font-bold text-lg py-2 px-8 rounded"
        >
          Adicionar
        </button>
      </div>

      <div className="mt-100 h-[700px] overflow-y-auto">
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
              <th className="border p-2">Beneficiário</th>
              <th className="border p-2">Comprovante</th>
              <th className="border p-2">Observação</th>
              <th className="border p-2 w-1"></th>
              <th className="border p-2 w-1"></th>
            </tr>
          </thead>
          <tbody>
            {pagamentos.map((p, index) => (
              <tr key={index} className={p.Id ? `bg-green-200` : `bg-red-200`}>
                <td className="border border-gray-300 p-2">{p.NomeInquilino}</td>
                <td className="border border-gray-300 p-2">{p.PropriedadeNome}</td>
                <td className="border border-gray-300 p-2">{p.NumeroQuarto}</td>
                <td className="border border-gray-300 p-2">R$ {p.Valor}</td>
                <td className="border border-gray-300 p-2">{formatDateToDDMMMYYYY(p.DataPagamento)}</td>
                <td className="border border-gray-300 p-2">{Object.keys(Meses).find((key) => Meses[key] === p.MesReferente)}</td>
                <td className="border border-gray-300 p-2">{p.AnoReferente}</td>
                <td className="border border-gray-300 p-2">{p.BeneficiarioNome}</td>
                <td className="border border-gray-300 p-2">
                  <button
                    className={"font-bold py-1 px-2 rounded hover:bg-gray-300"}
                    style={!p.ComprovanteUrl ? { color: "red" } : { color: "green" }}
                    onClick={() => {
                      setPagamentoAtual(p);
                      setEditarComprovanteOpen(true);
                    }}
                    disabled={!p.Id}
                  >
                    {p.ComprovanteUrl ? "Comprovante" : "Sem Comprovante"}
                  </button>
                </td>
                <td className="border border-gray-300 p-2">
                  <button
                    disabled={!p.Observacao}
                    className={"font-bold py-1 px-2 text-blue-500 rounded hover:bg-blue-300"}
                    onClick={() => {
                      console.log(p);
                      setPagamentoAtual(p);
                      setObservacaoOpen(true);
                    }}
                  >
                    {p.Observacao ? "Observação" : "Sem Observação"}
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
      <div className="py-2 font-bold">
        <p>
          Pagamentos: <span className="text-blue-700">{pagamentos.filter((p) => !!p.Id).length}</span>
        </p>
        {pagamentos.filter((p) => !p.Id).length > 0 && (
          <p>
            Faltando: <span className="text-red-500">{pagamentos.filter((p) => !p.Id).length}</span>
          </p>
        )}
        <p>
          Valor Total: <span className="text-blue-700">R$ {pagamentos.reduce((total, pagamento) => total + pagamento.Valor, 0)}</span>
        </p>
      </div>
      <HostModal isOpen={adicionarEditarPagamentoOpen} onRequestClose={onCancel}>
        <AdcionarEditarPagamentoForm onCancel={onCancel} pagamento={pagamentoAtual} />
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
      <HostModal isOpen={editarComprovanteOpen} onRequestClose={() => {setEditarComprovanteOpen(false);setPagamentoAtual(null)}}>
        <ComprovanteForm onCancel={() => {setEditarComprovanteOpen(false);setPagamentoAtual(null)}} pagamento={pagamentoAtual} />
      </HostModal>
      <HostModal isOpen={observacaoOpen} onRequestClose={onCloseObservacao}>
        <div className="flex flex-col justify-between items-center h-48">
          <textarea disabled className="w-full p-1 h-28 border-2 border-gray-200" value={pagamentoAtual?.Observacao}></textarea>
          <button onClick={onCloseObservacao} className="bg-gray-500 hover:bg-gray-700 text-white font-bold  py-2 px-6 rounded mb-5">
            Fechar
          </button>
        </div>
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
  const [mesReferente, setMesreferente] = useState(pagamento?.MesReferente || new Date().getMonth() + 1); // +1 here, due to the fact that database months starts at 1 and not 0
  const [anoReferente, setAnoReferente] = useState(pagamento?.AnoReferente || new Date().getUTCFullYear().toString());
  const [observacao, setObservacao] = useState(pagamento?.Observacao);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await adicionarEditarPagamento({ id: pagamento?.Id, inquilinoId, valor, dataPagamento, mesReferente, anoReferente, observacao });
    if (!isError) {
      onCancel();
    }
  };

  const onChangeAno = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAnoReferente(e.target.value);
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col justify-center items-start gap-4 py-2 px-6">
      <div className="flex flex-row justify-between w-full">
        <InquilinoSelect inquilinoId={inquilinoId} setInquilinoId={setInquilinoid} />
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
            placeholder="Valor "
            value={valor || ""}
            onChange={(e) => setValor(e.target.value ? Number(e.target.value) : 0)}
          />
        </div>
      </div>
      <div className="flex flex-row w-full justify-between">
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
        <div className="flex flex-col">
          <MesSelect mes={mesReferente} setMes={setMesreferente} />
        </div>
        <AnoSelect ano={anoReferente} onChange={onChangeAno} />
      </div>
      <div className="flex flex-col w-full">
        <label htmlFor="pagamento-obeservacao" className="text-gray-700 font-bold mb-1">
          Observação
        </label>
        <textarea
          name="pagamento-obeservacao"
          className="w-full p-1 h-28 border-2 border-gray-200"
          maxLength={100}
          value={observacao}
          onChange={(e) => setObservacao(e.target.value)}
        ></textarea>
      </div>
      <ButtonCancelarConfirmar onCancel={onCancel} />
      {isError && !isLoading && <p className="py-5 text-red-500">{error.message}</p>}
    </form>
  );
};

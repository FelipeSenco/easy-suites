import { SqlTypes } from "@/app/enums/enums";
import { Beneficario } from "@/types/Beneficiario";
import { Inquilino } from "@/types/Inquilino";
import { Pagamento } from "@/types/Pagamento";
import { Propriedade } from "@/types/Propriedade";
import { Quarto } from "@/types/Quarto";
import {
  AdicionarEditarComprovante,
  AdicionarEditarInquilinoData,
  AdicionarEditarPagamento,
  EditarValorQuartoData,
  GenerateFromReceiptResponse,
  GetAllPagamentos,
  GetComprovantePdf,
} from "@/types/RequestData";
import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

//GETS
export const getAllPropriedades = async () => {
  const response = await axios.post(`${apiUrl}/executeProc`, {
    procName: "GetAllPropriedades",
    parameters: [],
  });
  return response.data as Propriedade[];
};

export const getAllBeneficiarios = async () => {
  const response = await axios.post(`${apiUrl}/executeProc`, {
    procName: "GetAllBeneficiarios",
    parameters: [],
  });
  return response.data as Beneficario[];
};

export const getAllQuartos = async () => {
  const response = await axios.post(`${apiUrl}/executeProc`, {
    procName: "GetAllQuartos",
    parameters: [],
  });
  return response.data as Quarto[];
};

export const getAllInquilinos = async () => {
  const response = await axios.post(`${apiUrl}/executeProc`, {
    procName: "GetAllInquilinos",
    parameters: [],
  });
  return response.data as Inquilino[];
};

export const getAllPagamentos = async (data: GetAllPagamentos = { pageParam: 0, anoReferente: "", mesReferente: null }) => {
  const response = await axios.post(`${apiUrl}/executeProc`, {
    procName: "GetAllPagamentos",
    parameters: [
      { name: "page", type: SqlTypes.SmallInt, value: data.pageParam },
      { name: "anoReferente", type: SqlTypes.Varchar, value: !!data.anoReferente ? data.anoReferente : null },
      { name: "mesReferente", type: SqlTypes.TinyInt, value: !!data.mesReferente ? data.mesReferente : null },
      { name: "inquilinoId", type: SqlTypes.TinyInt, value: !!data.inquilinoId ? data.inquilinoId : null },
      { name: "propriedadeId", type: SqlTypes.Int, value: !!data.propriedadeId ? data.propriedadeId : null },
      { name: "beneficiarioId", type: SqlTypes.Int, value: !!data.beneficiarioId ? data.beneficiarioId : null },
    ],
  });
  return response.data as Pagamento[];
};

export const generateDataFromReceipt = async (base64File: string) => {
  const response = await axios.post(`${apiUrl}/generateFromReceipt`, { base64File });

  return JSON.parse((response.data.choices[0].message.content as string).replace("```json\n", "").replace("\n```", "")) as GenerateFromReceiptResponse;
};

//UPDATES
export const editarValorQuarto = async (editarValorQuartoData: EditarValorQuartoData) => {
  const response = await axios.post(`${apiUrl}/executeProc`, {
    procName: "EditarValorQuarto",
    parameters: [
      { name: "novoValor", type: SqlTypes.Money, value: editarValorQuartoData.novoValor },
      { name: "quartoId", type: SqlTypes.Int, value: editarValorQuartoData.quartoId },
    ],
  });
  return response;
};

export const adicionarEditarInquilino = async (adicionarEditarInquilinoData: AdicionarEditarInquilinoData) => {
  const response = await axios.post(`${apiUrl}/executeProc`, {
    procName: "AdicionarEditarInquilino",
    parameters: [
      { name: "id", type: SqlTypes.Int, value: adicionarEditarInquilinoData.id },
      { name: "quartoId", type: SqlTypes.Int, value: adicionarEditarInquilinoData.quartoId },
      { name: "propriedadeId", type: SqlTypes.Int, value: adicionarEditarInquilinoData.propriedadeId },
      { name: "nome", type: SqlTypes.Varchar, value: adicionarEditarInquilinoData.nome },
      { name: "beneficiarioId", type: SqlTypes.Int, value: adicionarEditarInquilinoData.beneficiarioId },
      { name: "inicioAluguel", type: SqlTypes.DateTime, value: adicionarEditarInquilinoData.inicioAluguel },
      { name: "fimAluguel", type: SqlTypes.DateTime, value: adicionarEditarInquilinoData.fimAluguel },
      { name: "diaVencimento", type: SqlTypes.TinyInt, value: adicionarEditarInquilinoData.diaVencimento },
      { name: "cpf", type: SqlTypes.Varchar, value: adicionarEditarInquilinoData.cpf },
      { name: "telefone", type: SqlTypes.Varchar, value: adicionarEditarInquilinoData.telefone },
    ],
  });
  return response.data[0] as Inquilino;
};

export const adicionarEditarPagamento = async (adicionarEditarPagamento: AdicionarEditarPagamento) => {
  const response = await axios.post(`${apiUrl}/executeProc`, {
    procName: "AdicionarEditarPagamento",
    parameters: [
      { name: "id", type: SqlTypes.Int, value: adicionarEditarPagamento.id },
      { name: "inquilinoId", type: SqlTypes.Int, value: adicionarEditarPagamento.inquilinoId },
      { name: "valor", type: SqlTypes.Money, value: adicionarEditarPagamento.valor },
      { name: "dataPagamento", type: SqlTypes.DateTime, value: adicionarEditarPagamento.dataPagamento },
      { name: "mesReferente", type: SqlTypes.TinyInt, value: adicionarEditarPagamento.mesReferente },
      { name: "anoReferente", type: SqlTypes.Varchar, value: adicionarEditarPagamento.anoReferente },
      { name: "observacao", type: SqlTypes.Varchar, value: !!adicionarEditarPagamento.observacao ? adicionarEditarPagamento.observacao : null },
    ],
  });
  return response.data[0] as Pagamento;
};

export const adicionarEditarComprovante = async (data: AdicionarEditarComprovante) => {
  const responseFromBlob = await axios.post(`${apiUrl}/postBlobImage`, data);

  const response = await axios.post(`${apiUrl}/executeProc`, {
    procName: "AdicionarEditarComprovante",
    parameters: [
      { name: "pagamentoId", type: SqlTypes.Int, value: data.pagamento.Id },
      {
        name: "url",
        type: SqlTypes.Varchar,
        value: responseFromBlob?.data?.url,
      },
    ],
  });
  return response.data[0] as { url: string; message: string };
};

export const excluirInquilino = async (id: number) => {
  const response = await axios.post(`${apiUrl}/executeProc`, {
    procName: "ExcluirInquilino",
    parameters: [{ name: "id", type: SqlTypes.Int, value: id }],
  });
  return response;
};

export const excluirPagamento = async (id: number) => {
  const response = await axios.post(`${apiUrl}/executeProc`, {
    procName: "ExcluirPagamento",
    parameters: [{ name: "id", type: SqlTypes.Int, value: id }],
  });
  return response;
};

export const getJpegFromPdf = async (base64Pdf: string) => {
  try {
    const response = await axios.post(`${apiUrl}/pdfToJpeg`, { base64Pdf });
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

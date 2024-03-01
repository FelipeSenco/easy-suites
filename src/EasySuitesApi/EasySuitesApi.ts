import { SqlTypes } from "@/app/enums/enums";
import { Beneficary } from "@/types/Beneficiary";
import { Tenant } from "@/types/Tenant";
import { Payment } from "@/types/Payment";
import { Property } from "@/types/Property";
import { Room } from "@/types/Room";
import axios from "axios";
import {
  AddEditPaymentData,
  AddEditReceiptData,
  AddEditTenantData,
  EditRoomValueData,
  GenerateFromReceiptResponse,
  GetAllPaymentsData,
} from "@/types/RequestData";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

//GETS
export const getAllProperties = async () => {
  const response = await axios.post(`${apiUrl}/executeProc`, {
    procName: "GetAllPropriedades",
    parameters: [],
  });
  return response.data as Property[];
};

export const getAllBeneficiaries = async () => {
  const response = await axios.post(`${apiUrl}/executeProc`, {
    procName: "GetAllBeneficiarios",
    parameters: [],
  });
  return response.data as Beneficary[];
};

export const getAllRooms = async () => {
  const response = await axios.post(`${apiUrl}/executeProc`, {
    procName: "GetAllQuartos",
    parameters: [],
  });
  return response.data as Room[];
};

export const getAllTenants = async () => {
  const response = await axios.post(`${apiUrl}/executeProc`, {
    procName: "GetAllInquilinos",
    parameters: [],
  });
  return response.data as Tenant[];
};

export const getAllPayments = async (data: GetAllPaymentsData = { pageParam: 0, anoReferente: "", mesReferente: null }) => {
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
  return response.data as Payment[];
};

export const generateDataFromReceipt = async (base64File: string) => {
  const response = await axios.post(`${apiUrl}/generateFromReceipt`, { base64File });

  return JSON.parse((response.data.choices[0].message.content as string).replace("```json\n", "").replace("\n```", "")) as GenerateFromReceiptResponse;
};

//UPDATES
export const editRoomValue = async (editarValorQuartoData: EditRoomValueData) => {
  const response = await axios.post(`${apiUrl}/executeProc`, {
    procName: "EditarValorQuarto",
    parameters: [
      { name: "novoValor", type: SqlTypes.Money, value: editarValorQuartoData.novoValor },
      { name: "quartoId", type: SqlTypes.Int, value: editarValorQuartoData.quartoId },
    ],
  });
  return response;
};

export const addEditTenant = async (adicionarEditarInquilinoData: AddEditTenantData) => {
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
  return response.data[0] as Tenant;
};

export const addEditPayment = async (adicionarEditarPagamento: AddEditPaymentData) => {
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
  return response.data[0] as Payment;
};

export const addEditReceipt = async (data: AddEditReceiptData) => {
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

export const deleteTenant = async (id: number) => {
  const response = await axios.post(`${apiUrl}/executeProc`, {
    procName: "ExcluirInquilino",
    parameters: [{ name: "id", type: SqlTypes.Int, value: id }],
  });
  return response;
};

export const deletePayment = async (id: number) => {
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

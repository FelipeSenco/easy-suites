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

export const getAllPayments = async (data: GetAllPaymentsData = { pageParam: 0, referenceYear: "", referenceMonth: null }) => {
  const response = await axios.post(`${apiUrl}/executeProc`, {
    procName: "GetAllPagamentos",
    parameters: [
      { name: "page", type: SqlTypes.SmallInt, value: data.pageParam },
      { name: "anoReferente", type: SqlTypes.Varchar, value: !!data.referenceYear ? data.referenceYear : null },
      { name: "mesReferente", type: SqlTypes.TinyInt, value: !!data.referenceMonth ? data.referenceMonth : null },
      { name: "inquilinoId", type: SqlTypes.TinyInt, value: !!data.tenantId ? data.tenantId : null },
      { name: "propriedadeId", type: SqlTypes.Int, value: !!data.propertyId ? data.propertyId : null },
      { name: "beneficiarioId", type: SqlTypes.Int, value: !!data.beneficiaryId ? data.beneficiaryId : null },
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
      { name: "novoValor", type: SqlTypes.Money, value: editarValorQuartoData.newValue },
      { name: "quartoId", type: SqlTypes.Int, value: editarValorQuartoData.roomId },
    ],
  });
  return response;
};

export const addEditTenant = async (adicionarEditarInquilinoData: AddEditTenantData) => {
  const response = await axios.post(`${apiUrl}/executeProc`, {
    procName: "AdicionarEditarInquilino",
    parameters: [
      { name: "id", type: SqlTypes.Int, value: adicionarEditarInquilinoData.id },
      { name: "quartoId", type: SqlTypes.Int, value: adicionarEditarInquilinoData.roomId },
      { name: "propriedadeId", type: SqlTypes.Int, value: adicionarEditarInquilinoData.propertyId },
      { name: "nome", type: SqlTypes.Varchar, value: adicionarEditarInquilinoData.name },
      { name: "beneficiarioId", type: SqlTypes.Int, value: adicionarEditarInquilinoData.beneficiaryId },
      { name: "inicioAluguel", type: SqlTypes.DateTime, value: adicionarEditarInquilinoData.rentStartDate },
      { name: "fimAluguel", type: SqlTypes.DateTime, value: adicionarEditarInquilinoData.rentEndDate },
      { name: "diaVencimento", type: SqlTypes.TinyInt, value: adicionarEditarInquilinoData.paymentDay },
      { name: "cpf", type: SqlTypes.Varchar, value: adicionarEditarInquilinoData.cpf },
      { name: "telefone", type: SqlTypes.Varchar, value: adicionarEditarInquilinoData.fone },
    ],
  });
  return response.data[0] as Tenant;
};

export const addEditPayment = async (adicionarEditarPagamento: AddEditPaymentData) => {
  const response = await axios.post(`${apiUrl}/executeProc`, {
    procName: "AdicionarEditarPagamento",
    parameters: [
      { name: "id", type: SqlTypes.Int, value: adicionarEditarPagamento.id },
      { name: "inquilinoId", type: SqlTypes.Int, value: adicionarEditarPagamento.tenantId },
      { name: "valor", type: SqlTypes.Money, value: adicionarEditarPagamento.value },
      { name: "dataPagamento", type: SqlTypes.DateTime, value: adicionarEditarPagamento.paymentDate },
      { name: "mesReferente", type: SqlTypes.TinyInt, value: adicionarEditarPagamento.referenceMonth },
      { name: "anoReferente", type: SqlTypes.Varchar, value: adicionarEditarPagamento.referenceYear },
      { name: "observacao", type: SqlTypes.Varchar, value: !!adicionarEditarPagamento.observation ? adicionarEditarPagamento.observation : null },
    ],
  });
  return response.data[0] as Payment;
};

export const addEditReceipt = async (data: AddEditReceiptData) => {
  const responseFromBlob = await axios.post(`${apiUrl}/postBlobImage`, data);

  const response = await axios.post(`${apiUrl}/executeProc`, {
    procName: "AdicionarEditarComprovante",
    parameters: [
      { name: "pagamentoId", type: SqlTypes.Int, value: data.payment.Id },
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

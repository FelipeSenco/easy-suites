import { Pagamento } from "./Payment";

export type GetAllPaymentsData = {
  pageParam: number;
  anoReferente: string;
  mesReferente: number;
  inquilinoId?: number;
  propriedadeId?: number;
  beneficiarioId?: number;
};

export type EditRoomValueData = {
  novoValor: number;
  quartoId: number;
};

export type AddEditTenantData = {
  id?: number;
  quartoId?: number;
  propriedadeId: number;
  nome: string;
  beneficiarioId?: number;
  inicioAluguel?: Date;
  fimAluguel?: Date;
  diaVencimento?: number;
  cpf?: string;
  telefone?: string;
};

export type AddEditPaymentData = {
  id?: number;
  inquilinoId: number;
  valor: number;
  dataPagamento: Date;
  mesReferente: number;
  anoReferente: string;
  observacao?: string;
};

export type AddEditReceiptData = { imageBase64: string; pagamento: Pagamento };

export type GenerateFromReceiptResponse = { dataPagamento: string; valorPago: number; nomePagador: string };

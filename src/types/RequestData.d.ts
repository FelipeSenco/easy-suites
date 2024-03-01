import { Payment } from "./Payment";

export type GetAllPaymentsData = {
  pageParam: number;
  referenceYear: string;
  referenceMonth: number;
  tenantId?: number;
  propertyId?: number;
  beneficiaryId?: number;
};

export type EditRoomValueData = {
  newValue: number;
  roomId: number;
};

export type AddEditTenantData = {
  id?: number;
  roomId?: number;
  propertyId: number;
  name: string;
  beneficiaryId?: number;
  rentStartDate?: Date;
  rentEndDate?: Date;
  paymentDay?: number;
  cpf?: string;
  fone?: string;
};

export type AddEditPaymentData = {
  id?: number;
  tenantId: number;
  value: number;
  paymentDate: Date;
  referenceMonth: number;
  referenceYear: string;
  observation?: string;
};

export type AddEditReceiptData = { imageBase64: string; payment: Payment };

export type GenerateFromReceiptResponse = { dataPagamento: string; valorPago: number; nomePagador: string };

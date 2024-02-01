import { Pagamento } from "./Pagamento";

export type GetAllPagamentos = {
  pageParam: number;
};

export type EditarValorQuartoData = {
  novoValor: number;
  quartoId: number;
};

export type AdicionarEditarInquilinoData = {
  id?: number;
  quartoId?: number;
  propriedadeId: number;
  nome: string;
  beneficiarioId?: number;
  inicioAluguel?: Date;
  fimAluguel?: Date;
  diaVencimento?: number;
  cpf?: string;
};

export type AdicionarEditarPagamento = {
  id?: number;
  inquilinoId: number;
  valor: number;
  dataPagamento: Date;
  mesReferente: number;
  anoReferente: string;
};

export type AdicionarEditarComprovante = { imageBase64: string; pagamento: Pagamento };

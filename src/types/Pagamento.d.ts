export type Pagamento = {
  Id: number;
  NomeInquilino: string;
  InquilinoId: int;
  PropriedadeNome: string;
  PropriedadeId: number;
  NumeroQuarto: number;
  QuartoId: number;
  Valor: number;
  DataPagamento: Date;
  MesReferente: number;
  AnoReferente: string;
  ComprovanteUrl: string;
  BeneficiarioNome?: string;
  Observacao?: string;
};

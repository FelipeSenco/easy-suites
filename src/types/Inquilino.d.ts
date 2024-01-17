export type Inquilino = {
  Id: number;
  Nome: String;
  QuartoId: number;
  NumeroQuarto: number;
  PropriedadeId: number;
  PropriedadeNome: string;
  Cpf: string;
  BeneficiarioId?: number;
  BeneficiarioNome?: string;
  DiaVencimento?: number;
  InicioAluguel?: Date;
  FimAluguel?: Date;
};

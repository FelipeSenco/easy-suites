export type Beneficario = {
  Id: number;
  Nome: string;
  BancoCodigo: number;
  Banco: string;
  NumeroConta: number;
  DigitoConta: number;
  Agencia: number;
  ChavePix?: string;
  Cpf?: string;
};

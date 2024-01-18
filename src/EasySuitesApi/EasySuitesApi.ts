import { SqlTypes } from "@/app/enums/enums";
import { Beneficario } from "@/types/Beneficiario";
import { Inquilino } from "@/types/Inquilino";
import { Propriedade } from "@/types/Propriedade";
import { Quarto } from "@/types/Quarto";
import { EditarValorQuartoData } from "@/types/RequestData";
import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

//GETS
export const getAllPropriedades = async () => {
  const response = await axios.post(`${apiUrl}/api/executeProc`, {
    procName: "GetAllPropriedades",
    parameters: [],
  });
  return response.data as Propriedade[];
};

export const getAllBeneficiarios = async () => {
  const response = await axios.post(`${apiUrl}/api/executeProc`, {
    procName: "GetAllBeneficiarios",
    parameters: [],
  });
  return response.data as Beneficario[];
};

export const getAllQuartos = async () => {
  const response = await axios.post(`${apiUrl}/api/executeProc`, {
    procName: "GetAllQuartos",
    parameters: [],
  });
  return response.data as Quarto[];
};

export const getAllInquilinos = async () => {
  const response = await axios.post(`${apiUrl}/api/executeProc`, {
    procName: "GetAllInquilinos",
    parameters: [],
  });
  return response.data as Inquilino[];
};

//UPDATES
export const editarValorQuarto = async (editarValorQuartoData: EditarValorQuartoData) => {
  const response = await axios.post(`${apiUrl}/api/executeProc`, {
    procName: "EditarValorQuarto",
    parameters: [
      { name: "novoValor", type: SqlTypes.Money, value: editarValorQuartoData.novoValor },
      { name: "quartoId", type: SqlTypes.Int, value: editarValorQuartoData.quartoId },
    ],
  });
  return response;
};

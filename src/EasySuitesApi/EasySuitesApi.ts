import { Beneficario } from "@/types/Beneficiario";
import { Inquilino } from "@/types/Inquilino";
import { Propriedade } from "@/types/Propriedade";
import { Quarto } from "@/types/Quarto";
import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

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

import { Beneficario } from "@/types/Beneficiario";
import { Propriedade } from "@/types/Propriedade";
import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const getAllPropriedades = async () => {
  const response = await axios.post(`${apiUrl}/api/executeProc`, {
    procName: "GetAllPropriedades",
    parameters: [], // No parameters
  });
  return response.data as Propriedade[];
};

export const getAllBeneficiarios = async () => {
  const response = await axios.post(`${apiUrl}/api/executeProc`, {
    procName: "GetAllBeneficiarios",
    parameters: [], // No parameters
  });
  return response.data as Beneficario[];
};

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

import axios from "axios";

export const getAllPropriedades = async () => {
  console.log("called");
  const response = await axios.post(`${apiUrl}/api/executeProc`, {
    procName: "GetAllPropriedades",
    parameters: [], // No parameters
  });
  return response.data;
};

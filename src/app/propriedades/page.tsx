"use client";
import Propriedades from "@/Components/Propriedades";
import { FC, useEffect, useState } from "react";
import { getAllPropriedades } from "../EasySuitesApi/EasySuitesApi";

const PaginaPropriedades: FC = () => {
  const [propriedades, setPropriedades] = useState(null);
  useEffect(() => {
    getAllPropriedades().then((res) => {
      setPropriedades(res);
    });
  }, []);

  if (!propriedades) return null;
  return <Propriedades propriedades={propriedades} />;
};

export default PaginaPropriedades;

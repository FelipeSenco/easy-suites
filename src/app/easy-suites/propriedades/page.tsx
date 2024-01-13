"use client";
import Propriedades from "@/Components/Propriedades";
import { FC, useEffect, useState } from "react";
import { getAllPropriedades } from "../../EasySuitesApi/EasySuitesApi";
import { useGetAllPropriedades } from "../../EasySuitesApi/EasySuitesQueries";

const PaginaPropriedades: FC = () => {
  const propriedades = useGetAllPropriedades();

  if (!propriedades) return null;
  return <Propriedades propriedades={propriedades} />;
};

export default PaginaPropriedades;

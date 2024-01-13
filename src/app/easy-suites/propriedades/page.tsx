"use client";
import Propriedades from "@/Components/Propriedades";
import { FC } from "react";

import { useGetAllPropriedades } from "../../../EasySuitesApi/EasySuitesQueries";
import { Propriedade } from "@/types/Propriedade";

const PaginaPropriedades: FC = () => {
  const { data, isLoading, isError } = useGetAllPropriedades();

  if (isLoading) return null;
  if (isError || data?.length == 0) return null;
  return <Propriedades propriedades={data as Propriedade[]} />;
};

export default PaginaPropriedades;

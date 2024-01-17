"use client";
import { Quartos } from "@/Components/Quartos";
import { useGetAllQuartos } from "@/EasySuitesApi/EasySuitesQueries";
import { Quarto } from "@/types/Quarto";
import { FC } from "react";

const PaginaQuartos: FC = () => {
  const { data, isLoading, isError } = useGetAllQuartos();

  if (isLoading) return null;
  if (isError || data?.length == 0) return null;
  return <Quartos quartos={data as Quarto[]} />;
};

export default PaginaQuartos;

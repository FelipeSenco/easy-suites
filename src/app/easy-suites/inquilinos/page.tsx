"use client";
import { Inquilinos } from "@/Components/Inquilinos";
import { useGetAllInquilinos } from "@/EasySuitesApi/EasySuitesQueries";
import { Inquilino } from "@/types/Inquilino";
import { FC } from "react";

const PaginaInquilinos: FC = () => {
  const { data, isLoading, isError } = useGetAllInquilinos();

  if (isLoading) return null;
  if (isError || data?.length == 0) return null;
  return <Inquilinos inquilinos={data as Inquilino[]} />;
};

export default PaginaInquilinos;

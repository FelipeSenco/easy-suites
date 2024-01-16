"use client";
import { Beneficiarios } from "@/Components/Beneficiarios";
import { useGetAllBeneficiarios } from "@/EasySuitesApi/EasySuitesQueries";
import { Beneficario } from "@/types/Beneficiario";
import { FC } from "react";

const PaginaBeneficiarios: FC = () => {
  const { data, isLoading, isError } = useGetAllBeneficiarios();

  if (isLoading) return null;
  if (isError || data?.length == 0) return null;
  return <Beneficiarios beneficiarios={data as Beneficario[]} />;
};

export default PaginaBeneficiarios;

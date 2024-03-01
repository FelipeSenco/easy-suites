"use client";
import { Beneficiaries } from "@/Components/Beneficaries";
import { useGetAllBeneficiaries } from "@/EasySuitesApi/EasySuitesQueries";
import { Beneficary } from "@/types/Beneficiary";
import { FC } from "react";

const BeneficiaryPage: FC = () => {
  const { data, isLoading, isError } = useGetAllBeneficiaries();

  if (isLoading) return null;
  if (isError || data?.length == 0) return null;
  return <Beneficiaries beneficiaries={data as Beneficary[]} />;
};

export default BeneficiaryPage;

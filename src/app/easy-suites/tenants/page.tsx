"use client";
import { LoadingSpinner } from "@/Components/Shared/LoadingSpinner";
import { Tenants } from "@/Components/Tenants";
import { useGetAllTenants } from "@/EasySuitesApi/EasySuitesQueries";
import { Tenant } from "@/types/Tenant";
import { FC } from "react";

const TenantsPAge: FC = () => {
  const { data, isFetching, isError } = useGetAllTenants();
  console.log(isFetching);

  if (isFetching || data.length === 0) return <LoadingSpinner />;
  if (isError) return <p className="text-red-300">Houve um problema ao resgatar os dados de inquilinos, tente atualizar a página.</p>;
  return <Tenants tenants={data as Tenant[]} />;
};

export default TenantsPAge;

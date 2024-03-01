"use client";
import { Tenants } from "@/Components/Tenants";
import { useGetAllTenants } from "@/EasySuitesApi/EasySuitesQueries";
import { Tenant } from "@/types/Tenant";
import { FC } from "react";

const TenantsPAge: FC = () => {
  const { data, isLoading, isError } = useGetAllTenants();

  if (isLoading) return null;
  if (isError || data?.length == 0) return null;
  return <Tenants tenants={data as Tenant[]} />;
};

export default TenantsPAge;

"use client";
import { FC } from "react";
import Properties from "@/Components/Properties";
import { useGetAllProperties } from "@/EasySuitesApi/EasySuitesQueries";

const PropertiesPage: FC = () => {
  const { data, isLoading, isError } = useGetAllProperties();

  if (isLoading) return null;
  if (isError || data?.length === 0) return null;
  return <Properties properties={data} />;
};

export default PropertiesPage;

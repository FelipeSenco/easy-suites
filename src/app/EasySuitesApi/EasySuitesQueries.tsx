"use client";
import { useQuery, useQueryClient } from "react-query";
import { getAllPropriedades } from "./EasySuitesApi";

export const useGetAllPropriedades = (enabled = false) => {
  const queryClient = useQueryClient();
  const currentData = queryClient.getQueryData(["propriedades"]) as [];
  console.log(currentData);
  const fetchEnabled = enabled || currentData?.length == 0;

  const { data, isLoading, isError } = useQuery(["propriedades"], {
    queryFn: getAllPropriedades,
    enabled: fetchEnabled,
    initialData: [],
  });

  return { data, isLoading, isError };
};

"use client";
import { useQuery, useQueryClient } from "react-query";
import { getAllBeneficiarios, getAllInquilinos, getAllPropriedades, getAllQuartos } from "./EasySuitesApi";

export const useGetAllPropriedades = (enabled = false) => {
  const queryClient = useQueryClient();
  const currentData = queryClient.getQueryData(["propriedades"]) as [];

  const fetchEnabled = enabled || currentData?.length == 0;

  const { data, isLoading, isError } = useQuery(["propriedades"], {
    queryFn: getAllPropriedades,
    enabled: fetchEnabled,
    initialData: [],
  });

  return { data, isLoading, isError };
};

export const useGetAllBeneficiarios = (enabled = false) => {
  const queryClient = useQueryClient();
  const currentData = queryClient.getQueryData(["beneficiarios"]) as [];

  const fetchEnabled = enabled || currentData?.length == 0;

  const { data, isLoading, isError } = useQuery(["beneficiarios"], {
    queryFn: getAllBeneficiarios,
    enabled: fetchEnabled,
    initialData: [],
  });

  return { data, isLoading, isError };
};

export const useGetAllQuartos = (enabled = false) => {
  const queryClient = useQueryClient();
  const currentData = queryClient.getQueryData(["quartos"]) as [];

  const fetchEnabled = enabled || currentData?.length == 0;

  const { data, isLoading, isError } = useQuery(["quartos"], {
    queryFn: getAllQuartos,
    enabled: fetchEnabled,
    initialData: [],
  });

  return { data, isLoading, isError };
};

export const useGetAllInquilinos = (enabled = false) => {
  const queryClient = useQueryClient();
  const currentData = queryClient.getQueryData(["inquilinos"]) as [];

  const fetchEnabled = enabled || currentData?.length == 0;

  const { data, isLoading, isError } = useQuery(["inquilinos"], {
    queryFn: getAllInquilinos,
    enabled: fetchEnabled,
    initialData: [],
  });

  return { data, isLoading, isError };
};

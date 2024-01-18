"use client";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { editarValorQuarto, getAllBeneficiarios, getAllInquilinos, getAllPropriedades, getAllQuartos } from "./EasySuitesApi";
import { Quarto } from "@/types/Quarto";

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

export const useEditarValorQuarto = () => {
  const queryClient = useQueryClient();

  return useMutation(editarValorQuarto, {
    onError: (error: Error) => {
      console.log(error);
    },
    onSuccess: (data, args, context) => {
      const currentData = queryClient.getQueryData(["quartos"]) as Quarto[];

      queryClient.setQueryData(
        ["quartos"],
        currentData.map((quarto) => (quarto.Id === args.quartoId ? { ...quarto, Valor: args.novoValor } : quarto))
      );
    },
  });
};

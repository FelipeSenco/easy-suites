"use client";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  adicionarEditarInquilino,
  adicionarEditarPagamento,
  editarValorQuarto,
  excluirInquilino,
  getAllBeneficiarios,
  getAllInquilinos,
  getAllPagamentos,
  getAllPropriedades,
  getAllQuartos,
} from "./EasySuitesApi";
import { Quarto } from "@/types/Quarto";
import { Inquilino } from "@/types/Inquilino";
import { Pagamento } from "@/types/Pagamento";

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

export const useGetAllPagamentos = (enabled = false) => {
  const queryClient = useQueryClient();
  const currentData = queryClient.getQueryData(["pagamentos"]) as [];

  const fetchEnabled = enabled || currentData?.length == 0;

  const { data, isLoading, isError } = useQuery(["pagamentos"], {
    queryFn: getAllPagamentos,
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

export const useAdicionarEditarInquilino = () => {
  const queryClient = useQueryClient();

  return useMutation(adicionarEditarInquilino, {
    onError: (error: Error) => {
      console.log(error);
    },
    onSuccess: (data, args, context) => {
      const currentData = queryClient.getQueryData(["inquilinos"]) as Inquilino[];

      if (args.id) {
        queryClient.setQueryData(
          ["inquilinos"],
          currentData.map((inquilino) => (inquilino.Id === args.id ? data : inquilino))
        );
      } else {
        queryClient.setQueryData(["inquilinos"], [data, ...currentData]);
      }
    },
  });
};

export const useAdicionarEditarPagamento = () => {
  const queryClient = useQueryClient();

  return useMutation(adicionarEditarPagamento, {
    onError: (error: Error) => {
      console.log(error);
    },
    onSuccess: (data, args, context) => {
      const currentData = queryClient.getQueryData(["pagamentos"]) as Pagamento[];

      if (args.id) {
        queryClient.setQueryData(
          ["pagamentos"],
          currentData.map((pagamento) => (pagamento.Id === args.id ? data : pagamento))
        );
      } else {
        queryClient.setQueryData(["pagamentos"], [data, ...currentData]);
      }
    },
  });
};

export const useExcluirInquilino = () => {
  const queryClient = useQueryClient();

  return useMutation(excluirInquilino, {
    onError: (error: Error) => {
      console.log(error);
    },
    onSuccess: (data, args, context) => {
      const currentData = queryClient.getQueryData(["inquilinos"]) as Inquilino[];

      queryClient.setQueryData(
        ["inquilinos"],
        currentData.filter((inquilino) => inquilino.Id !== args)
      );
    },
  });
};

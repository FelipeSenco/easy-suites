"use client";
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "react-query";
import {
  adicionarEditarComprovante,
  adicionarEditarInquilino,
  adicionarEditarPagamento,
  editarValorQuarto,
  excluirInquilino,
  excluirPagamento,
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

  const fetchEnabled = enabled || !currentData;

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

  const fetchEnabled = enabled || !currentData;

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

  const fetchEnabled = enabled || !currentData;

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

  const fetchEnabled = enabled || !currentData;

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
  const fetchEnabled = enabled || !currentData;

  const { data, isError, isFetching, isFetchingNextPage, refetch, fetchNextPage } = useInfiniteQuery(
    ["pagamentos"],
    async ({ pageParam = 0 }) => getAllPagamentos({ pageParam }),
    {
      getNextPageParam: (lastPage, pages) => pages.length,
      enabled: fetchEnabled,
      onError: (error: Error) => console.log(error),
    }
  );

  const pagamentos = data?.pages.flat() || [];
  const hasNextPage = data?.pages[data?.pages.length - 1]?.length === 15;

  return {
    pagamentos,
    data,
    isError,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    refetch,
    fetchNextPage,
  };
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
      queryClient.setQueryData(["pagamentos"], (oldQueryData: any) => {
        // Ensuring oldQueryData is treated as the paginated structure it is
        const pages = oldQueryData?.pages ?? [];

        // If editing an existing payment (args.id is provided)
        if (args.id) {
          return {
            ...oldQueryData,
            pages: pages.map((page: Pagamento[]) => page.map((pagamento) => (pagamento.Id === args.id ? { ...pagamento, ...data } : pagamento))),
          };
        }

        // If adding a new payment, prepend it to the first page
        else {
          const [firstPage, ...rest] = pages;
          return {
            ...oldQueryData,
            pages: [[data, ...firstPage], ...rest],
          };
        }
      });
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

export const useExcluirPagamento = () => {
  const queryClient = useQueryClient();

  return useMutation(excluirPagamento, {
    onError: (error: Error) => {
      console.log(error);
    },
    onSuccess: (data, args, context) => {
      const currentData = queryClient.getQueryData(["pagamentos"]) as Pagamento[];

      queryClient.setQueryData(["pagamentos"], (oldQueryData: any) => {
        // Ensuring oldQueryData is treated as the paginated structure it is
        const pages = oldQueryData?.pages ?? [];

        return {
          ...oldQueryData,
          pages: pages.map((page: Pagamento[]) => page.filter((pagamento) => pagamento.Id !== args)),
        };
      });
    },
  });
};

export const useAdicionarEditarComprovante = () => {
  const queryClient = useQueryClient();

  return useMutation(adicionarEditarComprovante, {
    onError: (error: Error) => {
      console.log(error);
    },
    onSuccess: (data, args, context) => {
      queryClient.setQueryData(["pagamentos"], (oldQueryData: any) => {
        // Ensuring oldQueryData is treated as the paginated structure it is
        const pages = oldQueryData?.pages ?? [];

        return {
          ...oldQueryData,
          pages: pages.map((page: Pagamento[]) =>
            page.map((pagamento) => (pagamento.Id === args.pagamento.Id ? { ...pagamento, ComprovanteUrl: data?.url } : pagamento))
          ),
        };
      });
    },
  });
};

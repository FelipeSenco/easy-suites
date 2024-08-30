"use client";
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "react-query";
import {
  addEditPayment,
  addEditReceipt,
  addEditTenant,
  deletePayment,
  deleteTenant,
  editRoomValue,
  generateDataFromReceipt,
  getAllBeneficiaries,
  getAllPayments,
  getAllProperties,
  getAllRooms,
  getAllTenants,
} from "./EasySuitesApi";
import { Room } from "@/types/Room";
import { Tenant } from "@/types/Tenant";
import { Payment } from "@/types/Payment";

export const useGetAllProperties = (enabled = false) => {
  const queryClient = useQueryClient();
  const currentData = queryClient.getQueryData(["propriedades"]) as [];

  const fetchEnabled = enabled || !currentData;

  const { data, isLoading, isError } = useQuery(["propriedades"], {
    queryFn: getAllProperties,
    enabled: fetchEnabled,
    initialData: [],
  });

  return { data, isLoading, isError };
};

export const useGetAllBeneficiaries = (enabled = false) => {
  const queryClient = useQueryClient();
  const currentData = queryClient.getQueryData(["beneficiarios"]) as [];

  const fetchEnabled = enabled || !currentData;

  const { data, isLoading, isError } = useQuery(["beneficiarios"], {
    queryFn: getAllBeneficiaries,
    enabled: fetchEnabled,
    initialData: [],
  });

  return { data, isLoading, isError };
};

export const useGetAllRooms = (enabled = false) => {
  const queryClient = useQueryClient();
  const currentData = queryClient.getQueryData(["quartos"]) as [];

  const fetchEnabled = enabled || !currentData;

  const { data, isLoading, isError } = useQuery(["quartos"], {
    queryFn: getAllRooms,
    enabled: fetchEnabled,
    initialData: [],
  });

  return { data, isLoading, isError };
};

export const useGetAllTenants = (enabled = false) => {
  const queryClient = useQueryClient();
  const currentData = queryClient.getQueryData(["inquilinos"]) as [];

  const fetchEnabled = enabled || !currentData;

  const { data, isLoading, isError, isFetching } = useQuery(["inquilinos"], {
    queryFn: getAllTenants,
    enabled: fetchEnabled,
    initialData: [],
  });

  return { data, isLoading, isError, isFetching };
};

type useGetAllPaymentsParams = {
  referenceYear?: string;
  referenceMonth?: number;
  enabled?: boolean;
  tenantId?: number;
  propertyId?: number;
  beneficiaryId?: number;
};

export const useGetAllPayments = (params: useGetAllPaymentsParams) => {
  const queryClient = useQueryClient();
  const currentData = queryClient.getQueryData(["pagamentos"]) as [];
  const fetchEnabled = params.enabled || !currentData;

  const { data, isError, isFetching, isFetchingNextPage, refetch, fetchNextPage, isLoading } = useInfiniteQuery(
    ["pagamentos"],
    async ({ pageParam = 0 }) =>
      getAllPayments({
        pageParam,
        referenceYear: params.referenceYear,
        referenceMonth: params.referenceMonth,
        tenantId: params.tenantId,
        propertyId: params.propertyId,
        beneficiaryId: params.beneficiaryId,
      }),
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
    isLoading,
  };
};

export const useGenerateFromReceipt = (base64File: string) => {
  const { data, isLoading, isError, error } = useQuery(["generated-payment"], {
    queryFn: () => generateDataFromReceipt(base64File),
    enabled: !!base64File,
    initialData: null,
    retry: false,
  });

  return { data, isLoading, isError, error };
};

export const useEditRoomValue = () => {
  const queryClient = useQueryClient();

  return useMutation(editRoomValue, {
    onError: (error: Error) => {
      console.log(error);
    },
    onSuccess: (data, args, context) => {
      const currentData = queryClient.getQueryData(["quartos"]) as Room[];

      queryClient.setQueryData(
        ["quartos"],
        currentData.map((quarto) => (quarto.Id === args.roomId ? { ...quarto, Valor: args.newValue } : quarto))
      );
    },
  });
};

export const useAddEditTenant = () => {
  const queryClient = useQueryClient();

  return useMutation(addEditTenant, {
    onError: (error: Error) => {
      console.log(error);
    },
    onSuccess: (data, args, context) => {
      const currentData = queryClient.getQueryData(["inquilinos"]) as Tenant[];

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

export const useAddEditPayment = () => {
  const queryClient = useQueryClient();

  return useMutation(addEditPayment, {
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
            pages: pages.map((page: Payment[]) => page.map((payment) => (payment.Id === args.id ? { ...payment, ...data } : payment))),
          };
        }

        // If adding a new payment
        else {
          const [firstPage, ...rest] = pages;

          // Filter out any pagamento with null Id and matching InquilinoId from the first page
          const filteredFirstPage = firstPage.filter((payment: Payment) => !(payment.Id === null && payment.InquilinoId === args.tenantId));

          return {
            ...oldQueryData,
            pages: [[data, ...filteredFirstPage], ...rest],
          };
        }
      });
    },
  });
};

export const useDeleteTenant = () => {
  const queryClient = useQueryClient();

  return useMutation(deleteTenant, {
    onError: (error: Error) => {
      console.log(error);
    },
    onSuccess: (data, args, context) => {
      const currentData = queryClient.getQueryData(["inquilinos"]) as Tenant[];

      queryClient.setQueryData(
        ["inquilinos"],
        currentData.filter((tenant) => tenant.Id !== args)
      );
    },
  });
};

export const useDeletePayment = () => {
  const queryClient = useQueryClient();

  return useMutation(deletePayment, {
    onError: (error: Error) => {
      console.log(error);
    },
    onSuccess: (data, args, context) => {
      queryClient.setQueryData(["pagamentos"], (oldQueryData: any) => {
        // Ensuring oldQueryData is treated as the paginated structure it is
        const pages = oldQueryData?.pages ?? [];

        return {
          ...oldQueryData,
          pages: pages.map((page: Payment[]) => page.filter((payment) => payment.Id !== args)),
        };
      });
    },
  });
};

export const useAddEditReceipt = () => {
  const queryClient = useQueryClient();

  return useMutation(addEditReceipt, {
    onError: (error: Error) => {
      console.log(error);
    },
    onSuccess: (data, args, context) => {
      queryClient.setQueryData(["pagamentos"], (oldQueryData: any) => {
        // Ensuring oldQueryData is treated as the paginated structure it is
        const pages = oldQueryData?.pages ?? [];

        return {
          ...oldQueryData,
          pages: pages.map((page: Payment[]) => page.map((payment) => (payment.Id === args.payment.Id ? { ...payment, ComprovanteUrl: data?.url } : payment))),
        };
      });
    },
  });
};

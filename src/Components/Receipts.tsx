import { Payment } from "@/types/Payment";
import React, { ChangeEvent, FC, FormEvent, SetStateAction, useEffect, useState } from "react";
import HostModal from "./Shared/HostModal";
import { DeleteConfirm } from "./Shared/DeleteConfirm";
import { getJpegFromPdf } from "@/EasySuitesApi/EasySuitesApi";
import { ConfirmCancelButtons } from "./Shared/ConfirmCancelButtons";
import AnoSelect from "./Shared/YearSelect";
import MesSelect, { MonthSelect } from "./Shared/MonthSelect";
import { useQueryClient } from "react-query";
import { ratio } from "fuzzball";
import { Tenant } from "@/types/Tenant";
import { parseDateString } from "@/app/utils";
import SelectYear from "./Shared/YearSelect";
import { useAddEditPayment, useAddEditReceipt, useGenerateFromReceipt, useGetAllTenants } from "@/EasySuitesApi/EasySuitesQueries";

type ReceiptFormProps = {
  onCancel: () => void;
  payment: Payment;
};

export const ReceiptForm: FC<ReceiptFormProps> = ({ onCancel, payment }) => {
  const { mutateAsync: adicionarAtualizarComprovante, isError, isLoading, error } = useAddEditReceipt();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [newReceiptFile, setNewReceiptFile] = useState("");

  useEffect(() => {
    if (newReceiptFile?.substring(5, newReceiptFile.indexOf(";")) === "application/pdf") {
      getJpegFromPdf(newReceiptFile)
        .then((res) => {
          setNewReceiptFile(res.jpegBase64);
        })
        .catch((err) => console.log(err));
    }
  }, [newReceiptFile]);

  const onUpdate = async () => {
    !!newReceiptFile && (await adicionarAtualizarComprovante({ payment, imageBase64: newReceiptFile }));
    !isError && onCancel();
  };

  const onDelete = async () => {
    await adicionarAtualizarComprovante({ payment, imageBase64: null });
    !isError && onCancel();
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64 = reader.result as string;

        setNewReceiptFile(base64);
      };
      reader.onerror = (error) => {
        console.error("Error: ", error);
      };
    }
  };

  return (
    <div className="flex flex-col justify-center items-center" style={{ maxHeight: "600px", maxWidth: "1000px" }}>
      <div className="flex flex-col justify-between items-center gap-5 overflow-y-auto">
        <img className="w-1/2 h-1/2" src={newReceiptFile || payment?.ComprovanteUrl} alt="No image" />
        {!payment?.ComprovanteUrl && <p>Não existe imagem de recibo associado a esse payment.</p>}

        <div className="flex flex-col bg-gray-200 p-2 ">
          <label htmlFor="receipt" className="text-gray-700 font-bold mb-1">
            Atualizar Comprovante
          </label>
          <input type="file" id="receipt" accept="image/png, image/jpeg, application/pdf" onChange={handleFileChange} />
        </div>
        <div className="flex justify-around gap-3 w-full">
          <button onClick={onCancel} className="bg-gray-500 hover:bg-gray-700 text-white font-bold text-lg py-2 px-8 rounded mb-5">
            Fechar
          </button>
          <button
            onClick={() => setDeleteModalOpen(true)}
            className="bg-red-500 hover:bg-red-700 text-white font-bold text-lg py-2 px-8 rounded mb-5"
            disabled={!payment?.ComprovanteUrl}
          >
            Deletar
          </button>
          <button onClick={onUpdate} className="bg-blue-500 hover:bg-blue-700 text-white font-bold text-lg py-2 px-8 rounded mb-5" disabled={!newReceiptFile}>
            {!!payment?.ComprovanteUrl ? "Editar" : "Adicionar"}
          </button>
        </div>
      </div>

      {isError && !isLoading && <p className="py-5 text-red-500">{error.message}</p>}
      <HostModal isOpen={deleteModalOpen} onRequestClose={() => setDeleteModalOpen(false)}>
        <DeleteConfirm
          onConfirm={onDelete}
          message="Tem certeza que quer excluir o comprovante desse pagamento?"
          onCancel={() => setDeleteModalOpen(false)}
          isError={isError}
          isLoading={isLoading}
          error={error}
        />
      </HostModal>
    </div>
  );
};

type GenerateFromReceiptFormProps = {
  setOpen: React.Dispatch<SetStateAction<boolean>>;
};

export const GenerateFromReceiptForm: FC<GenerateFromReceiptFormProps> = ({ setOpen }) => {
  const [base64File, setBase64File] = useState(null);
  const [showGeneratedResultModal, setShowGeneratedResultModal] = useState(false);

  useEffect(() => {
    if (base64File?.substring(5, base64File.indexOf(";")) === "application/pdf") {
      getJpegFromPdf(base64File)
        .then((res) => {
          setBase64File(res.jpegBase64);
        })
        .catch((err) => console.log(err));
    }
  }, [base64File]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64 = reader.result as string;

        setBase64File(base64);
      };
      reader.onerror = (error) => {
        console.error("Error: ", error);
      };
    }
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setShowGeneratedResultModal(true);
  };

  return (
    <>
      <form onSubmit={onSubmit} className="flex flex-col gap-3" style={{ maxHeight: "600px", maxWidth: "1000px" }}>
        <img className="w-1/2 h-1/2" src={base64File} alt="No image" />

        <div className="flex flex-col bg-gray-200 p-2">
          <label htmlFor="generate-from-receipt" className="text-gray-700 font-bold mb-1">
            Escolher Comprovante
          </label>
          <input required type="file" id="generate-from-receipt" accept="image/png, image/jpeg, application/pdf" onChange={handleFileChange} />
        </div>
        <ConfirmCancelButtons onCancel={() => setOpen(false)} />
      </form>

      <HostModal
        onRequestClose={() => {
          setShowGeneratedResultModal(false);
          setOpen(false);
        }}
        isOpen={showGeneratedResultModal}
      >
        <GenerateResult setOpen={setShowGeneratedResultModal} base64Image={base64File} setParentModalOpen={setOpen} />
      </HostModal>
    </>
  );
};

type GenerateResultProps = {
  base64Image: string;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  setParentModalOpen: React.Dispatch<SetStateAction<boolean>>;
};

export const GenerateResult: FC<GenerateResultProps> = ({ base64Image, setOpen, setParentModalOpen }) => {
  const { data, isLoading, isError, error } = useGenerateFromReceipt(base64Image);
  //FOR TESTING WITHOUT SPENDING OPEN AI CREDITS
  // {
  //   data: { dataPagamento: "12/03/2024", valorPago: 2000.55, nomePagador: "mock name here" },
  //   isLoading: false,
  //   isError: false,
  //   error: { message: "test error" },
  // };
  const {
    mutateAsync: adicionarPagamento,
    isLoading: isAdcionarPagametoLoading,
    isError: isAdcionarPagametoError,
    error: adicionarPagamentoError,
  } = useAddEditPayment();
  const {
    mutateAsync: adicionarComprovante,
    isLoading: isAdcionarComprovanteLoading,
    isError: isAdcionarComprovanteError,
    error: adicionarComprovanteError,
  } = useAddEditReceipt();
  const queryClient = useQueryClient();
  const { data: tenants } = useGetAllTenants();
  const [referenceYear, setReferenceYear] = useState(null);
  const [referenceMonth, setReferenceMonth] = useState(null);
  const [tenantDb, setTenantDb] = useState<Tenant>(null);
  const [tenantError, setTenantError] = useState(false);

  useEffect(() => {
    if (!!data && !!tenants) {
      const tempTenant = tenants.find((tenant) => {
        const score = ratio(tenant.Nome, data?.nomePagador); // fuzzball ratio for fuzzing matching the name string as it can be different from the receipt and the db
        return score > 59;
      });

      if (!tempTenant) {
        setTenantError(true);
        setTenantDb(null);
      } else {
        setTenantError(false);
        setTenantDb(tempTenant);
      }
    }
  }, [tenants, data]);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const result = await adicionarPagamento({
      tenantId: tenantDb.Id,
      value: data.valorPago,
      paymentDate: parseDateString(data.dataPagamento),
      referenceMonth,
      referenceYear,
    });

    if (!isAdcionarPagametoError) {
      await adicionarComprovante({ imageBase64: base64Image, payment: result });
      if (!isAdcionarComprovanteError) {
        setParentModalOpen(false);
        onClose();
      }
    }
  };

  const onClose = () => {
    setOpen(false);
    queryClient.setQueryData(["generated-payment"], null);
  };

  if (isLoading || (!data && !isError)) {
    return <div>Esperando resposta do gpt...</div>;
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3 p-3" style={{ maxHeight: "600px", maxWidth: "1000px" }}>
      <div className="flex flex-col">
        <label className="text-gray-700 font-bold mb-1">Nome</label>
        <p>{tenantDb?.Nome || `${data?.nomePagador} (nome no comprovante)`}</p>
        {tenantError && <p className="text-red-400">Inquilino não registrado ou com nome registrado muito diferente do comprovante</p>}
      </div>
      <div className="flex flex-col">
        <label className="text-gray-700 font-bold mb-1">Valor</label>
        <p>{data?.valorPago}</p>
      </div>
      <div className="flex flex-col">
        <label className="text-gray-700 font-bold mb-1">Data do Pagamento</label>
        <p>{data?.dataPagamento}</p>
      </div>
      <div className="flex gap-5">
        <SelectYear year={referenceYear} onChange={(e) => setReferenceYear(e.target.value)} required={true} />
        <MonthSelect month={referenceMonth} setMonth={setReferenceMonth} required={true} />
      </div>
      <ConfirmCancelButtons onCancel={onClose} confirmDisabled={tenantError} />
      {isError && <p className="text-red-400">Ocorreu um erro no gpt: {(error as Error).message}</p>}
      {isAdcionarPagametoError && <p className="text-red-400">Ocorreu um erro ao tentar adicionar o pagamento: {(adicionarPagamentoError as Error).message}</p>}
      {isAdcionarComprovanteError && (
        <p className="text-red-400">Ocorreu um erro ao tentar adicionar o comprovante: {(adicionarComprovanteError as Error).message}</p>
      )}
    </form>
  );
};

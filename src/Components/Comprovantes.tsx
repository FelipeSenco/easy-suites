import { useAdicionarEditarComprovante } from "@/EasySuitesApi/EasySuitesQueries";
import { Pagamento } from "@/types/Pagamento";
import React, { ChangeEvent, FC, useEffect, useState } from "react";
import HostModal from "./Shared/HostModal";
import { ExcluirConfirma } from "./Shared/ExcluirConfirma";
import { getComprovantePdf } from "@/EasySuitesApi/EasySuitesApi";

type ComprovanteFormProps = {
  onCancel: () => void;
  pagamento: Pagamento;
};

export const ComprovanteForm: FC<ComprovanteFormProps> = ({ onCancel, pagamento }) => {
  const { mutateAsync: adicionarAtualizarComprovante, isError, isLoading, error } = useAdicionarEditarComprovante();

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [newReceiptFile, setNewReceiptFile] = useState("");
  const [pdfFile, setPdfFile] = useState(null);

  useEffect(() => {
    const isPdf = pagamento?.ComprovanteUrl?.endsWith(".pdf");
    if (isPdf && !newReceiptFile) {
      getComprovantePdf({ inquilinoId: pagamento.InquilinoId, pagamentoId: pagamento.Id })
        .then((data) => {
          // Convert the raw PDF data into a Blob
          const blob = new Blob([new Uint8Array(data)], { type: "application/pdf" });
          // Create an object URL for the Blob
          const pdfUrl = URL.createObjectURL(blob);
          setPdfFile(pdfUrl);
        })
        .catch((e) => console.log(e));
    } else {
      setPdfFile(null);
    }
  }, [pagamento, newReceiptFile]);

  const onUpdate = async () => {
    !!newReceiptFile && (await adicionarAtualizarComprovante({ pagamento: pagamento, imageBase64: newReceiptFile }));
    !isError && onCancel();
  };

  const onDelete = async () => {
    await adicionarAtualizarComprovante({ pagamento: pagamento, imageBase64: null });
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

  // console.log(pdfFile);

  return (
    <div className="flex flex-col justify-center items-center" style={{ maxHeight: "600px", maxWidth: "1000px" }}>
      <div className="flex flex-col justify-between items-center gap-5 overflow-y-auto">
        {newReceiptFile?.substring(5, newReceiptFile.indexOf(";")) === "application/pdf" || !!pdfFile ? (
          <iframe src={newReceiptFile?.length > 0 ? newReceiptFile : pdfFile} height={"600px"} width={"100%"}></iframe>
        ) : (
          <img className="w-1/2 h-1/2" src={newReceiptFile?.length > 0 ? `${newReceiptFile}` : pagamento?.ComprovanteUrl} alt="No image" />
        )}
        {!pagamento?.ComprovanteUrl && <p>Não existe imagem de recibo associado a esse pagamento.</p>}

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
            disabled={!pagamento?.ComprovanteUrl}
          >
            Deletar
          </button>
          <button onClick={onUpdate} className="bg-blue-500 hover:bg-blue-700 text-white font-bold text-lg py-2 px-8 rounded mb-5" disabled={!newReceiptFile}>
            {!!pagamento?.ComprovanteUrl ? "Editar" : "Adicionar"}
          </button>
        </div>
      </div>

      {isError && !isLoading && <p className="py-5 text-red-500">{error.message}</p>}
      <HostModal isOpen={deleteModalOpen} onRequestClose={() => setDeleteModalOpen(false)}>
        <ExcluirConfirma
          onConfirm={onDelete}
          mensagem="Tem certeza que quer excluir o comprovante desse pagamento?"
          onCancel={() => setDeleteModalOpen(false)}
          isError={isError}
          isLoading={isLoading}
          error={error}
        />
      </HostModal>
    </div>
  );
};

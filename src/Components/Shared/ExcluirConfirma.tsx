import { FC, FormEvent } from "react";
import { ButtonCancelarConfirmar } from "./ButtonCancelarConfirmar";

type ExcluirConfirmaProps = {
  onConfirm: () => Promise<unknown>;
  mensagem: string;
  onCancel: () => void;
  isError: boolean;
  isLoading: boolean;
  error: Error;
};

export const ExcluirConfirma: FC<ExcluirConfirmaProps> = ({ onConfirm, onCancel, mensagem, isError, isLoading, error }) => {
  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await onConfirm();
    if (!isError) {
      onCancel();
    }
  };
  return (
    <form onSubmit={onSubmit} className="flex flex-col justify-center items-center gap-4 py-2 px-14">
      <div className="flex flex-col">
        <p className="text-lg font-bold">{mensagem}</p>
      </div>
      <ButtonCancelarConfirmar onCancel={onCancel} />
      {isError && !isLoading && <p className="py-5 text-red-500">{error.message}</p>}
    </form>
  );
};

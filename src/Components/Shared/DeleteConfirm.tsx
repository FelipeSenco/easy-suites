import { FC, FormEvent } from "react";
import { ConfirmCancelButtons } from "./ConfirmCancelButtons";

type DeleteConfirmProps = {
  onConfirm: () => Promise<unknown>;
  message: string;
  onCancel: () => void;
  isError: boolean;
  isLoading: boolean;
  error: Error;
};

export const DeleteConfirm: FC<DeleteConfirmProps> = ({ onConfirm, onCancel, message, isError, isLoading, error }) => {
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
        <p className="text-lg font-bold">{message}</p>
      </div>
      <ConfirmCancelButtons onCancel={onCancel} />
      {isError && !isLoading && <p className="py-5 text-red-500">{error.message}</p>}
    </form>
  );
};

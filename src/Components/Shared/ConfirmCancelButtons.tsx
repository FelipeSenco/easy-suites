import { FC } from "react";

type ConfirmCancelButtonsProps = {
  onCancel: () => void;
  confirmDisabled?: boolean;
};

export const ConfirmCancelButtons: FC<ConfirmCancelButtonsProps> = ({ onCancel, confirmDisabled = false }) => {
  return (
    <div className="flex w-full justify-center items-center gap-10">
      <button onClick={onCancel} className="bg-red-500 hover:bg-red-700 text-white font-bold text-lg py-2 px-4 rounded " disabled={false}>
        Cancelar
      </button>
      <button type="submit" disabled={confirmDisabled} className="bg-blue-500 hover:bg-blue-700 text-white font-bold text-lg py-2 px-4 rounded">
        Confirmar
      </button>
    </div>
  );
};

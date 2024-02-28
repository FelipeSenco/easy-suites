import { Meses } from "@/app/utils";
import React, { SetStateAction } from "react";

type MonthSelectProps = {
  setMes: React.Dispatch<SetStateAction<number>>;
  mes: number;
};

export const MesSelect: React.FC<MonthSelectProps> = ({ mes, setMes }) => {
  return (
    <div className="flex flex-col">
      <label htmlFor="mes-select" className="text-gray-700 font-bold mb-1">
        Mês Referente
      </label>
      <select required onChange={(e) => setMes(parseInt(e.target.value, 10))} value={mes || ""} className="border rounded p-2 w-full focus:border-blue-500">
        <option value="">------</option>
        {Object.entries(Meses).map(([monthName, monthNumber]) => (
          <option key={monthName} value={monthNumber}>
            {monthName}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MesSelect;

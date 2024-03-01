import { Months } from "@/app/utils";
import React, { SetStateAction } from "react";

type MonthSelectProps = {
  setMonth: React.Dispatch<SetStateAction<number>>;
  month: number;
  required?: boolean;
};

export const MonthSelect: React.FC<MonthSelectProps> = ({ month, setMonth, required = false }) => {
  return (
    <div className="flex flex-col">
      <label htmlFor="month-select" className="text-gray-700 font-bold mb-1">
        Mês Referente
      </label>
      <select
        id="month-select"
        name="month-select"
        required={required}
        onChange={(e) => setMonth(parseInt(e.target.value, 10))}
        value={month || ""}
        className="border rounded p-2 w-full focus:border-blue-500"
      >
        <option value="">------</option>
        {Object.entries(Months).map(([monthName, monthNumber]) => (
          <option key={monthName} value={monthNumber}>
            {monthName}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MonthSelect;

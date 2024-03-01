import { useGetAllProperties } from "@/EasySuitesApi/EasySuitesQueries";
import React, { FC } from "react";

type PropertySelectProps = {
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  propertyId: number;
  required?: boolean;
};

export const PropertySelect: FC<PropertySelectProps> = ({ propertyId, onChange, required = true }) => {
  const { data: properties } = useGetAllProperties();

  return (
    <div className="flex flex-col">
      <label htmlFor="property-select" className="text-gray-700 font-bold mb-1">
        Propriedade
      </label>
      <select
        id="property-select"
        name="property-select"
        className="border rounded p-2 w-full focus:border-blue-500"
        value={propertyId ?? ""}
        onChange={onChange}
        required={required}
      >
        <option value="">-------</option>
        {properties &&
          properties.map((p) => (
            <option key={p.Id} value={p.Id}>
              {p.Nome}
            </option>
          ))}
      </select>
    </div>
  );
};

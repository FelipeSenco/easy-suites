import { useGetAllTenants } from "@/EasySuitesApi/EasySuitesQueries";
import React, { FC, SetStateAction, useEffect } from "react";

type TenantSelectProps = {
  setTenantId: React.Dispatch<SetStateAction<number>>;
  tenantId: number;
  required?: boolean;
  propertyId?: number;
};

export const TenantSelect: FC<TenantSelectProps> = ({ tenantId, setTenantId, propertyId, required = true }) => {
  const { data: tenants } = useGetAllTenants();

  return (
    <div className="flex flex-col">
      <label htmlFor="tenant-select" className="text-gray-700 font-bold mb-1">
        Inquilino
      </label>
      <select
        id="tenant-select"
        name="tenant-select"
        className="border rounded p-2 w-full focus:border-blue-500"
        value={tenantId ?? ""}
        onChange={(e) => setTenantId(e.target.value ? Number(e.target.value) : null)}
        required={required}
      >
        <option value="">-------</option>
        {tenants &&
          tenants
            .filter((t) => t.PropriedadeId === propertyId || !propertyId)
            .sort((a, b) => a.Nome.localeCompare(b.Nome))
            .map((t) => (
              <option key={t.Id} value={t.Id}>
                {t.Nome}
              </option>
            ))}
      </select>
    </div>
  );
};

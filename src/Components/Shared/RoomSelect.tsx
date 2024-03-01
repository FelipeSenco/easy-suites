import { useGetAllRooms } from "@/EasySuitesApi/EasySuitesQueries";
import React, { FC, SetStateAction } from "react";

type RoomSelectProps = {
  setRoomId: React.Dispatch<SetStateAction<number>>;
  roomId: number;
  propertyId: number;
  required?: boolean;
};

export const RoomSelect: FC<RoomSelectProps> = ({ roomId, setRoomId, propertyId, required = true }) => {
  const { data: rooms } = useGetAllRooms();

  return (
    <div className="flex flex-col">
      <label htmlFor="property-select" className="text-gray-700 font-bold mb-1">
        Quarto
      </label>
      <select
        id="property-select"
        name="property-select"
        className="border rounded p-2 w-full focus:border-blue-500"
        value={roomId ?? ""}
        onChange={(e) => setRoomId(e.target.value ? Number(e.target.value) : null)}
        required={required}
      >
        <option value="" disabled>
          Selecione um quarto
        </option>
        {rooms &&
          propertyId &&
          rooms
            .filter((r) => r.PropriedadeId === propertyId)
            .map((r) => (
              <option key={r.Id} value={r.Id}>
                {r.NumeroQuarto}
              </option>
            ))}
      </select>
    </div>
  );
};

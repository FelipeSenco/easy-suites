"use client";
import { Room } from "@/types/Room";
import { FC, FormEvent, useState } from "react";
import HostModal from "./Shared/HostModal";
import { ConfirmCancelButtons } from "./Shared/ConfirmCancelButtons";
import { useEditRoomValue } from "@/EasySuitesApi/EasySuitesQueries";

type RoomsProps = {
  rooms: Room[];
};

export const Rooms: FC<RoomsProps> = ({ rooms }) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingRoom, setEditingRoom] = useState({} as Room);

  const onCardClick = (quarto: Room) => {
    setEditingRoom(quarto);
    setIsEditOpen(true);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-start">
        {rooms.map((r) => (
          <RoomCard key={r.Id} room={r} onCardClick={onCardClick} />
        ))}
        <HostModal isOpen={isEditOpen} onRequestClose={() => setIsEditOpen(false)}>
          <EditRoom room={editingRoom} onCancel={() => setIsEditOpen(false)} />
        </HostModal>
      </div>
    </div>
  );
};

type RoomCardProps = {
  room: Room;
  onCardClick: (room: Room) => void;
};

export const RoomCard: FC<RoomCardProps> = ({ room, onCardClick }) => {
  return (
    <div
      onClick={() => onCardClick(room)}
      className={`max-w-md mx-auto bg-white cursor-pointer rounded-xl shadow-md overflow-hidden md:max-w-2xl propriedade-${room.PropriedadeId}`}
    >
      <div className="p-4">
        <div className="font-bold text-lg mb-2">{`Quarto ${room.NumeroQuarto} (${room.PropriedadeNome})`}</div>
        <div className="text-gray-700 text-base">
          {room.InquilinoId && (
            <div>
              <span className="font-bold">Inquilino:</span> {room.InquilinoNome}
            </div>
          )}
          {!room.InquilinoId && <div className="text-red-500">Vago</div>}
          <div>
            <span className="font-bold">Valor:</span> {room.Valor}
          </div>
        </div>
      </div>
    </div>
  );
};

type EditRoomProps = {
  room: Room;
  onCancel: () => void;
};

export const EditRoom: FC<EditRoomProps> = ({ room, onCancel }) => {
  const [value, setValue] = useState(room.Valor || 0);
  const { mutateAsync: editRoomValue, isLoading, isError, error } = useEditRoomValue();
  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await editRoomValue({ newValue: value, roomId: room.Id });
    if (!isError) {
      onCancel();
    }
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col justify-center items-center gap-4 py-2 px-14">
      <div className="text-gray-700 font-bold mb-1 text-lg">
        {room.PropriedadeNome} - Quarto: {room.NumeroQuarto}
      </div>
      <div className="flex flex-col">
        <label htmlFor="amount" className="text-gray-700  font-bold mb-1">
          Valor
        </label>
        <input
          type="number"
          id="room-value-input"
          name="room-value"
          required
          min={0.01}
          max={100000}
          step={0.01}
          className="border rounded p-2 w-full focus:border-blue-500"
          placeholder="Quantia"
          value={value}
          onChange={(e) => setValue(parseFloat(e.target.value))}
        />
      </div>
      <ConfirmCancelButtons onCancel={onCancel} />
      {isError && !isLoading && <p className="py-5 text-red-500">{error.message}</p>}
    </form>
  );
};

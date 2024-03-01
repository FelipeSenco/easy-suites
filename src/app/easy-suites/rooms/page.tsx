"use client";
import { Rooms } from "@/Components/Rooms";
import { useGetAllRooms } from "@/EasySuitesApi/EasySuitesQueries";
import { Room } from "@/types/Room";
import { FC } from "react";

const RoomsPage: FC = () => {
  const { data, isLoading, isError } = useGetAllRooms();

  if (isLoading) return null;
  if (isError || data?.length == 0) return null;
  return <Rooms rooms={data as Room[]} />;
};

export default RoomsPage;

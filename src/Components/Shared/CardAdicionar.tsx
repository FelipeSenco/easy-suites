import React, { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

type CardAdicionarProps = {
  onCardClick: () => void;
};

export const CardAdicionar: FC<CardAdicionarProps> = ({ onCardClick }) => {
  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl cursor-pointer" onClick={onCardClick}>
      <div className="flex justify-center items-center text-white h-48 w-48 bg-green-400">
        <FontAwesomeIcon icon={faPlus} className="text-4xl" />
      </div>
    </div>
  );
};

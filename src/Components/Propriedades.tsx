import { FC } from "react";

type PropriedadesProps = {
  propriedades: any;
};

const Propriedades: FC<PropriedadesProps> = ({ propriedades }) => {
  console.log(propriedades);
  return <div className="flex flex-col items-center">Propriedades</div>;
};

export default Propriedades;

import { Propriedade } from "@/types/Propriedade";
import { FC } from "react";

type PropriedadesProps = {
  propriedades: Propriedade[];
};

const Propriedades: FC<PropriedadesProps> = ({ propriedades }) => {
  return (
    <div className="flex flex-col items-center">
      <div>
        <table className="border-collapse w-full mt-10">
          <thead>
            <tr>
              <th className="border p-2">Nome</th>
              <th className="border p-2">Endereco</th>
              <th className="border p-2">Quartos</th>
              <th className="border p-2">Inquilinos</th>
              <th className="border p-2">Vagas</th>
            </tr>
          </thead>
          <tbody>
            {propriedades.map((p) => (
              <tr key={p.Id}>
                <td className="border p-2">{p.Nome}</td>
                <td className="border p-2">{`${p.Rua}, ${p.Numero}, ${p.cep}, ${p.Cidade}, ${p.Uf}`}</td>
                <td className="border p-2">{p.numeroQuartos}</td>
                <td className="border p-2">{p.numeroInquilinos}</td>
                <td className="border p-2">{p.numeroQuartos - p.numeroInquilinos}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Propriedades;

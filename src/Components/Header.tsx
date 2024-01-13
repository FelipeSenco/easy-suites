import Link from "next/link";
import { FC } from "react";

export const Header: FC = () => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <ul className="flex space-x-4">
        <li>
          <Link href="/propriedades" className="hover:text-gray-300">
            Propriedades
          </Link>
        </li>
        <li>
          <Link href="/propriedades" className="hover:text-gray-300">
            Beneficiários
          </Link>
        </li>
        <li>
          <Link href="/propriedades" className="hover:text-gray-300">
            Inquilinos
          </Link>
        </li>
        <li>
          <Link href="/propriedades" className="hover:text-gray-300">
            Quartos
          </Link>
        </li>
        <li>
          <Link href="/propriedades" className="hover:text-gray-300">
            Pagamentos
          </Link>
        </li>
      </ul>
    </nav>
  );
};

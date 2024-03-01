import { Property } from "@/types/Property";
import { FC } from "react";

type PropertiesProps = {
  properties: Property[];
};

const Properties: FC<PropertiesProps> = ({ properties }) => {
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {properties.map((p) => (
          <PropertyCard key={p.Id} property={p} />
        ))}
      </div>
    </div>
  );
};

type PropertyCardProps = {
  property: Property;
};

const PropertyCard: FC<PropertyCardProps> = ({ property }) => {
  return (
    <div className={`bg-white rounded-xl shadow-md overflow-hidden propriedade-${property.Id}`}>
      <div className="p-4">
        <div className="font-bold text-lg mb-2">{property.Nome}</div>
        <div className="text-gray-700 text-base">
          <div>
            <span className="font-bold">Endereço:</span> {`${property.Rua}, ${property.Numero}, ${property.cep}, ${property.Cidade}, ${property.Uf}`}
          </div>
          <div>
            <span className="font-bold">Quartos:</span> {property.numeroQuartos}
          </div>
          <div>
            <span className="font-bold">Inquilinos:</span> {property.numeroInquilinos}
          </div>
          <div>
            <span className="font-bold">Vagas Disponíveis:</span> {property.numeroQuartos - property.numeroInquilinos}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Properties;

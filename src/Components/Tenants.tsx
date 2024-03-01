"use client";
import { Tenant } from "@/types/Tenant";
import { FC, FormEvent, useState } from "react";
import { ConfirmCancelButtons } from "./Shared/ConfirmCancelButtons";
import HostModal from "./Shared/HostModal";
import { CardAdicionar } from "./Shared/AddCard";
import { RoomSelect } from "./Shared/RoomSelect";
import { PropertySelect } from "./Shared/PropertySelect";
import { BeneficiarySelect } from "./Shared/BeneficiarySelect";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { DeleteConfirm } from "./Shared/DeleteConfirm";
import { useAddEditTenant, useDeleteTenant } from "@/EasySuitesApi/EasySuitesQueries";

type TenantsProps = {
  tenants: Tenant[];
};

export const Tenants: FC<TenantsProps> = ({ tenants }) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [tenantEdit, setTenantEdit] = useState<Tenant>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [tenantDelete, setTenantDelete] = useState<Tenant>(null);
  const { mutateAsync: deleteTenant, isError: isDeleteError, isLoading: isDeleteLoading, error } = useDeleteTenant();

  const onCardClick = (tenant?: Tenant) => {
    setIsEditOpen(true);
    setTenantEdit(tenant);
  };
  const onDeleteClick = (tenant: Tenant) => {
    setTenantDelete(tenant);
    setDeleteModalOpen(true);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-start">
        <CardAdicionar onCardClick={() => onCardClick(undefined)} />
        {tenants.map((t) => (
          <TenantCard key={t.Id} tenant={t} onCardClick={onCardClick} onDeleteClick={onDeleteClick} />
        ))}
      </div>
      <HostModal isOpen={isEditOpen} onRequestClose={() => setIsEditOpen(false)}>
        <TenantForm tenant={tenantEdit} onCancel={() => setIsEditOpen(false)} />
      </HostModal>
      <HostModal isOpen={deleteModalOpen} onRequestClose={() => setDeleteModalOpen(false)}>
        <DeleteConfirm
          onCancel={() => setDeleteModalOpen(false)}
          onConfirm={() => deleteTenant(tenantDelete.Id)}
          message={`Tem certeza que quer excluir '${tenantDelete?.Nome}'?`}
          isError={isDeleteError}
          isLoading={isDeleteLoading}
          error={error}
        />
      </HostModal>
    </div>
  );
};

type TenantCardProps = {
  tenant: Tenant;
  onCardClick: (tenant: Tenant) => void;
  onDeleteClick: (tenant: Tenant) => void;
};

export const TenantCard: FC<TenantCardProps> = ({ tenant, onCardClick, onDeleteClick }) => {
  return (
    <div
      onClick={() => onCardClick(tenant)}
      className={`max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl cursor-pointer propriedade-${tenant.PropriedadeId}`}
    >
      <div className="p-4">
        <div className="font-bold text-lg mb-2">{tenant.Nome}</div>
        <div className="text-gray-700 text-base">
          <div>
            <span className="font-bold">Cpf:</span> {tenant.Cpf}
          </div>
          <div>
            <span className="font-bold">Propriedade:</span> {tenant.PropriedadeNome}
          </div>
          <div>
            <span className="font-bold">Quarto Número:</span> {tenant.NumeroQuarto}
          </div>

          <div>
            <span className="font-bold">Dia de Vencimento:</span> {tenant.DiaVencimento || "Não definido"}
          </div>
          <div>
            <span className="font-bold">Telefone:</span> {tenant.Telefone || "---------"}
          </div>
          {!!tenant.BeneficiarioNome && (
            <div>
              <span className="font-bold">Beneficiário:</span> {tenant.BeneficiarioNome}
            </div>
          )}
          <div className=" flex justify-end items-center p-1">
            <FontAwesomeIcon
              icon={faTrash}
              className="text-xl hover:bg-red-500 p-1"
              onClick={(e) => {
                e.stopPropagation();
                onDeleteClick(tenant);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

type TenantFormProps = {
  tenant?: Tenant;
  onCancel: () => void;
};

const TenantForm: FC<TenantFormProps> = ({ tenant, onCancel }) => {
  const { mutateAsync: addEditTenant, isLoading, isError, error } = useAddEditTenant();

  const [roomId, setRoomId] = useState(tenant?.QuartoId);
  const [propertyId, setPropertyId] = useState<number>(tenant?.PropriedadeId);
  const [name, setName] = useState(tenant?.Nome);
  const [beneficiaryId, setBeneficiaryId] = useState(tenant?.BeneficiarioId);
  const [rentStartDate, setRentStartDate] = useState(tenant?.InicioAluguel);
  const [rentEndDate, setRentEndDate] = useState(tenant?.FimAluguel);
  const [paymentDay, setPaymentDay] = useState(tenant?.DiaVencimento);
  const [cpf, setCpf] = useState(tenant?.Cpf);
  const [fone, setFone] = useState(tenant?.Telefone);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();

    await addEditTenant({
      id: tenant?.Id,
      roomId,
      propertyId,
      name,
      beneficiaryId,
      rentStartDate,
      rentEndDate,
      paymentDay,
      cpf,
      fone,
    });
    if (!isError) {
      onCancel();
    }
  };

  const onChangePropriedade = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPropertyId(e.target.value ? Number(e.target.value) : null);
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col justify-center items-start gap-4 py-2 px-14">
      <div className="flex flex-row gap-2">
        <PropertySelect propertyId={propertyId} onChange={onChangePropriedade} />
        {propertyId && <RoomSelect roomId={roomId} propertyId={propertyId} setRoomId={setRoomId} />}
        <BeneficiarySelect beneficiaryId={beneficiaryId} setBeneficiaryId={setBeneficiaryId} />
      </div>
      <div className="flex flex-row w-full justify-between">
        <div className="flex flex-col">
          <label htmlFor="tenant-nome" className="text-gray-700 font-bold mb-1">
            Nome
          </label>
          <input
            maxLength={100}
            minLength={3}
            type="text"
            id="tenant-nome-input"
            name="tenant-nome"
            required
            className="border rounded p-2 w-full focus:border-blue-500"
            placeholder="Nome do inquilino"
            value={name || ""}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="tenant-inicio-aluguel" className="text-gray-700 font-bold mb-1">
            Início Aluguel
          </label>
          <input
            type="date"
            id="tenant-inicio-aluguel-input"
            name="tenant-inicio-aluguel"
            required
            className="border rounded p-2 w-full focus:border-blue-500"
            value={rentStartDate ? new Date(rentStartDate).toISOString().substring(0, 10) : ""}
            onChange={(e) => setRentStartDate(new Date(e.target.value))}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="tenant-fim-aluguel" className="text-gray-700 font-bold mb-1">
            Fim Aluguel
          </label>
          <input
            type="date"
            id="tenant-fim-aluguel-input"
            name="tenant-fim-aluguel"
            className="border rounded p-2 w-full focus:border-blue-500"
            value={rentEndDate ? new Date(rentEndDate).toISOString().substring(0, 10) : ""}
            onChange={(e) => setRentEndDate(e.target.value ? new Date(e.target.value) : null)}
          />
        </div>
      </div>
      <div className="flex flex-row w-full justify-between">
        <div className="flex flex-col">
          <label htmlFor="tenant-vencimento" className="text-gray-700 font-bold mb-1">
            Vencimento
          </label>
          <input
            max={31}
            min={1}
            type="number"
            id="tenant-vencimento-input"
            name="tenant-vencimento"
            required
            className="border rounded p-2 w-full focus:border-blue-500"
            placeholder="Dia do vencimento"
            value={paymentDay | 0}
            onChange={(e) => setPaymentDay(e.target.value ? Number(e.target.value) : null)}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="tenant-cpf" className="text-gray-700 font-bold mb-1">
            Cpf
          </label>
          <input
            maxLength={15}
            minLength={14}
            type="text"
            id="tenant-cpf-input"
            name="tenant-cpf"
            required
            className="border rounded p-2 w-full focus:border-blue-500"
            placeholder="Cpf do inquilino"
            value={cpf || ""}
            onChange={(e) => setCpf(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="tenant-fone" className="text-gray-700 font-bold mb-1">
            Telefone
          </label>
          <input
            maxLength={20}
            minLength={8}
            type="text"
            id="tenant-fone-input"
            name="tenant-fone"
            required
            className="border rounded p-2 w-full focus:border-blue-500"
            placeholder="Telefone do Inquilino"
            value={fone || ""}
            onChange={(e) => setFone(e.target.value)}
          />
        </div>
      </div>
      <ConfirmCancelButtons onCancel={onCancel} />
      {isError && !isLoading && <p className="py-5 text-red-500">{error.message}</p>}
    </form>
  );
};

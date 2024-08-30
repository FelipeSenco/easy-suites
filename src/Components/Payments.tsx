"use client";
import { FC, FormEvent, useRef, useState } from "react";
import HostModal from "./Shared/HostModal";
import { Payment } from "@/types/Payment";
import { ConfirmCancelButtons } from "./Shared/ConfirmCancelButtons";
import { TenantSelect } from "./Shared/TenantSelect";
import { MonthSelect } from "./Shared/MonthSelect";
import YearSelect from "./Shared/YearSelect";
import { Months, formatDateToDDMMMYYYY } from "@/app/utils";
import { DeleteConfirm } from "./Shared/DeleteConfirm";
import { ReceiptForm, GenerateFromReceiptForm } from "./Receipts";
import IntersectionObserverContainer from "./Shared/IntersectionObserverContainer";
import { PropertySelect } from "./Shared/PropertySelect";
import { BeneficiarySelect } from "./Shared/BeneficiarySelect";
import SelectYear from "./Shared/YearSelect";
import { useAddEditPayment, useDeletePayment, useGetAllPayments } from "@/EasySuitesApi/EasySuitesQueries";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faEye } from "@fortawesome/free-solid-svg-icons";
import { faAdd } from "@fortawesome/free-solid-svg-icons/faAdd";
import { LoadingSpinner } from "./Shared/LoadingSpinner";

export const Payments: FC = () => {
  const [referenceMonth, setReferenceMonth] = useState(null);
  const [referenceYear, setReferenceYear] = useState(null);
  const [propertyId, setPropertyId] = useState(null);
  const [tenantId, setTenantId] = useState(null);
  const [beneficiaryId, setBeneficiaryId] = useState(null);
  const { pagamentos, isLoading, hasNextPage, fetchNextPage, refetch } = useGetAllPayments({
    referenceYear,
    referenceMonth,
    tenantId,
    propertyId,
    beneficiaryId,
  });
  const { mutateAsync: deletePayment, isError: isDeleteError, isLoading: isDeleteLoading, error: deleteError } = useDeletePayment();
  const [currentPayment, setCurrentPayment] = useState(null);
  const [addEditPaymentOpen, setAddEditPaymentOpen] = useState(false);
  const [deletePaymentOpen, setDeletePaymentOpen] = useState(false);
  const [paymentDelete, setPaymentDelete] = useState<Payment>(null);
  const [editReceiptOpen, setEditReceiptOpen] = useState(false);
  const [observationOpen, setObservationOpen] = useState(false);
  const [generateFromReceiptOpen, setGenerateFomReceiptOpen] = useState(false);

  const onCancel = () => {
    setAddEditPaymentOpen(false);
    setCurrentPayment(null);
  };

  const onCloseObservation = () => {
    setObservationOpen(false);
    setCurrentPayment(null);
  };

  const onChangeYear = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (!e.target.value) {
      setReferenceMonth(null);
    }
    setReferenceYear(e.target.value);
  };

  const onChangeProperty = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTenantId(null);
    setPropertyId(e.target.value ? Number(e.target.value) : null);
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <>
      <div className="flex flex-col items-end justify-between mt-5 px-4 py-2 rounded p-absolute gap-4">
        <div className="flex justify-start items-end gap-5 w-full">
          <SelectYear year={referenceYear} onChange={onChangeYear} />
          {referenceYear && <MonthSelect month={referenceMonth} setMonth={setReferenceMonth} />}
          <PropertySelect propertyId={propertyId} onChange={onChangeProperty} />
          <TenantSelect tenantId={tenantId} setTenantId={setTenantId} propertyId={propertyId} />
          <BeneficiarySelect beneficiaryId={beneficiaryId} setBeneficiaryId={setBeneficiaryId} />
          <button onClick={() => refetch()} className="bg-purple-500 hover:bg-purple-700 text-white h-1/2 font-bold text-lg py-1 px-6 rounded">
            Filtrar
          </button>
        </div>
        <div className="flex justify-start w-full gap-5">
          <button onClick={() => setAddEditPaymentOpen(true)} className="bg-green-500 hover:bg-green-700 text-white font-bold text-lg py-1 px-6 rounded">
            Adicionar
          </button>
          <button onClick={() => setGenerateFomReceiptOpen(true)} className="bg-green-500 hover:bg-green-700 text-white font-bold text-lg py-1 px-6 rounded">
            Gerar por recibo
          </button>
        </div>
      </div>

      <div className="mt-100 h-[650px] overflow-y-auto">
        <table className="border-collapse w-full mt-5">
          <thead>
            <tr className="bg-white">
              <th className="border p-2">Nome</th>
              <th className="border p-2">Imovel</th>
              <th className="border p-2">Quarto</th>
              <th className="border p-2">Valor</th>
              <th className="border p-2">Data do Pagamento</th>
              <th className="border p-2">Mes</th>
              <th className="border p-2">Ano</th>
              <th className="border p-2">Beneficiário</th>
              <th className="border p-2">Comprovante</th>
              <th className="border p-2">Observação</th>
              <th className="border p-2 w-1"></th>
              <th className="border p-2 w-1"></th>
            </tr>
          </thead>
          <tbody>
            {pagamentos.map((p, index) => (
              <tr key={index} className={p.Id ? `bg-green-200` : `bg-red-200`}>
                <td className="border border-gray-300 p-2">{p.NomeInquilino}</td>
                <td className="border border-gray-300 p-2">{p.PropriedadeNome}</td>
                <td className="border border-gray-300 p-2">{p.NumeroQuarto}</td>
                <td className="border border-gray-300 p-2">R$ {p.Valor}</td>
                <td className="border border-gray-300 p-2">{formatDateToDDMMMYYYY(p.DataPagamento)}</td>
                <td className="border border-gray-300 p-2">{Object.keys(Months).find((key) => Months[key] === p.MesReferente)}</td>
                <td className="border border-gray-300 p-2">{p.AnoReferente}</td>
                <td className="border border-gray-300 p-2">{p.BeneficiarioNome}</td>
                <td className="border border-gray-300 p-2">
                  <button
                    className="font-bold py-3 px-10 rounded hover:bg-blue-200"
                    style={!p.ComprovanteUrl ? { color: "red" } : { color: "green" }}
                    onClick={() => {
                      setCurrentPayment(p);
                      setEditReceiptOpen(true);
                    }}
                    disabled={!p.Id}
                  >
                    {p.ComprovanteUrl ? <FontAwesomeIcon icon={faCheck} className="text-2xl" /> : <FontAwesomeIcon icon={faAdd} className="text-2xl" />}
                  </button>
                </td>
                <td className="border border-gray-300 p-2">
                  <button
                    disabled={!p.Id}
                    className={"font-bold py-3 px-8 rounded hover:bg-blue-300"}
                    style={!p.Observacao ? { color: "gray" } : { color: "#5a6eed" }}
                    onClick={() => {
                      console.log(p);
                      setCurrentPayment(p);
                      setObservationOpen(true);
                    }}
                  >
                    {p.Observacao ? <FontAwesomeIcon icon={faEye} className="text-2xl" /> : <p className="text-xl">---</p>}
                  </button>
                </td>
                <td className="border border-gray-300 p-2">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                    onClick={() => {
                      setCurrentPayment(p);
                      setAddEditPaymentOpen(true);
                    }}
                  >
                    Editar
                  </button>
                </td>
                <td className="border border-gray-300 p-2">
                  <button
                    onClick={() => {
                      setPaymentDelete(p);
                      setDeletePaymentOpen(true);
                    }}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {hasNextPage && <IntersectionObserverContainer handleIntersection={fetchNextPage} />}
      </div>
      <div className="py-2 font-bold">
        <p>
          Pagamentos: <span className="text-blue-700">{pagamentos.filter((p) => !!p.Id).length}</span>
        </p>
        {pagamentos.filter((p) => !p.Id).length > 0 && (
          <p>
            Faltando: <span className="text-red-500">{pagamentos.filter((p) => !p.Id).length}</span>
          </p>
        )}
        <p>
          Valor Total: <span className="text-blue-700">R$ {pagamentos.reduce((total, pagamento) => total + pagamento.Valor, 0)}</span>
        </p>
      </div>
      <HostModal isOpen={addEditPaymentOpen} onRequestClose={onCancel}>
        <AddEditPaymentForm onCancel={onCancel} payment={currentPayment} />
      </HostModal>
      <HostModal isOpen={deletePaymentOpen} onRequestClose={() => setDeletePaymentOpen(false)}>
        <DeleteConfirm
          onCancel={() => setDeletePaymentOpen(false)}
          onConfirm={() => deletePayment(paymentDelete.Id)}
          message={`Tem certeza que quer excluir o pagamento de '${paymentDelete?.NomeInquilino}'?`}
          isError={isDeleteError}
          isLoading={isDeleteLoading}
          error={deleteError}
        />
      </HostModal>
      <HostModal
        isOpen={editReceiptOpen}
        onRequestClose={() => {
          setEditReceiptOpen(false);
          setCurrentPayment(null);
        }}
      >
        <ReceiptForm
          onCancel={() => {
            setEditReceiptOpen(false);
            setCurrentPayment(null);
          }}
          payment={currentPayment}
        />
      </HostModal>
      <HostModal isOpen={observationOpen} onRequestClose={onCloseObservation}>
        <ObservationForm payment={currentPayment} onClose={onCloseObservation} />
      </HostModal>
      <HostModal onRequestClose={() => setGenerateFomReceiptOpen(false)} isOpen={generateFromReceiptOpen}>
        <GenerateFromReceiptForm setOpen={setGenerateFomReceiptOpen} />
      </HostModal>
    </>
  );
};

type AddEditPaymentFormProps = {
  onCancel: () => void;
  payment?: Payment;
};

const AddEditPaymentForm: FC<AddEditPaymentFormProps> = ({ onCancel, payment }) => {
  const { mutateAsync: addEditPayment, isError, isLoading, error } = useAddEditPayment();
  const [tenantId, setTenantId] = useState(payment?.InquilinoId);
  const [value, setValue] = useState(payment?.Valor);
  const [paymentDate, setPaymentDate] = useState(payment?.DataPagamento);
  const [referenceMonth, setReferenceMonth] = useState(payment?.MesReferente || new Date().getMonth() + 1); // +1 here, due to the fact that database months starts at 1 and not 0
  const [referenceYear, setReferenceYear] = useState(payment?.AnoReferente || new Date().getUTCFullYear().toString());
  const [observation, setObservation] = useState(payment?.Observacao);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await addEditPayment({
      id: payment?.Id,
      tenantId,
      value,
      paymentDate,
      referenceMonth,
      referenceYear,
      observation,
    });
    if (!isError) {
      onCancel();
    }
  };

  const onChangeYear = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setReferenceYear(e.target.value);
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col justify-center items-start gap-4 py-2 px-6">
      <div className="flex flex-row justify-between w-full">
        <TenantSelect tenantId={tenantId} setTenantId={setTenantId} />
        <div className="flex flex-col">
          <label htmlFor="payment-valor" className="text-gray-700 font-bold mb-1">
            Valor
          </label>
          <input
            max={10000}
            min={200}
            type="number"
            id="payment-valor-input"
            name="payment-valor"
            required
            className="border rounded p-2 w-full focus:border-blue-500"
            placeholder="Valor "
            value={value || ""}
            onChange={(e) => setValue(e.target.value ? Number(e.target.value) : 0)}
          />
        </div>
      </div>
      <div className="flex flex-row w-full justify-between">
        <div className="flex flex-col">
          <label htmlFor="payment-data" className="text-gray-700 font-bold mb-1">
            Data do Pagamento
          </label>
          <input
            type="date"
            required
            id="payment-data-input"
            name="payment-data"
            className="border rounded p-2 w-full focus:border-blue-500"
            value={paymentDate ? new Date(paymentDate).toISOString().substring(0, 10) : ""}
            onChange={(e) => setPaymentDate(e.target.value ? new Date(e.target.value) : null)}
          />
        </div>
        <div className="flex flex-col">
          <MonthSelect month={referenceMonth} setMonth={setReferenceMonth} />
        </div>
        <YearSelect year={referenceYear} onChange={onChangeYear} />
      </div>
      <div className="flex flex-col w-full">
        <label htmlFor="payment-obeservacao" className="text-gray-700 font-bold mb-1">
          Observação
        </label>
        <textarea
          name="payment-obeservacao"
          className="w-full p-1 h-28 border-2 border-gray-200"
          maxLength={100}
          value={observation}
          onChange={(e) => setObservation(e.target.value)}
        ></textarea>
      </div>
      <ConfirmCancelButtons onCancel={onCancel} />
      {isError && !isLoading && <p className="py-5 text-red-500">{error.message}</p>}
    </form>
  );
};

type ObservationFormProps = {
  payment: Payment;
  onClose: () => void;
};

const ObservationForm: FC<ObservationFormProps> = ({ payment, onClose }) => {
  const { mutateAsync: editPayment, isLoading, isError, error } = useAddEditPayment();
  const [observation, setObservation] = useState(payment?.Observacao || "");

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await editPayment({
      id: payment.Id,
      paymentDate: payment.DataPagamento,
      value: payment.Valor,
      tenantId: payment.InquilinoId,
      referenceMonth: payment.MesReferente,
      referenceYear: payment.AnoReferente,
      observation: observation,
    });
    !isError && onClose();
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col justify-between items-center h-48">
      <textarea required className="w-full p-1 h-28 border-2 border-gray-200" value={observation} onChange={(e) => setObservation(e.target.value)}></textarea>
      <ConfirmCancelButtons onCancel={onClose} confirmDisabled={isLoading} />
    </form>
  );
};

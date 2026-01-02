"use client";

import axios from "@/lib/axios";
import { useEffect, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { BiCheck, BiCheckDouble } from "react-icons/bi";

import {
  Overlay,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  TableContainer,
  ButtonAdd,
  ClosedForm,
  BocClosedFrom,
  Action,
  ScrollCell,
  TableWrapper,
  BoxButtonAdd,
  BoxElementsCode,
  ScrollCode,
  BillForm,
  FormGrid,
  FormGroup,
  FormActions,
  HorizontalScroll,
} from "./styles";

import { BillsProps } from "@/types/bills";
import { CopyCod } from "../Copy";

// ----------------------
// UTIL DATAS
// ----------------------
const parseToLocalDate = (dateString: string): Date | null => {
  if (!dateString) return null;

  const iso = dateString.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (iso) return new Date(+iso[1], +iso[2] - 1, +iso[3]);

  const br = dateString.match(/^(\d{2})\/(\d{2})\/(\d{4})/);
  if (br) return new Date(+br[3], +br[2] - 1, +br[1]);

  const d = new Date(dateString);
  return isNaN(d.getTime()) ? null : d;
};

const isSameDay = (d1: Date | null, d2: Date | null) =>
  !!d1 &&
  !!d2 &&
  d1.getFullYear() === d2.getFullYear() &&
  d1.getMonth() === d2.getMonth() &&
  d1.getDate() === d2.getDate();

// ----------------------

interface FormBillsProps {
  name: string;
  price: string;
  date: string;
  cod: string;
}

interface Props {
  billsData: BillsProps[];
  refetchBills: () => void;
  setIsVisibleTabelaBills: React.Dispatch<React.SetStateAction<boolean>>;
}

export const FormBills = ({
  billsData,
  refetchBills,
  setIsVisibleTabelaBills,
}: Props) => {
  const [formBills, setFormBills] = useState<FormBillsProps>({
    name: "",
    price: "",
    date: "",
    cod: "",
  });

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [totalUnpaid, setTotalUnpaid] = useState(0);

  // ----------------------
  // FORMATADORES
  // ----------------------
  const formatCurrency = (value: string) => {
    const number = Number(value.replace(/\D/g, "")) / 100;
    return number.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "cod" && value.length > 47) return;

    if (name === "price") {
      setFormBills((p) => ({ ...p, price: formatCurrency(value) }));
      return;
    }

    setFormBills((p) => ({ ...p, [name]: value }));
  };

  // ----------------------
  // CRUD
  // ----------------------
  const handleAddBill = async () => {
    await axios.post("/bills/create-bills", formBills);
    await refetchBills();
    resetForm();
  };

  const handleUpdateBill = async () => {
    if (!editingId) return;
    await axios.put(`/bills/update-bills/${editingId}`, formBills);
    await refetchBills();
    resetForm();
  };

  const handleEdit = (bill: BillsProps) => {
    setEditingId(bill._id);
    setFormBills(bill);
    setShowForm(true);
  };

  const handleDeleteBills = async (id: string) => {
    await axios.delete(`/bills/delete-bills/${id}`);
    await refetchBills();
  };

  const handlePay = async (id: string) => {
    await axios.post(`/bills/update-status/${id}`, { paid: true });
    await refetchBills();
  };

  const resetForm = () => {
    setFormBills({ name: "", price: "", date: "", cod: "" });
    setEditingId(null);
    setShowForm(false);
  };

  // ----------------------
  // TOTAL
  // ----------------------
  useEffect(() => {
    const total = billsData
      .filter((b) => !b.paid)
      .reduce((sum, b) => {
        const v = Number(
          b.price.replace("R$", "").replace(/\./g, "").replace(",", ".")
        );
        return sum + (isNaN(v) ? 0 : v);
      }, 0);

    setTotalUnpaid(total);
  }, [billsData]);

  // ----------------------

  return (
    <>
      <Overlay />

      <TableContainer>
        <BocClosedFrom>
          <ClosedForm onClick={() => setIsVisibleTabelaBills(false)}>
            X
          </ClosedForm>
        </BocClosedFrom>

        <TableWrapper>
          <HorizontalScroll>
          <Table>
            <Thead>
              <Tr>
                <Th>Nome</Th>
                <Th>Valor</Th>
                <Th>Data</Th>
                <Th>Código</Th>
                <Th>Ações</Th>
              </Tr>
            </Thead>

            <Tbody>
              {[...billsData]
                .sort(
                  (a, b) =>
                    new Date(a.date).getTime() - new Date(b.date).getTime()
                )
                .map((bill) => {
                  const highlight = isSameDay(
                    parseToLocalDate(bill.date),
                    new Date()
                  );

                  return (
                    <Tr
                      key={bill._id}
                      $paid={bill.paid}
                      className={highlight ? "highlight" : ""}
                    >
                      <Td>
                        <ScrollCell>{bill.name}</ScrollCell>
                      </Td>
                      <Td>R$ {bill.price}</Td>
                      <Td>{bill.date}</Td>

                      <Td>
                        <div style={{ display: "flex", gap: 8 }}>
                          <ScrollCode>{bill.cod}</ScrollCode>
                          <CopyCod text={bill.cod} />
                        </div>
                      </Td>

                      <Td>
                        {bill.paid ? (
                          <BiCheckDouble size={22} color="#22c55e" />
                        ) : (
                          <Action>
                            <BiCheck onClick={() => handlePay(bill._id)} />
                            <FiEdit onClick={() => handleEdit(bill)} />
                            <FiTrash2
                              onClick={() => handleDeleteBills(bill._id)}
                            />
                          </Action>
                        )}
                      </Td>
                    </Tr>
                  );
                })}
            </Tbody>
          </Table>
          </HorizontalScroll>
        </TableWrapper>

        {/* FORMULÁRIO */}
        {showForm && (
          <BillForm
            onSubmit={(e) => {
              e.preventDefault();
              editingId ? handleUpdateBill() : handleAddBill();
            }}
          >
            <FormGrid>
              <FormGroup>
                <label>Nome</label>
                <input
                  name="name"
                  value={formBills.name}
                  onChange={handleChange}
                />
              </FormGroup>

              <FormGroup>
                <label>Valor</label>
                <input
                  name="price"
                  value={formBills.price}
                  onChange={handleChange}
                />
              </FormGroup>

              <FormGroup>
                <label>Data</label>
                <input
                  type="date"
                  name="date"
                  value={formBills.date}
                  onChange={handleChange}
                />
              </FormGroup>

              <FormGroup className="code">
                <label>Código</label>
                <div className="code-box">
                  <input
                    name="cod"
                    value={formBills.cod}
                    onChange={handleChange}
                  />
                  <span
                    className={
                      formBills.cod.length === 47 ? "valid" : "invalid"
                    }
                  >
                    {formBills.cod.length}/47
                  </span>
                </div>
              </FormGroup>
            </FormGrid>

            <FormActions>
              <button type="submit">
                {editingId ? "Atualizar" : "Salvar"}
              </button>
              <button type="button" onClick={resetForm}>
                Cancelar
              </button>
            </FormActions>
          </BillForm>
        )}

        <BoxButtonAdd>
          {!showForm && (
            <>
              <div className="totalPaid">
                Total: R$ {totalUnpaid.toFixed(2)}
              </div>
              <ButtonAdd onClick={() => setShowForm(true)}>
                Adicionar Boleto
              </ButtonAdd>
            </>
          )}
        </BoxButtonAdd>
      </TableContainer>
    </>
  );
};

import axios from "@/lib/axios";
import { useState } from "react";
import { FiCopy, FiEdit, FiTrash2 } from "react-icons/fi";
import { BiCheck } from "react-icons/bi";
import { BiCheckDouble } from "react-icons/bi";

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
  InputTable,
  ClosedForm,
  BocClosedFrom,
  Action,
  ScrollCell,
  TableWrapper,
  BoxButtonAdd,
  BoxElementsCode,
} from "./styles";

import { BillsProps } from "@/types/bills";
import { CopyCod } from "../Copy";

// ---------------------------------------------
// FUNÇÕES PARA TRATAR DATAS
// ---------------------------------------------
const parseToLocalDate = (dateString: string): Date | null => {
  if (!dateString) return null;

  // ISO YYYY-MM-DD ou YYYY-MM-DDTHH:mm:ss
  const isoMatch = dateString.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (isoMatch) {
    const [_, y, m, d] = isoMatch;
    return new Date(Number(y), Number(m) - 1, Number(d));
  }

  // BR DD/MM/YYYY
  const brMatch = dateString.match(/^(\d{2})\/(\d{2})\/(\d{4})/);
  if (brMatch) {
    const [_, d, m, y] = brMatch;
    return new Date(Number(y), Number(m) - 1, Number(d));
  }

  // fallback
  const tryDate = new Date(dateString);
  if (!isNaN(tryDate.getTime())) {
    return new Date(
      tryDate.getFullYear(),
      tryDate.getMonth(),
      tryDate.getDate()
    );
  }

  return null;
};

const isSameDay = (d1: Date | null, d2: Date | null) => {
  if (!d1 || !d2) return false;
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
};

// ---------------------------------------------
// TYPES
// ---------------------------------------------
interface FormBillsProps {
  name: string;
  price: string;
  date: string;
  cod: string;
}

interface DataFormBillsProps {
  billsData: BillsProps[];
  refetchBills: () => void;
  setIsVisibleTabelaBills: React.Dispatch<React.SetStateAction<boolean>>;
}

// ---------------------------------------------
// COMPONENTE
// ---------------------------------------------
export const FormBills = ({
  billsData,
  refetchBills,
  setIsVisibleTabelaBills,
}: DataFormBillsProps) => {
  const [formBills, setFormBills] = useState<FormBillsProps>({
    name: "",
    price: "",
    date: "",
    cod: "",
  });

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // FORMATAR PREÇO
  const formatCurrency = (price: string) => {
    const number = Number(price.replace(/\D/g, "")) / 100;

    return number.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  // EDITAR
  const handleEdit = (bill: BillsProps) => {
    setEditingId(bill._id);
    setFormBills({
      name: bill.name,
      price: bill.price,
      cod: bill.cod,
      date: bill.date,
    });
    setShowForm(true);
  };

  // DELETAR
  const handleDeleteBills = async (idBills: string) => {
    try {
      await axios.delete(`/bills/delete-bills/${idBills}`);
      await refetchBills();
    } catch (error) {
      console.log("Erro ao deletar boleto", error);
    }
  };

  // ALTERAR CAMPOS
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === "cod") {
      if (value.length <= 47) {
        setFormBills((prev) => ({ ...prev, cod: value }));
      }
      return;
    }

    if (name === "price") {
      const formatted = formatCurrency(value);
      setFormBills((prev) => ({ ...prev, price: formatted }));
      return;
    }

    setFormBills((prev) => ({ ...prev, [name]: value }));
  };

  // CRIAR
  const handleAddBill = async () => {
    try {
      await axios.post(`/bills/create-bills`, formBills);
      await refetchBills();
      setShowForm(false);
      resetForm();
    } catch (error) {
      console.log("Erro ao cadastrar boleto", error);
    }
  };

  // ATUALIZAR
  const handleUpdateBill = async () => {
    if (!editingId) return;

    try {
      await axios.put(`/bills/update-bills/${editingId}`, formBills);
      await refetchBills();
      resetForm();
      setShowForm(false);
      setEditingId(null);
    } catch (error) {
      console.log("Erro ao atualizar boleto", error);
    }
  };

  const handleClick = async (productId: string) => {
    try {
      const res = await axios.post(`bills/update-status/${productId}`, {
        paid: true,
      });

      if (res.status === 200) {
        console.log("Boleto Pago");
      }

      await refetchBills();
    } catch (error) {
      console.error(error, "Error ao Pagar");
    }
  };
  // RESETAR FORM
  const resetForm = () => {
    setFormBills({
      name: "",
      price: "",
      date: "",
      cod: "",
    });
    setEditingId(null);
  };

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
                  const billDate = parseToLocalDate(bill.date);

                  const today = new Date();
                  const todayLocal = new Date(
                    today.getFullYear(),
                    today.getMonth(),
                    today.getDate()
                  );

                  const highlight = isSameDay(billDate, todayLocal);

                  return (
                    <Tr
                      $paid={bill.paid}
                      key={bill._id}
                      className={highlight ? "highlight" : ""}
                    >
                      <Td>
                        <ScrollCell>{bill.name}</ScrollCell>
                      </Td>

                      <Td>R$ {bill.price}</Td>

                      <Td>{bill.date}</Td>

                      <Td>
                        <div className="flex">
                          <ScrollCell>{bill.cod}</ScrollCell>
                          <CopyCod text={bill.cod} />
                        </div>
                      </Td>

                      <Td>
                        {bill.paid === true ? (
                          <div className="text-3xl text-blue-900 flex justify-center relative right-10">
                            <BiCheckDouble />
                          </div>
                        ) : (
                          <Action>
                            <BiCheck onClick={() => handleClick(bill._id)} />
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

              {showForm && (
                <Tr>
                  <Td>
                    <ScrollCell>
                      <InputTable
                        name="name"
                        value={formBills.name}
                        onChange={handleChange}
                        placeholder="Nome"
                      />
                    </ScrollCell>
                  </Td>

                  <Td>
                    <InputTable
                      name="price"
                      value={formBills.price}
                      onChange={handleChange}
                      placeholder="R$"
                    />
                  </Td>

                  <Td>
                    <InputTable
                      type="date"
                      name="date"
                      value={formBills.date}
                      onChange={handleChange}
                    />
                  </Td>

                  <Td>
                    <BoxElementsCode>
                      <ScrollCell>
                        <InputTable
                          name="cod"
                          placeholder="Código"
                          value={formBills.cod}
                          onChange={handleChange}
                        />
                      </ScrollCell>

                      <span
                        className={`${
                          formBills.cod.length >= 1 && formBills.cod.length < 47
                            ? "text-red-700"
                            : formBills.cod.length === 47
                            ? "text-emerald-600"
                            : ""
                        }`}
                      >
                        {formBills.cod.length} / 47
                      </span>
                    </BoxElementsCode>
                  </Td>

                  <Td></Td>
                </Tr>
              )}
            </Tbody>
          </Table>
        </TableWrapper>

        <BoxButtonAdd>
          {!showForm ? (
            <ButtonAdd onClick={() => setShowForm(true)}>
              Adicionar Boleto
            </ButtonAdd>
          ) : (
            <>
              {editingId ? (
                <ButtonAdd onClick={handleUpdateBill}>Atualizar</ButtonAdd>
              ) : (
                <ButtonAdd onClick={handleAddBill}>Salvar</ButtonAdd>
              )}

              <ButtonAdd
                onClick={() => {
                  resetForm();
                  setShowForm(false);
                }}
              >
                Cancelar
              </ButtonAdd>
            </>
          )}
        </BoxButtonAdd>
      </TableContainer>
    </>
  );
};

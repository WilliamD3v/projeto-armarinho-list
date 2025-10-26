"use client";
import axios from "@/lib/axios";
import React, { useMemo, useState } from "react";

import { FiTrash2, FiEdit } from "react-icons/fi";
import { GastosProps } from "@/types/gastos";

import {
  Overlay,
  TableContainer,
  CloseButton,
  TableEl,
  Thead,
  Tbody,
  Th,
  Tr,
  Td,
  Actions,
  TotalRow,
  BoxButtonAddGastos,
  ButtonAddGastos,
} from "./styles";
import { PageContainer } from "../FormProduct/styles";
import { FormGastos } from "../FromGastos";
import { usePathname, useRouter } from "next/navigation";

interface GastosWithId extends GastosProps {
  _id: string;
}

interface Props {
  dataGastos?: GastosWithId[];
  closeTable: () => void;
  refetchGastos: () => void;
  onEdit?: (gasto: GastosWithId) => void;
}

export const TabelaGastos: React.FC<Props> = ({
  dataGastos = [],
  closeTable,
  refetchGastos,
}) => {
  const router = useRouter();
  const url = usePathname();

  const [isVisibleFormGastos, setIsVisiblesFormGastos] = useState(false);
  const [idGastos, setIdGastos] = useState("");

  const gastosPorPessoa = useMemo(() => {
    return dataGastos.reduce<Record<string, GastosWithId[]>>((acc, g) => {
      if (!acc[g.name]) acc[g.name] = [];
      acc[g.name].push(g);
      return acc;
    }, {});
  }, [dataGastos]);

  function formatPriceBRL(value: number | string): string {
    const v =
      typeof value === "string"
        ? Number(value.replace(/[^0-9,-]/g, "").replace(",", "."))
        : value;
    return isNaN(v)
      ? "R$ 0,00"
      : new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(v);
  }

  const handleDelete = async (gastosId: string) => {
    try {
      await axios.delete(`/gastos/delete-gastos/${gastosId}`);
      refetchGastos();
    } catch (e) {
      console.error("Erro ao deletar gasto", e);
    }
  };

  return (
    <Overlay onClick={closeTable}>
      <TableContainer onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={closeTable}>×</CloseButton>

        <TableEl>
          <Thead>
            <Tr>
              <Th>Nome</Th>
              <Th>Empresa</Th>
              <Th>Preço</Th>
              <Th>Ações</Th>
            </Tr>
          </Thead>

          <Tbody>
            {Object.entries(gastosPorPessoa).map(([nome, gastos]) => {
              const total = gastos.reduce(
                (acc, g) =>
                  acc +
                  Number(g.price.replace(/[^0-9,-]/g, "").replace(",", ".")),
                0
              );

              return (
                <React.Fragment key={nome}>
                  {gastos.map((item) => (
                    <Tr key={item._id}>
                      <Td>{item.name}</Td>
                      <Td>{item.enterprise}</Td>
                      <Td>{formatPriceBRL(item.price)}</Td>
                      <Td>
                        <Actions>
                          <FiEdit
                            size={16}
                            style={{ cursor: "pointer", marginRight: 6 }}
                            onClick={() => {
                              setIdGastos(item._id);
                              setIsVisiblesFormGastos(true);
                              router.push(`${url}?mode=update`);
                            }}
                          />
                          <FiTrash2
                            size={16}
                            style={{ cursor: "pointer" }}
                            onClick={() => handleDelete(item._id)}
                          />
                        </Actions>
                      </Td>
                    </Tr>
                  ))}

                  {/* Linha de total do grupo */}
                  <TotalRow>
                    <Td colSpan={4}>
                      Total de {nome}: <strong>{formatPriceBRL(total)}</strong>
                    </Td>
                  </TotalRow>
                </React.Fragment>
              );
            })}
          </Tbody>
        </TableEl>

        {isVisibleFormGastos && (
          <PageContainer>
            <FormGastos
              idGastos={idGastos}
              setIsVisiblesFormGastos={setIsVisiblesFormGastos}
              refetchGastos={refetchGastos}
              dataGastos={dataGastos}
            />
          </PageContainer>
        )}

        <BoxButtonAddGastos>
          <ButtonAddGastos
            onClick={() => {
              setIsVisiblesFormGastos(true);
              router.push(`${url}?mode=add`);
            }}
          >
            Adicionar Gastos
          </ButtonAddGastos>
        </BoxButtonAddGastos>
      </TableContainer>
    </Overlay>
  );
};

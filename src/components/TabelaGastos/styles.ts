import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

export const TableContainer = styled.div`
  background: #0f172a;
  width: 95%;
  max-width: 1200px;
  max-height: 80vh;
  border-radius: 8px;
  box-shadow: 0 8px 30px rgba(2, 6, 23, 0.4);
  overflow: auto;
  position: relative;
  padding: 0;
`;

export const CloseButton = styled.button`
  position: absolute;
  right: 14px;
  top: 10px;
  border: none;
  background: transparent;
  font-size: 22px;
  cursor: pointer;
  color: #fff;
  z-index: 1000;
`;

export const TableEl = styled.table`
  width: 100%;
  border-collapse: collapse; /* ← tabela real */
  font-size: 15px;
`;

export const Thead = styled.thead`
  background: #1e293b;
  position: sticky;
  top: 0; /* ← cabeçalho fixo */
  z-index: 5;
`;

export const Th = styled.th`
  padding: 12px;
  text-align: left;
  font-weight: 600;
  color: #e2e8f0;
  border-bottom: 2px solid #334155;
`;

export const Tbody = styled.tbody`
  tr {
    border-bottom: 1px solid #334155;
  }

  tr:hover {
    background: #1e293b;
  }

  td {
    padding: 10px 14px;
    color: #e2e8f0;
    white-space: nowrap;
  }
`;

export const Tr = styled.tr``;

export const Td = styled.td``;

export const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  svg {
    cursor: pointer;
    opacity: 0.8;
    transition: 0.2s;
  }

  svg:hover {
    opacity: 1;
    transform: scale(1.15);
  }
`;

export const TotalRow = styled.tr`
  background: #1e293b;
  font-weight: bold;

  td {
    padding: 12px;
    text-align: right;
    color: #f8fafc;
    border-top: 2px solid #475569;
  }
`;

export const BoxButtonAddGastos = styled.div`
  display: flex;
  justify-content: center;
  color: aliceblue;
  font-weight: 700;
  padding: 10px;
`;

export const ButtonAddGastos = styled.button`
  padding: 10px;
  background: #3b82f6;
  border-radius: 10px;
`;

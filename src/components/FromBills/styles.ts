"use client";

import styled from "styled-components";

/* ================= OVERLAY ================= */

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  z-index: 20;
`;

/* ================= CONTAINER ================= */

export const TableContainer = styled.div`
  position: fixed;
  inset: 50% auto auto 50%;
  transform: translate(-50%, -50%);
  width: 95%;
  max-width: 1200px;
  max-height: 90vh;
  background: #0f172a;
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0 8px 30px rgba(2, 6, 23, 0.4);
  z-index: 30;

  @media (max-width: 768px) {
    padding: 14px;
    border-radius: 16px;
  }
`;

/* ================= HEADER ================= */

export const BocClosedFrom = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const ClosedForm = styled.button`
  background: none;
  border: none;
  color: #e5e7eb;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    color: #f87171;
    transform: scale(1.2);
  }
`;

/* ================= TABLE WRAPPER ================= */

export const TableWrapper = styled.div`
  max-height: 55vh;
  overflow-y: auto;
  overflow-x: hidden;
  margin-top: 12px;

  scrollbar-width: thin;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: #334155;
    border-radius: 10px;
  }
`;

/* ================= TABLE ================= */

export const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 12px;
  color: #f8fafc;
  white-space: nowrap;

  @media (max-width: 768px) {
    display: block;
    width: 100%;
  }
`;

export const Thead = styled.thead`
  background: #1e293b;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const Tbody = styled.tbody`
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
`;

/* ================= ROW ================= */

export const Tr = styled.tr<{ $paid?: boolean }>`
  background: ${({ $paid }) => ($paid ? "#475569" : "#020617")};
  border-radius: 14px;

  &.highlight {
    border: 2px solid #38bdf8;
  }

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    padding: 14px;
    gap: 10px;
  }
`;

/* ================= HEADERS ================= */

export const Th = styled.th`
  padding: 12px;
  text-align: left;
  font-size: 14px;
  color: #cbd5f5;
  position: sticky;
  top: 0;
`;

/* ================= CELLS ================= */

export const Td = styled.td`
  padding: 10px 12px;
  font-size: 14px;
  color: #e5e7eb;

  @media (max-width: 768px) {
    padding: 0;
  }
`;

/* ================= CONTENT ================= */

export const ScrollCell = styled.div`
  max-width: 220px;
  overflow-x: auto;
  white-space: nowrap;

  &::-webkit-scrollbar {
    height: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: #475569;
    border-radius: 6px;
  }
`;

export const ScrollCode = styled.div`
  max-width: 220px;
  overflow-x: auto;
  white-space: nowrap;

  &::-webkit-scrollbar {
    height: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: #475569;
    border-radius: 6px;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

export const BoxElementsCode = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  span {
    font-size: 12px;
    color: #94a3b8;
  }
`;

/* ================= ACTIONS ================= */

export const Action = styled.div`
  display: flex;
  gap: 14px;

  svg {
    font-size: 18px;
    cursor: pointer;
    color: #38bdf8;
    transition: 0.25s;

    &:hover {
      transform: scale(1.2);
    }

    &:last-child:hover {
      color: #f87171;
    }
  }
`;

/* ================= INPUT ================= */

export const InputTable = styled.input`
  width: 100%;
  padding: 10px 12px;
  border-radius: 10px;
  border: 1px solid #334155;
  background: #020617;
  color: #f8fafc;

  &:focus {
    outline: none;
    border-color: #38bdf8;
  }

  &::placeholder {
    color: #64748b;
  }
`;

/* ================= FOOTER ================= */

export const BoxButtonAdd = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  margin-top: 18px;

  .totalPaid {
    font-size: 15px;
    font-weight: 700;
    color: #e5e7eb;
    display: flex;
    gap: 6px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;

    .totalPaid {
      justify-content: center;
    }
  }
`;

export const ButtonAdd = styled.button`
  background: linear-gradient(135deg, #38bdf8, #0ea5e9);
  color: #020617;
  border: none;
  padding: 14px;
  border-radius: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    filter: brightness(1.1);
    transform: translateY(-1px);
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

/* ================= FORM ================= */

export const BillForm = styled.form`
  background: #020617;
  border: 1px solid #1e293b;
  border-radius: 18px;
  padding: 24px;
  margin-top: 18px;
  color: #e5e7eb;

  @media (max-width: 768px) {
    padding: 16px;
    border-radius: 14px;
  }
`;

/* ================= GRID ================= */

export const FormGrid = styled.section`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 18px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 14px;
  }
`;

/* ================= GROUP ================= */

export const FormGroup = styled.fieldset`
  border: none;
  display: flex;
  flex-direction: column;
  gap: 6px;

  label {
    font-size: 13px;
    color: #94a3b8;
    font-weight: 500;
  }

  input {
    background: #020617;
    border: 1px solid #334155;
    border-radius: 12px;
    padding: 12px 14px;
    color: #f8fafc;
    font-size: 14px;

    &:focus {
      outline: none;
      border-color: #38bdf8;
    }
  }

  &.code {
    grid-column: span 2;

    @media (max-width: 1024px) {
      grid-column: span 2;
    }

    @media (max-width: 768px) {
      grid-column: span 1;
    }
  }

  .code-box {
    display: flex;
    align-items: center;
    gap: 10px;

    span {
      font-size: 12px;
      min-width: 60px;
      text-align: right;
    }

    .valid {
      color: #22c55e;
    }

    .invalid {
      color: #ef4444;
    }
  }
`;

/* ================= ACTIONS ================= */

export const FormActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 14px;
  margin-top: 24px;

  button {
    padding: 12px 22px;
    border-radius: 14px;
    border: none;
    font-weight: 700;
    cursor: pointer;
    transition: 0.3s ease;
  }

  button[type="submit"] {
    background: linear-gradient(135deg, #38bdf8, #0ea5e9);
    color: #020617;

    &:hover {
      filter: brightness(1.1);
    }
  }

  button[type="button"] {
    background: transparent;
    color: #94a3b8;

    &:hover {
      color: #f87171;
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;

    button {
      width: 100%;
    }
  }
`;

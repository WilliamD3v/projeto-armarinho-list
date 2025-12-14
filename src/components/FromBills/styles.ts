"use client";

import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
`;

export const BocClosedFrom = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
`;

export const ClosedForm = styled.button`
  color: aliceblue;
  font-weight: 600;
  transition: 0.3s;
  cursor: pointer;

  &:hover {
    color: crimson;
    transform: scale(1.2);
  }
`;

export const TableWrapper = styled.div`
  max-height: 300px; /* limite vertical que você quiser */
  overflow-y: auto;
  overflow-x: hidden;

  scrollbar-width: thin;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background: #4b5563;
    border-radius: 10px;
  }
`;

export const TableContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  max-width: 1200px;
  border-radius: 20px;
  background: #0f172a;
  padding: 20px;
  box-shadow: 0 8px 30px rgba(2, 6, 23, 0.4);
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 12px;
  color: #fff;
  font-family: "Poppins", sans-serif;

  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;

  scrollbar-width: thin;

  &::-webkit-scrollbar {
    height: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: #4b5563;
    border-radius: 10px;
  }
`;

export const Thead = styled.thead`
  background: #1e293b;
`;

export const Tbody = styled.tbody``;

export const Tr = styled.tr<{ $paid?: boolean }>`
  background: ${({ $paid }) => ($paid ? "#008000" : "#071b2f")};

  &.highlight {
    font-weight: 600;
  }
`;

export const Th = styled.th`
  padding: 10px;
  text-align: left;
  background: #1e293b;
  position: sticky;
  top: 0;
  z-index: 10;
`;

export const Td = styled.td`
  padding: 12px;
  font-size: 14px;
  color: #ddd;
`;

export const BoxElementsCode = styled.div`
  display: flex;
  align-items: center;

  span {
    position: relative;
    left: 12px;
  }
`;

/* SCROLL HORIZONTAL SOMENTE EM ALGUMAS CÉLULAS */
export const ScrollCell = styled.div`
  max-width: 180px;
  overflow-x: auto;
  white-space: nowrap;

  &::-webkit-scrollbar {
    height: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: #4b5563;
    border-radius: 10px;
  }
`;

export const Action = styled.div`
  display: flex;
  gap: 10px;

  svg {
    font-size: 18px;
    color: #00aaff;
    cursor: pointer;
    transition: 0.3s ease;

    &:hover {
      transform: scale(1.15);
    }

    &:first-child:hover {
      color: #4caf50;
    }

    &:last-child:hover {
      color: #ff4b4b;
    }
  }
`;

export const InputTable = styled.input`
  width: 100%;
  background: #2b2b2b;
  border: 1px solid #444;
  border-radius: 6px;
  padding: 8px 10px;
  color: #fff;

  &:focus {
    outline: none;
    border-color: #00aaff;
  }

  &::placeholder {
    color: #aaa;
  }
`;

export const BoxButtonAdd = styled.div`
  display: flex;
  justify-content: end;
  gap: 20px;
`;

export const ButtonAdd = styled.button`
  background: #0070f3;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background: #0056c7;
  }
`;

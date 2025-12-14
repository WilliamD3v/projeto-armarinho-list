"use client";
import styled from "styled-components";

/* --- Sidebar --- */
export const SidebarContainer = styled.div`
  width: 250px;
  height: 100vh;
  background: linear-gradient(180deg, #1e293b 0%, #0f172a 100%);
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px 15px;
  position: fixed;
  top: 0;
  left: 0;
  box-shadow: 4px 0 15px rgba(0, 0, 0, 0.2);
`;

export const SidebarTop = styled.div`
  text-align: center;
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 40px;
  color: #f8fafc;
  letter-spacing: 1px;
`;

export const SidebarCenter = styled.div`
  margin: 20px;
  display: flex;
  flex-direction: column;
`;

export const SidebarBottom = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

/* --- Botões --- */
export const Button = styled.button`
  margin-top: 10px;
  background: #3b82f6;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.25s ease;
  box-shadow: 0 2px 6px rgba(59, 130, 246, 0.4);

  &:hover {
    background: #2563eb;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.6);
  }
`;

export const LogoutButton = styled(Button)`
  background: #ef4444;
  box-shadow: 0 2px 6px rgba(239, 68, 68, 0.4);

  &:hover {
    background: #dc2626;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(220, 38, 38, 0.6);
  }
`;

export const Divider = styled.hr`
  border: 0;
  border-top: 1px solid #475569;
  margin: 15px 0;
`;

/* --- Conteúdo principal --- */
export const MainContainer = styled.main`
  margin-left: 250px;
  padding: 40px;
  background-color: #f8fafc;
  min-height: 100vh;

  h1 {
    font-size: 26px;
    font-weight: 700;
    color: #1e293b;
    margin-bottom: 20px;
  }

  h2 {
    font-size: 20px;
    font-weight: 600;
    margin: 25px 0 15px;
    color: #334155;
  }
`;

/* --- Lista de Produtos --- */
export const ProductsList = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const ProductItem = styled.div`
  background: #fff;
  padding: 18px 22px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.12);
  }
`;

export const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  span {
    font-weight: 600;
    font-size: 16px;
    color: #111827;
  }

  small {
    font-size: 14px;
    color: #6b7280;
  }
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 10px;
`;

export const UpdateButton = styled.button`
  margin-top: 10px;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.25s ease;
  background: #10b981;
  box-shadow: 0 2px 6px rgba(16, 185, 129, 0.4);

  &:hover {
    background: #059669;
    box-shadow: 0 4px 12px rgba(5, 150, 105, 0.6);
  }
`;

export const DeleteButton = styled.button`
  margin-top: 10px;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.25s ease;
  background: #ef4444;
  box-shadow: 0 2px 6px rgba(239, 68, 68, 0.4);

  &:hover {
    background: #dc2626;
    box-shadow: 0 4px 12px rgba(220, 38, 38, 0.6);
  }
`;

/* --- Drawer (detalhes do produto) --- */
export const DrawerOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
  animation: fadeIn 0.3s ease;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export const DrawerContent = styled.div`
  background: white;
  padding: 28px;
  border-radius: 16px;
  width: 420px;
  max-width: 90%;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.25);
  position: relative;
  animation: slideUp 0.3s ease;

  @keyframes slideUp {
    from {
      transform: translateY(40px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  h2 {
    margin-bottom: 12px;
    font-size: 22px;
    font-weight: 700;
    color: #1e293b;
  }

  p {
    margin: 6px 0;
    font-size: 15px;
    color: #374151;

    strong {
      color: #111827;
    }
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  background: transparent;
  border: none;
  font-size: 22px;
  font-weight: bold;
  cursor: pointer;
  color: #6b7280;
  transition: color 0.2s;

  &:hover {
    color: #ef4444;
  }
`;

/* --- Container principal com colunas por empresa --- */
export const EnterpriseGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1px;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  overflow: hidden;
  background: white;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

/* --- Coluna de uma empresa --- */
export const EnterpriseColumn = styled.div`
  display: flex;
  flex-direction: column;
  border-right: 1px solid #e2e8f0;
  background: white;

  &:last-child {
    border-right: none;
  }
`;
/* --- Cabeçalho da coluna (nome da empresa) --- */
export const EnterpriseHeader = styled.div`
  background: #1e293b;
  color: #f8fafc;
  font-weight: 700;
  font-size: 18px;
  text-align: center;
  padding: 14px;
  border-bottom: 1px solid #e2e8f0;
`;

/* --- Lista de produtos dentro de uma empresa --- */
export const EnterpriseProducts = styled.div`
  display: flex;
  flex-direction: column;

  max-height: 320px;
  overflow-y: auto;
  overflow-x: hidden;

  scrollbar-width: thin;
  scrollbar-color: #4b5563 transparent;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #4b5563;
    border-radius: 8px;
  }

  @media (max-width: 1024px) {
    max-height: 260px;
  }

  @media (max-width: 640px) {
    max-height: 220px;
  }
`;

export const EnterpriseTotal = styled.div`
  padding: 14px 18px;
  background: #f1f5f9;
  border-top: 1px solid #e2e8f0;

  display: flex;
  justify-content: space-between;
  align-items: center;

  font-weight: 700;
  color: #111827;
`;

/* --- Item de produto --- */
export const EnterpriseProductItem = styled.div`
  padding: 14px 18px;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;

  &:hover {
    background: #f9fafb;
  }

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const EnterpriseProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;

  span {
    font-weight: 600;
    font-size: 15px;
    color: #111827;
  }

  small {
    font-size: 13px;
    color: #6b7280;
  }
`;

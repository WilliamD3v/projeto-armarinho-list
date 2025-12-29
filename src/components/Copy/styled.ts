import styled, { keyframes, css } from "styled-components";

interface CopyButtonProps {
  copied: boolean;
}

const copiedAnimation = keyframes`
  0% { transform: scale(1); color: #4ade80; }
  50% { transform: scale(1.3); color: #16a34a; }
  100% { transform: scale(1); color: #4ade80; }
`;

export const CopyButton = styled.button<CopyButtonProps>`
  background: transparent;
  border: none;
  cursor: pointer;
  margin-left: 8px;

  display: flex;
  align-items: center;

  color: #6b7280;
  transition: color 0.2s ease;

  &:hover {
    color: #111;
  }

  ${({ copied }) =>
    copied &&
    css`
      animation: ${copiedAnimation} 0.4s ease;
      color: #22c55e !important;
    `}

  @media (max-width: 390px) {
  }
`;

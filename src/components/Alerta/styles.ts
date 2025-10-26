import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-8px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const AlertBox = styled.div<{ alertType: "success" | "error" }>`
  width: 100%;
  padding: 14px;
  border-radius: 8px;
  text-align: center;
  font-weight: 600;
  margin-top: 10px;
  animation: ${fadeIn} 0.25s ease;
  transition: opacity 0.25s ease;

  background-color: ${(props) =>
    props.alertType === "success" ? "#0f5132" : "#842029"};
  color: ${(props) => (props.alertType === "success" ? "#d1e7dd" : "#f8d7da")};
  border: 2px solid
    ${(props) => (props.alertType === "success" ? "#badbcc" : "#f5c2c7")};
`;

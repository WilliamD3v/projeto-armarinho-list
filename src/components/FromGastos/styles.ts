"use client";
import styled from "styled-components";

export const FormContainer = styled.form`
  position: relative;
  background-color: #2c2c3a;
  padding: 30px;
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 25px rgba(0, 0, 0, 0.3);
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px;
  border-radius: 10px;
  border: none;
  background-color: #3a3a4a;
  color: #fff;
  font-size: 14px;
  transition: 0.2s;

  &::placeholder {
    color: #bdbdbd;
  }

  &:focus {
    outline: 2px solid #6c63ff;
  }
`;

export const SmallInputsContainer = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
`;

export const SmallInput = styled(Input)`
  flex: 1;
  min-width: 0;
`;

export const Button = styled.button`
  width: 100%;
  padding: 12px;
  border-radius: 10px;
  border: none;
  background-color: #6c63ff;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
  transition: 0.2s ease;

  &:hover {
    background-color: #574fd6;
  }
`;

export const CloseButtonForm = styled.button`
  position: absolute;
  top: 5px;
  right: 12px;
  background: transparent;
  border: none;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  color: #fff;
  transition: 0.2s;

  &:hover {
    color: #ff4d4d;
  }
`;

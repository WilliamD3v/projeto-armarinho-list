"use client";
import React from "react";
import { AlertBox } from "./styles";

interface AlertProps {
  message: string;
  type: "success" | "error";
}

const Alert: React.FC<AlertProps> = ({ message, type }) => {
  if (!message) return null;

  return <AlertBox alertType={type}>{message}</AlertBox>;
};

export default Alert;

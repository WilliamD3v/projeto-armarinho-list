"use client";

import axios from "@/lib/axios";
import {
  Input,
  Button,
  CloseButtonForm,
  FormContainer,
  SmallInput,
  SmallInputsContainer,
} from "./styles";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { GastosProps } from "@/types/gastos";
import Alert from "../Alerta";

interface ItensGastos {
  idGastos: string;
  refetchGastos: () => void;
  dataGastos: GastosProps[];
  setIsVisiblesFormGastos: React.Dispatch<React.SetStateAction<boolean>>;
}

export const FormGastos = ({
  idGastos,
  refetchGastos,
  setIsVisiblesFormGastos,
  dataGastos,
}: ItensGastos) => {
  const search = useSearchParams();
  const update = search.get("mode");

  const [form, setForm] = useState({
    name: "",
    enterprise: "",
    price: "",
  });

  const [sucessAlert, setSucessAlert] = useState("");
  const [errorAlert, setErrorAlert] = useState("");

  const formatCurrency = (price: string) => {
    const number = Number(price.replace(/\D/g, "")) / 100;
    return number.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === "price") {
      const formatted = formatCurrency(value);
      setForm((prev) => ({ ...prev, [name]: formatted }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  // ✅ Preencher dados automaticamente se estiver no modo update
  useEffect(() => {
    if (update === "update" && idGastos && dataGastos) {
      const gasto = dataGastos.find((item) => item._id === idGastos);

      if (gasto) {
        setForm({
          name: gasto.name,
          enterprise: gasto.enterprise,
          price: gasto.price,
        });
      }
    }
  }, [update, idGastos, dataGastos]);

  const handleUpdate = async () => {
    if (!form.name && !form.enterprise && !form.price) {
      setErrorAlert("Todos os campos são obrigatorio!");
      return;
    }

    try {
      const res = await axios.post(`gastos/update-gastos/${idGastos}`, form);

      if (res.status === 200) {
        setSucessAlert("Gastos Atualizado com sucesso!");
      }

      await refetchGastos();

      setIsVisiblesFormGastos(false);
    } catch (error) {
      setErrorAlert("Error ao Atualizar gastos!");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name && !form.enterprise && !form.price) {
      setErrorAlert("Todos os campos são obrigatorio!");
      return;
    }

    try {
      const res = await axios.post(`gastos/create-gastos`, form);

      if (res.status === 200) {
        setSucessAlert("Gasto cadastrado com sucesso!");
      }

      await refetchGastos();

      setIsVisiblesFormGastos(false);
    } catch (error) {
      console.log("Erro ao cadastrar gastos", error);
    }
  };

  return (
    <FormContainer>
      <CloseButtonForm onClick={() => setIsVisiblesFormGastos(false)}>
        X
      </CloseButtonForm>

      <h2 style={{ color: "#fff", textAlign: "center", marginBottom: "10px" }}>
        Formulário de Gastos
      </h2>

      {sucessAlert && <Alert type="success" message={sucessAlert} />}
      {errorAlert && <Alert type="error" message={errorAlert} />}

      <Input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Nome:"
      />
      <Input
        name="enterprise"
        value={form.enterprise}
        onChange={handleChange}
        placeholder="Empresa:"
      />

      <SmallInputsContainer>
        <SmallInput
          name="price"
          placeholder="0,00"
          value={form.price}
          onChange={handleChange}
        />
      </SmallInputsContainer>

      <Button
        onClick={(e) => {
          e.preventDefault();
          update === "update" ? handleUpdate() : handleSubmit(e);
        }}
      >
        Enviar
      </Button>
    </FormContainer>
  );
};

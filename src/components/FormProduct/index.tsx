"use client";
import axios from "@/lib/axios";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import {
  FormContainer,
  SmallInputsContainer,
  SmallInput,
  TextArea,
  Input,
  Button,
  CloseButtonForm,
} from "./styles";

interface FormProductProps {
  refetchProduct: () => void;
  closeForm: () => void;
  setProductToEdit: (data: any) => void;
  initialData?: any;
}

export const FormProduct = ({
  refetchProduct,
  closeForm,
  setProductToEdit,
  initialData,
}: FormProductProps) => {
  const [form, setForm] = useState({
    name: "",
    cod: "",
    qnt: "",
    value: "",
    enterprise: "",
    description: "",
  });

  const formatCurrency = (value: string) => {
    const number = Number(value.replace(/\D/g, "")) / 100;
    return number.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === "value") {
      const formatted = formatCurrency(value);
      setForm((prev) => ({ ...prev, [name]: formatted }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let res;
      if (initialData?._id) {
        // 🔹 Atualizar
        res = await axios.put(
          `product/update-product/${initialData._id}`,
          form
        );

        await refetchProduct();

        setProductToEdit(null);

        setForm({
          cod: "",
          description: "",
          enterprise: "",
          name: "",
          qnt: "",
          value: "",
        });
      } else {
        // 🔹 Criar
        res = await axios.post(`product/create-product`, form);
      }

      if (res.status === 200) {
        console.log(initialData ? "Produto atualizado!" : "Produto criado!");
      }

      await refetchProduct();

      setForm({
        cod: "",
        description: "",
        enterprise: "",
        name: "",
        qnt: "",
        value: "",
      });
      closeForm();
    } catch (error) {
      console.log("Erro ao salvar produto:", error);
    }
  };

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name,
        cod: initialData.cod,
        qnt: initialData.qnt,
        value: initialData.value,
        enterprise: initialData.enterprise,
        description: initialData.description,
      });
    } else {
      setForm({
        name: "",
        cod: "",
        qnt: "",
        value: "",
        enterprise: "",
        description: "",
      });
    }
  }, [initialData]);

  return (
    <>
      <FormContainer>
        <CloseButtonForm
          onClick={(e) => {
            e.preventDefault();
            closeForm();
            setProductToEdit(null);
          }}
        >
          X
        </CloseButtonForm>
        <Input
          type="text"
          name="name"
          placeholder="Nome"
          value={form.name}
          onChange={handleChange}
        />
        <SmallInputsContainer>
          <SmallInput
            type="text"
            name="cod"
            placeholder="COD."
            value={form.cod}
            onChange={handleChange}
          />
          <SmallInput
            type="number"
            name="qnt"
            placeholder="Qnt."
            value={form.qnt}
            onChange={handleChange}
          />
          <SmallInput
            type="text"
            name="value"
            placeholder="0,00"
            value={form.value}
            onChange={handleChange}
          />
        </SmallInputsContainer>
        <Input
          type="text"
          name="enterprise"
          placeholder="Empresa"
          value={form.enterprise}
          onChange={handleChange}
        />
        <TextArea
          name="description"
          rows={4}
          placeholder="Descrição..."
          value={form.description}
          onChange={handleChange}
        />
        <Button onClick={handleSubmit}>
          {initialData ? "Atualizar" : "Criar"}
        </Button>
      </FormContainer>
    </>
  );
};

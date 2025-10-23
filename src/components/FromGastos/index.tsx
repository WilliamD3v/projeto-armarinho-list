"use client";

import {
  Input,
  Button,
  CloseButtonForm,
  FormContainer,
  SmallInput,
  SmallInputsContainer,
} from "./styles";

export const FormGastos = () => {
  return (
    <>
      <FormContainer>
        <CloseButtonForm
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          X
        </CloseButtonForm>

        <h2
          style={{ color: "#fff", textAlign: "center", marginBottom: "10px" }}
        >
          Formulário de Gastos
        </h2>

        <Input type="text" placeholder="Nome:" />
        <Input type="text" placeholder="Empresa:" />

        <SmallInputsContainer>
          <SmallInput type="text" placeholder="Valor:" />
        </SmallInputsContainer>

        <Button>Enviar</Button>
      </FormContainer>
    </>
  );
};

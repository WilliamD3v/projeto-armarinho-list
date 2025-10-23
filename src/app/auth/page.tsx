"use client";
import { useAuth } from "@/context/authContext";
import {
  BoxButtonSend,
  BoxInput,
  Button,
  Card,
  Container,
  Input,
  TitleCardSingIn,
} from "./styles";
import { useState } from "react";

export default function Auth() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmitAdm = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signIn({ email, password });
    } catch (error) {
      console.log("Error efetuar login:", error);
    }
  };

  return (
    <Container>
      <Card>
        <TitleCardSingIn>SingIn</TitleCardSingIn>

        <BoxInput>
          <Input
            type="text"
            id="email"
            placeholder="Usuário"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="text"
            id="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </BoxInput>

        <BoxButtonSend>
          <Button onClick={handleSubmitAdm}>Entrar</Button>
        </BoxButtonSend>
      </Card>
    </Container>
  );
}

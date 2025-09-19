"use client";
import {
  BoxButtonSend,
  BoxInput,
  Button,
  Card,
  Container,
  Input,
  TitleCardSingIn,
} from "./styles";

export default function Auth() {
  return (
    <Container>
      <Card>
        <TitleCardSingIn>SingIn</TitleCardSingIn>

        <BoxInput>
          <Input type="text" name="" id="" placeholder="Usuário" />
          <Input type="text" name="" id="" placeholder="Senha" />
        </BoxInput>

        <BoxButtonSend>
          <Button>Entrar</Button>
        </BoxButtonSend>
      </Card>
    </Container>
  );
}

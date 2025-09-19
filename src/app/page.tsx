"use client"
import { useRouter } from "next/navigation";

import {
  BoxButtunHeader,
  ButtonHeader,
  Container,
  Header,
  TextHeader,
} from "./styles";

export default function Home() {
  const router = useRouter();

  return (
    <Container>
      <Header>
        <TextHeader>Armarinho Simoes</TextHeader>

        <BoxButtunHeader>
          <ButtonHeader onClick={() => router.push("/auth")}>
            Login
          </ButtonHeader>
        </BoxButtunHeader>
      </Header>
    </Container>
  );
}

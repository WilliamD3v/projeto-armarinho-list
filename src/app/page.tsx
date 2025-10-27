"use client";

import styled from "styled-components";

const Container = styled.div`
  font-family: "Poppins", sans-serif;
  min-height: 100vh;
  margin: 0;
  background: #f5f5f5;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 50px;
  background-color: rgba(30, 58, 138, 0.95);
  color: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(8px);
  border-bottom: 2px solid #a16207;
  position: sticky;
  top: 0;
  z-index: 10;
`;

const Logo = styled.h1`
  color: #fff;
  font-weight: 700;
  font-size: 2rem;

  span {
    color: #f59e0b;
  }
`;

const LoginButton = styled.a`
  font-weight: 500;
  color: #1e3a8a;
  text-decoration: none;
  cursor: pointer;
  border: 2px solid #1e3a8a;
  padding: 8px 16px;
  border-radius: 8px;
  background-color: #fff;
  transition: all 0.3s ease;

  &:hover {
    background-color: #1e3a8a;
    color: #fff;
    border-color: #fff;
  }
`;

const HeroSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: calc(100vh - 80px); /* tela inteira menos o header */
  padding: 20px;
  background: linear-gradient(to right, #1e3a8a, #a16207);
  color: #fff;
`;

const HeroTitle = styled.h2`
  font-size: 60px;
  font-weight: 700;
  margin-bottom: 20px;
`;

const HeroText = styled.p`
  font-size: 22px;
  max-width: 800px;
  line-height: 1.6;
`;

export default function HomePage() {
  return (
    <Container>
      <Header>
        <Logo>
          Armarinho <span>Simoes</span>
        </Logo>
        <LoginButton href="/auth">Login</LoginButton>
      </Header>

      <HeroSection>
        <HeroTitle>Bem-vindo ao Armarinho Simoes!</HeroTitle>
        <HeroText>
          Este portal é exclusivo para a empresa. Aqui você pode gerenciar
          informações internas, acompanhar processos e otimizar suas atividades
          com eficiência.
        </HeroText>
      </HeroSection>
    </Container>
  );
}

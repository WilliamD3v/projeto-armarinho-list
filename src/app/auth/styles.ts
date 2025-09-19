import styled from "styled-components";

export const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #0070f3, #ff7e00);
  font-family: "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
`;

export const Card = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(12px);
  padding: 3rem 2.5rem;
  border-radius: 1.5rem;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  animation: fadeIn 0.6s ease-in-out;

  @keyframes fadeIn {
    from {
      transform: translateY(30px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

export const TitleCardSingIn = styled.h1`
  text-align: center;
  font-size: 2rem;
  font-weight: bold;
  background: linear-gradient(135deg, #0070f3, #ff7e00);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

export const BoxInput = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Input = styled.input`
  padding: 0.9rem 1.2rem;
  border-radius: 0.8rem;
  border: none;
  outline: none;
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.2);
  color: #fff;

  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }

  &:focus {
    background: rgba(255, 255, 255, 0.3);
    box-shadow: 0 0 0 2px #0070f3;
  }
`;

export const BoxButtonSend = styled.div`
  display: flex;
  justify-content: center;
`;

export const Button = styled.button`
  padding: 0.9rem 1.2rem;
  border-radius: 0.8rem;
  border: none;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  background: linear-gradient(135deg, #0070f3, #ff7e00);
  color: white;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
  }

  &:active {
    transform: scale(0.97);
  }
`;

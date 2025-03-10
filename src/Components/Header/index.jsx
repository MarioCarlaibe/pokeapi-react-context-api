import styled from "styled-components";
import { useContext } from "react";
import { ThemeContext } from "../Contexts/themeContext";
import logo from '../../Images/pocketcards-logo.png'

export const HeaderTitle = () => {
  const { toggleTheme, toggleIcon } = useContext(ThemeContext);
  return (
      <Header>
        <Img src={logo} alt="logo" />
        <h1>
          <i>Pocket Cards</i>
        </h1>
        <Button onClick={toggleTheme}>{toggleIcon} Change Theme</Button>
      </Header>
  );
};
const Header = styled.header`
  margin: 10px 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.bgheader};
  color: ${({ theme }) => theme.color};
  max-width: 100vw;
  padding: 20px;
  gap: 30px;
  border: 4px solid ${({ theme }) => theme.color};
  border-radius: 20px;
  & h1 {
    font-size: 40px;
    font-weight: 900;
  }
  @media (max-width: 765px) {
    flex-direction: column;
  }
`;
const Img = styled.img`
  width: 160px;
`;
const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 200px;
  height: 50px;
  padding: 10px;
  border-radius: 10px;
  background: ${({ theme }) => theme.bgbutton};
  color: ${({ theme }) => theme.color};
  font-size: 20px;
  font-weight: 900;
  cursor: pointer;
  border: 2px solid ${({ theme }) => theme.color};
  transition: 0.2s;
  &:hover {
    scale: 1.1;
  }
`;

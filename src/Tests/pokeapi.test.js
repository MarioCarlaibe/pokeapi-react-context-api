import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeProvider } from "../ThemeProvider";
import Home from "../Home";
import axios from "axios";

jest.mock("axios");

describe("Home Component", () => {
  test("renders the page title", () => {
    render(
      <ThemeProvider>
        <Home />
      </ThemeProvider>
    );
    expect(screen.getByText("Lista de Pokémon")).toBeInTheDocument();
  });

  test("fetches and displays Pokémon", async () => {
    axios.get.mockResolvedValue({
      data: {
        results: [
          { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" },
        ],
      },
    });

    render(
      <ThemeProvider>
        <Home />
      </ThemeProvider>
    );

    expect(await screen.findByText("bulbasaur")).toBeInTheDocument();
  });

  test("toggles theme on button click", () => {
    render(
      <ThemeProvider>
        <Home />
      </ThemeProvider>
    );
    const button = screen.getByRole("button", { name: /Alternar Tema/i });
    fireEvent.click(button);
    expect(document.body.className).toContain("dark");
  });

  test("loads more Pokémon on button click", async () => {
    axios.get.mockResolvedValue({
      data: {
        results: [
          { name: "charmander", url: "https://pokeapi.co/api/v2/pokemon/4/" },
        ],
      },
    });

    render(
      <ThemeProvider>
        <Home />
      </ThemeProvider>
    );

    const button = screen.getByRole("button", { name: /Carregar mais/i });
    fireEvent.click(button);
    expect(await screen.findByText("charmander")).toBeInTheDocument();
  });

  test("filters Pokémon by type", async () => {
    axios.get.mockResolvedValue({
      data: {
        results: [
          { name: "squirtle", url: "https://pokeapi.co/api/v2/pokemon/7/" },
        ],
      },
    });

    render(
      <ThemeProvider>
        <Home />
      </ThemeProvider>
    );

    const select = screen.getByLabelText("Filtrar por tipo");
    fireEvent.change(select, { target: { value: "water" } });

    expect(await screen.findByText("squirtle")).toBeInTheDocument();
  });
});

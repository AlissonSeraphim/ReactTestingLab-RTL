import React from 'react';
import { screen } from '@testing-library/react';
import About from '../pages/About';
import renderWithRouter from '../renderWithRouter';

describe('Testes do componente About', () => {
  test('Verifica se a página contém as informações sobre a pokédex', () => {
    renderWithRouter(<About />);
    const getText = screen.getByText(/This application simulates a Pokédex/i);
    expect(getText).toBeInTheDocument();
  });

  test('Verifica se a página contém um heading h2', () => {
    renderWithRouter(<About />);
    const getHeadingNv2 = screen.getByRole('heading', { name: /about pokédex/i, level: 2 });
    expect(getHeadingNv2).toBeInTheDocument();
  });

  test('Verifica se a página contém dois parágrafos com texto sobre a pokédex', () => {
    renderWithRouter(<About />);
    const getFirstParagraph = screen.getByText(/This application simulates a Pokédex, a digital encyclopedia containing all Pokémon/i);
    const getSecondParagraph = screen.getByText(/One can filter Pokémon by type, and see more details for each one of them/i);
    expect(getFirstParagraph).toBeInTheDocument();
    expect(getSecondParagraph).toBeInTheDocument();
  });

  test('Verifica se a página contém a imagem especifica de uma pokédex', () => {
    const imgURL = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

    renderWithRouter(<About />);
    const getImg = screen.getByAltText(/Pokédex/i);

    expect(getImg).toBeInTheDocument();
    expect(getImg.src).toContain(imgURL);
  });
});

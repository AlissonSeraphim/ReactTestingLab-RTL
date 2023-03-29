import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Verifica o componente Pokemon.js', () => {
  test('Verifica se é renderizado um card com as informações de determinado Pokémon', () => {
    renderWithRouter(<App />);
    const dragonButton = screen.getByRole('button', { name: /dragon/i });
    userEvent.click(dragonButton);

    const detailsButton = screen.getByRole('link', { name: /more details/i });
    userEvent.click(detailsButton);

    // Nome do pokemon correto no titulo
    const dragonNameHeading = screen.getByRole('heading', { name: /dragonair details/i });
    expect(dragonNameHeading).toBeInTheDocument();

    // Nome do pokemon correto no card
    const dragonName = screen.getByText('Dragonair');
    expect(dragonName).toBeInTheDocument();

    // Tipo correto do pokémon
    const dragonType = screen.getByText('Dragon');
    expect(dragonType).toBeInTheDocument();

    // peso médio do pokémon exibido
    const dragonAverageWeight = screen.getByText(/average weight: 16\.5 kg/i);
    expect(dragonAverageWeight).toBeInTheDocument();

    // Imagem correta do pokemon
    const imgURL = 'https://archives.bulbagarden.net/media/upload/2/2c/Spr_5b_148.png';
    const pokemonImg = screen.getByAltText(/dragonair sprite/i);
    expect(pokemonImg.src).toContain(imgURL);
  });

  test('Verifica se o card do Pokémon indicado na Pokédex contém um link de navegação para exibir detalhes deste Pokémon.', () => {
    const { history } = renderWithRouter(<App />);
    const normalButton = screen.getByRole('button', { name: /normal/i });
    userEvent.click(normalButton);

    const rightLink = screen.getByRole('link', { name: /more details/i });
    userEvent.click(rightLink);

    const { location: { pathname } } = history;

    expect(pathname).toBe('/pokemon/143');
  });

  test('Verifica se existe um ícone de estrela nos Pokémon favoritados', () => {
    renderWithRouter(<App />);
    const dragonButton = screen.getByRole('button', { name: /dragon/i });
    userEvent.click(dragonButton);

    const detailsButton = screen.getByRole('link', { name: /more details/i });
    userEvent.click(detailsButton);

    const getFavoriteBox = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    userEvent.click(getFavoriteBox);

    const favoriteIcon = screen.getByAltText(/dragonair is marked as favorite/i);
    expect(favoriteIcon).toBeInTheDocument();
    expect(favoriteIcon.src).toContain('/star-icon.svg');
  });
});

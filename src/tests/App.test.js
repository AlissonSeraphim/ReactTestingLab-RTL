import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRounter from '../renderWithRouter';

describe('Testes do Componente App.js, redirecionamento e links existentes', () => {
  test('Testa a existência de conjunto fixo de links de navegação', () => {
    renderWithRounter(<App />);
    const getHomeLink = screen.getByRole('link', { name: /home/i });
    const getAboutLink = screen.getByRole('link', { name: /about/i });
    const getFavoriteLink = screen.getByRole('link', { name: /favorite pokémon/i });

    expect(getHomeLink).toBeInTheDocument();
    expect(getAboutLink).toBeInTheDocument();
    expect(getFavoriteLink).toBeInTheDocument();
  });

  test('Testa o redirecionamento do link Home', () => {
    renderWithRounter(<App />);
    const getHomeLink = screen.getByRole('link', { name: /home/i });
    userEvent.click(getHomeLink);

    const getHomeTitle = screen.getByRole('heading', { name: /encountered pokémon/i });
    expect(getHomeTitle).toBeInTheDocument();
  });

  test('Testa o redirecionamento do link About', () => {
    renderWithRounter(<App />);
    const getAboutLink = screen.getByRole('link', { name: /about/i });
    userEvent.click(getAboutLink);

    const getAboutTitle = screen.getByRole('heading', { name: /about pokédex/i });
    expect(getAboutTitle).toBeInTheDocument();
  });

  test('Testa o redirecionamento do link Favorite Pokémon', () => {
    renderWithRounter(<App />);
    const getFavoriteLink = screen.getByRole('link', { name: /favorite pokémon/i });
    userEvent.click(getFavoriteLink);

    const getFavoriteTitle = screen.getByRole('heading', { name: /favorite pokémon/i });
    expect(getFavoriteTitle).toBeInTheDocument();
  });
});

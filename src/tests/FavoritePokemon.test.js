import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FavoritePokemon from '../pages/FavoritePokemon';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testes do componente FavoritePokemon.js', () => {
  test('Enquanto sem favoritos, verifica se é exibida na tela a mensagem No favorite pokemon found ', () => {
    renderWithRouter(<FavoritePokemon />);
    const NoFavoriteText = screen.getByText(/No favorite Pokémon found/i);
    expect(NoFavoriteText).toBeInTheDocument();
  });

  test('Verifica se somente os pokemons favoritados são exibidos', () => {
    // Favorita o pokemon
    renderWithRouter(<App />);

    // seleciona o pokemon
    const getDragonButton = screen.getByRole('button', { name: /dragon/i });
    userEvent.click(getDragonButton);

    // Acessa os detalhes dele
    const getDetailsLink = screen.getByRole('link', { name: /more details/i });
    userEvent.click(getDetailsLink);

    // Favorita o pokemon
    const getFavoriteCheckbox = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    userEvent.click(getFavoriteCheckbox);

    // Acessa a aba de favoritos
    const getFavoriteLink = screen.getByRole('link', { name: /favorite pokémon/i });
    userEvent.click(getFavoriteLink);

    // Verifica se está na tela
    const favoritePokemonName = screen.getByText(/dragonair/i);
    expect(favoritePokemonName).toBeInTheDocument();
  });
});

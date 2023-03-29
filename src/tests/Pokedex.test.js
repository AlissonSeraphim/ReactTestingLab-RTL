import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Verifica o componente Pokedex.js', () => {
  test('Verifica se a página contém um heading h2 com o texto Encountered Pokémon', () => {
    renderWithRouter(<App />);
    const getHeadingNv2 = screen.getByRole('heading', { name: /encountered pokémon/i, level: 2 });

    expect(getHeadingNv2).toBeInTheDocument();
  });

  test('Verifica se é exibido o próximo Pokémon da lista quando o botão Próximo Pokémon é clicado', () => {
    renderWithRouter(<App />);
    const proximoPokemonButton = screen.getByRole('button', { name: /próximo pokémon/i });
    const pokemonNames = ['Pikachu', 'Charmander', 'Caterpie', 'Ekans', 'Alakazam', 'Mew', 'Rapidash', 'Snorlax', 'Dragonair', 'Pikachu'];

    pokemonNames.forEach((pokemon) => {
      const pokemonName = screen.getByText(pokemon);
      expect(pokemonName).toBeInTheDocument();
      userEvent.click(proximoPokemonButton);
    });
  });

  test('Verifica se é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<App />);
    const psychicButton = screen.getByRole('button', { name: /psychic/i });
    userEvent.click(psychicButton);
    const alakazam = screen.getByText(/alakazam/i);
    expect(alakazam).toBeInTheDocument();

    const fireButton = screen.getByRole('button', { name: /fire/i });
    userEvent.click(fireButton);
    const charmander = screen.getByText(/charmander/i);
    expect(charmander).toBeInTheDocument();
  });

  test('Verifica se a pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);
    const getElementalButtons = screen.getAllByTestId('pokemon-type-button');

    //  Se os botões existem na tela.
    getElementalButtons.forEach((btn) => expect(btn).toBeInTheDocument());

    //  Se o tipo do pokemon clicado na tela corresponde ao do botão clicado;
    const psychicButton = screen.getByRole('button', { name: /psychic/i });
    userEvent.click(psychicButton);
    const typePsychic = screen.getAllByText(/psychic/i);
    expect(typePsychic.length).toBe(2);

    // Verifica se o botão All esteve sempre visivel
    const getAllButton = screen.getByRole('button', { name: /all/i });
    expect(getAllButton).toBeInTheDocument();
  });

  test('Verifica se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);

    // Se o botão All existe na renderização inicial
    const getAllButton = screen.getByRole('button', { name: /all/i });
    expect(getAllButton).toBeInTheDocument();

    // Se apos clicado no All todos os pokémons são apresentados;
    userEvent.click(getAllButton);
    const proximoPokemonButton = screen.getByRole('button', { name: /próximo pokémon/i });
    const allPokemons = ['Pikachu', 'Charmander', 'Caterpie', 'Ekans', 'Alakazam', 'Mew', 'Rapidash', 'Snorlax', 'Dragonair'];
    allPokemons.forEach((pokemon) => {
      const pokemonName = screen.getByText(pokemon);
      expect(pokemonName).toBeInTheDocument();
      userEvent.click(proximoPokemonButton);
    });

    // Se ao carregar a página, trocar de pokemon e filtrar retorna para o pikachu
    const fireButton = screen.getByRole('button', { name: /fire/i });
    userEvent.click(fireButton);
    const firePokemon = screen.getByText(/charmander/i);
    expect(firePokemon).toBeInTheDocument();

    userEvent.click(getAllButton);
    const firstPokemon = screen.getByText(/pikachu/i);
    expect(firstPokemon).toBeInTheDocument();
  });
});

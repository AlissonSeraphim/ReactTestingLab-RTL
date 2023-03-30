import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Verifica o componente PokemonDetails.js', () => {
  test('Verifica se as informações detalhadas do Pokémon selecionado são mostradas na tela:', () => {
    renderWithRouter(<App />);
    const dragonButton = screen.getByRole('button', { name: /dragon/i });
    userEvent.click(dragonButton);

    const detailsButton = screen.getByRole('link', { name: /more details/i });
    userEvent.click(detailsButton);

    // Nome do pokemon correto no titulo
    const dragonNameHeading = screen.getByRole('heading', { name: /dragonair details/i });
    expect(dragonNameHeading).toBeInTheDocument();

    // verifica se o link details não existe mais
    expect(detailsButton).not.toBeInTheDocument();

    // Verifica se existe um heading nivel 2 Summary
    const getSummaryHeading = screen.getByRole('heading', { name: /summary/i, level: 2 });
    expect(getSummaryHeading).toBeInTheDocument();

    // Verifica se contem um parágrafo com resumo do pokémon visualizado
    const getPokemonDetails = screen.getByText(/they say that if it emits a./i);
    expect(getPokemonDetails).toBeInTheDocument();
  });

  test('Verifica se existe na página uma seção com os mapas contendo as localizações do Pokémon', () => {
    renderWithRouter(<App />);
    const dragonButton = screen.getByRole('button', { name: /dragon/i });
    userEvent.click(dragonButton);

    const detailsButton = screen.getByRole('link', { name: /more details/i });
    userEvent.click(detailsButton);

    // verifica se existe um heading nivel 2 na seção de detalhes
    const getDetailsHeading = screen.getByRole('heading', { name: /Game Locations of/i, level: 2 });
    expect(getDetailsHeading).toBeInTheDocument();

    // Verifica se todos as localizações são mostradas nome do mapa das localizações
    const dragonairLocations = ['Johto Route 45', 'Johto Dragon\'s Den'];
    dragonairLocations.forEach((location) => {
      const getLocation = screen.getByText(location);
      expect(getLocation).toBeInTheDocument();
    });

    // Verifica se a imagem da localização possui atributo src igual a url correta e possui alt com o texto correto da localização do pokemon
    const locationImgsURLs = ['https://archives.bulbagarden.net/media/upload/2/21/Johto_Route_45_Map.png', 'https://archives.bulbagarden.net/media/upload/1/1e/Johto_Dragons_Den_Map.png'];
    const getImgs = screen.getAllByAltText(/dragonair location/i);

    locationImgsURLs.forEach((imgURL, index) => {
      expect(getImgs[index].src).toContain(imgURL);
    });
  });

  test('Verifica se o usuário pode favoritar um Pokémon através da página de detalhes:', () => {
    renderWithRouter(<App />);

    // Verifica se existe um checkbox para favoritar
    const dragonButton = screen.getByRole('button', { name: /dragon/i });
    userEvent.click(dragonButton);

    const detailsButton = screen.getByRole('link', { name: /more details/i });
    userEvent.click(detailsButton);

    const getFavoriteBox = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    expect(getFavoriteBox).toBeInTheDocument();

    // verifica se é possivel favoritar e retirar dos favoritos
    // adicionando nos favoritos
    userEvent.click(getFavoriteBox);
    const favoriteIcon = screen.getByAltText(/dragonair is marked as favorite/i);
    expect(favoriteIcon).toBeInTheDocument();

    // Retirando dos favoritos
    userEvent.click(getFavoriteBox);
    expect(favoriteIcon).not.toBeInTheDocument();

    // Verifica se existe a label pokémon favoritado?
    const getLabelText = screen.getByLabelText(/Pokémon favoritado?/i);
    expect(getLabelText).toBeInTheDocument();
  });
});

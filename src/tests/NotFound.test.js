import React from 'react';
import { screen } from '@testing-library/react';
import { NotFound } from '../pages';
import renderWithRouter from '../renderWithRouter';

describe('Verifica o componente NotFound.js', () => {
  test('Verifica se a página contém um h2 com Page requested not found', () => {
    renderWithRouter(<NotFound />);
    const getHeadingNv2 = screen.getByRole('heading', { name: /page requested not found/i });
    expect(getHeadingNv2).toBeInTheDocument();
  });

  test('Verifica se a página mostra a imagem especifica', () => {
    const imgURL = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

    renderWithRouter(<NotFound />);
    const getImg = screen.getByAltText(/Pikachu crying because the page requested was not found/i);

    expect(getImg.src).toContain(imgURL);
  });
});

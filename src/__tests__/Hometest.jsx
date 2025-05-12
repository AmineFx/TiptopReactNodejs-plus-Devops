import React from 'react';
import { render, screen } from '@testing-library/react';
import Acceuil from '../pages/Acceuil';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router';

jest.mock('../apiGlobal', () => ({
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

jest.mock('../assets/bg.jpeg', () => 'mocked-image-path');

describe('Acceuil Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders Acceuil component with welcome message and play button', async () => {
    render(
      <MemoryRouter>
        <Acceuil />
      </MemoryRouter>
    );
    expect(screen.getByText('Bienvenue sur notre jeu')).toBeInTheDocument();
    const playButton = screen.getByRole('button', { name: /jouer/i });
    expect(playButton).toBeInTheDocument();
  });
});

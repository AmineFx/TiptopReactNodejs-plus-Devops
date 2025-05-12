import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Game from '../pages/admin/Game';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom'

jest.mock('js-cookie', () => ({
  get: jest.fn(() => 'mockedAccessToken'),
}));

jest.mock('../apiGlobal', () => ({
  apiGlobal: {
    get: jest.fn(() => Promise.resolve({ status: 200, data: [{ id: 1, nom: 'Participant', prenom: 'Test', email: 'test@example.com' }] })),
  },
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn().mockReturnValue({ pathname: '/' }),
  useNavigate: jest.fn(),
}));

describe('Game Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders Game component and displays participant count', async () => {
    render(<MemoryRouter><Game /></MemoryRouter>)
    expect(await screen.findByText('Nombre de participants : 1')).toBeInTheDocument();
  });

  it('displays winner when "Tirer au sort" button is clicked', async () => {
    render(<MemoryRouter><Game /></MemoryRouter>);
    fireEvent.click(await screen.findByText('Tirer au sort'));
    expect(await screen.findByText('Le gagnant :')).toBeInTheDocument();
  });
});

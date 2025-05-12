import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import NotFound from '../pages/NotFound';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom'

jest.mock('../apiGlobal', () => ({
}));

describe('NotFound Component', () => {
  it('renders NotFound component', async () => {
    render(<MemoryRouter><NotFound /></MemoryRouter>);
    expect(await screen.getByText('404 Erreur')).toBeInTheDocument();
    expect(await screen.getByText('Page non trouvée')).toBeInTheDocument();
    expect(await screen.getByText('Désolé, la page que vous recherchez n\'existe pas.')).toBeInTheDocument();
    expect(await screen.getByText('Revenir à l\'acceuil')).toBeInTheDocument();
  });

  it('redirects to the home page when "Revenir à l\'acceuil" is clicked', () => {
    const { getByText } = render(<MemoryRouter><NotFound /></MemoryRouter>);
    const homeLink = getByText('Revenir à l\'acceuil');
    fireEvent.click(homeLink);
    expect(window.location.pathname).toBe('/');
  });
});

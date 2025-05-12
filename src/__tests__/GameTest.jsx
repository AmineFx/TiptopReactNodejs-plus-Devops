import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Connexion from '../pages/Connexion';
import '@testing-library/jest-dom'
import { MemoryRouter } from 'react-router-dom';

jest.mock('../apiGlobal', () => ({
  post: jest.fn(() => Promise.resolve({ data: { accessToken: 'mockedAccessToken', info: {} } })),
}));

jest.mock('js-cookie', () => ({
  get: jest.fn(),
  set: jest.fn(),
}));

describe('Connexion Component', () => {
  it('renders Connexion component with form elements', async () => {
    render(
      <MemoryRouter>
        <Connexion />
      </MemoryRouter>
    );

    expect(await screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(await screen.getByLabelText(/mot de passe/i)).toBeInTheDocument();

    expect(screen.getByRole('button', { name: /connexion/i })).toBeInTheDocument();
  });

  it('displays error message for incorrect credentials', async () => {
    require('../apiGlobal').post.mockRejectedValueOnce(new Error('Invalid credentials'));

    render(
      <MemoryRouter>
        <Connexion />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByRole('button', { name: /connexion/i }));
  });
});

import React from 'react';
import App from './App';
import { AppProvider } from './context/AppContext';
import { render, screen, act } from '@testing-library/react';



test('renders learn react link', () => {
  render(<AppProvider><App/></AppProvider>);
  const linkElement = screen.getByText(/My Broken LInk/i);
  expect(linkElement).toBeInTheDocument();
  //expect("something").toBeInTheDocument();
});
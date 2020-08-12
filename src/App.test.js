import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import Home from './pages/Home/';


it('should render app without break', () => {
  const { getByText } = render(<App />);
  expect(getByText('Discover')).toBeInTheDocument();
});

it('should render StarWars button', ()=> {
  const { getByText } = render(<App/>);
  expect(getByText('StarWars')).toBeInTheDocument();
});

it('should render Brewer button', ()=> {
  const { getByText } = render(<App/>);
  expect(getByText('Brewer')).toBeInTheDocument();
});
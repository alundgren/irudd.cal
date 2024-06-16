import { render, screen } from '@testing-library/react';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { createStore } from './store';
import { Provider } from 'react-redux';
import React from 'react';

test('renders learn react link', () => {
  let store = createStore();
  render(<Provider store={store}>
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>                
    </React.StrictMode>
</Provider>);
  const linkElement = screen.getByText(/Steps/i);
  expect(linkElement).toBeInTheDocument();
});

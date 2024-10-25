import { render, screen } from '@testing-library/react';
import App from './App';
// In your index.js or App.js



test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

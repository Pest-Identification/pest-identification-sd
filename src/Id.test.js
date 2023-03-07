import { render, screen } from '@testing-library/react';
import Id from './Id';

test('renders learn react link', () => {
  render(<Id />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

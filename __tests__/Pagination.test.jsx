import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from '../src/components/Pagination';
import jest from 'jest-mock';

test('renders page numbers and responds to click', () => {
  const onChange = jest.fn();
  render(<Pagination currentPage={2} totalPages={5} onPageChange={onChange} />);

  expect(screen.getByText('1')).toBeInTheDocument();
  expect(screen.getByText('2')).toHaveClass('active');
  fireEvent.click(screen.getByText('3'));
  expect(onChange).toHaveBeenCalledWith(3);
});

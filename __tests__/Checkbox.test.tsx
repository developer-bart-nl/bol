import { render, screen, fireEvent } from '@testing-library/react';
import Checkbox from '@/components/Checkbox';

describe('Checkbox component', () => {
	it('renders with a label', () => {
		const mockOnChange = vi.fn();

		render(<Checkbox label="Test Label" checked={false} onChange={mockOnChange} />);

		expect(screen.getByRole('checkbox')).toBeInTheDocument();
		expect(screen.getByText('Test Label')).toBeInTheDocument();
	});

	it('renders as checked when checked prop is true', () => {
		const mockOnChange = vi.fn();

		render(<Checkbox label="Test Label" checked={true} onChange={mockOnChange} />);

		expect(screen.getByRole('checkbox')).toBeChecked();
	});

	it('calls onChange with correct parameters when clicked', () => {
		const mockOnChange = vi.fn();

		render(<Checkbox label="Test Label" checked={false} onChange={mockOnChange} />);

		fireEvent.click(screen.getByRole('checkbox'));

		expect(mockOnChange).toHaveBeenCalledWith('Test Label', true);
	});
});

import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import SearchBox from '@/components/SearchBox';

describe('SearchBox component', () => {
	beforeEach(() => {
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.clearAllTimers();
		vi.useRealTimers();
	});

	it('renders input field with placeholder', () => {
		const mockOnChange = vi.fn();

		render(<SearchBox onChange={mockOnChange} placeholder="Search here..." />);

		const input = screen.getByRole('searchbox');

		expect(input).toBeInTheDocument();
		expect(input).toHaveAttribute('placeholder', 'Search here...');
	});

	it('updates input value and calls onChange after debounce delay', () => {
		const mockOnChange = vi.fn();

		render(<SearchBox onChange={mockOnChange} delay={500} />);

		const input = screen.getByRole('searchbox');

		fireEvent.change(input, { target: { value: 'hello' } });

		// Should not be called immediately
		expect(mockOnChange).not.toHaveBeenCalled();

		// Should be called after delay
		vi.advanceTimersByTime(500);
		expect(mockOnChange).toHaveBeenCalledWith('hello');
	});

	it('debounces multiple rapid inputs and calls onChange with final value', () => {
		const mockOnChange = vi.fn();

		render(<SearchBox onChange={mockOnChange} delay={300} />);

		const input = screen.getByRole('searchbox');

		fireEvent.change(input, { target: { value: 'a' } });
		fireEvent.change(input, { target: { value: 'ab' } });
		fireEvent.change(input, { target: { value: 'abc' } });

		// Should not be called after 100ms
		vi.advanceTimersByTime(100);
		expect(mockOnChange).not.toHaveBeenCalled();

		// Should be called after delay
		vi.advanceTimersByTime(300);
		expect(mockOnChange).toHaveBeenCalledTimes(1);
		expect(mockOnChange).toHaveBeenCalledWith('abc');
	});
});

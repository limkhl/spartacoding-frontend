import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('Todo 통합 테스트', () => {
  it('할 일을 추가하고, 체크박스를 클릭하면 텍스트에 취소선이 그어진다', () => {
    render(<App />);
    const todoInput = screen.getByLabelText('New Todo');
    const dateInput = screen.getByLabelText('Deadline');
    const addButton = screen.getByRole('button', { name: /Add Todo/i });

    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const todayStr = `${yyyy}-${mm}-${dd}`;
    fireEvent.change(dateInput, { target: { value: todayStr } });

    fireEvent.change(todoInput, { target: { value: '통합테스트 할 일' } });
    fireEvent.click(addButton);

    const todoText = screen.getByText('통합테스트 할 일');
    expect(todoText).toBeInTheDocument();

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(todoText.parentElement).toHaveStyle('text-decoration: line-through');
  });
});
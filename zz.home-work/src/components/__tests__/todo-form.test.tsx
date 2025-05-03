// src/components/TodoForm.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { TodoForm } from '../todo-form';
import { vi } from 'vitest';
import { Todo } from '../../types/todo';

describe('TodoForm 단위 테스트', () => {
  const mockSetTodos = vi.fn();
  const todos: Todo[] = [];

  beforeEach(() => {
    mockSetTodos.mockClear();
  });

  it('할 일 텍스트와 데드라인 날짜를 입력받을 수 있다', () => {
    render(<TodoForm todos={todos} setTodos={mockSetTodos} />);
    const todoInput = screen.getByLabelText('New Todo');
    const dateInput = screen.getByLabelText('Deadline');

    fireEvent.change(todoInput, { target: { value: '테스트 할 일' } });
    fireEvent.change(dateInput, { target: { value: '2024-07-01' } });

    expect(todoInput).toHaveValue('테스트 할 일');
    expect(dateInput).toHaveValue('2024-07-01');
  });
});

describe('TodoForm', () => {
  const setup = () => {
    const setTodos = vi.fn();
    render(<TodoForm todos={[]} setTodos={setTodos} />);
    return { setTodos };
  };

  it('100자 이상의 할일을 입력하면 추가 버튼이 비활성화된다', () => {
    setup();
    const input = screen.getByLabelText(/New Todo/i);
    const longText = 'a'.repeat(100);
    fireEvent.change(input, { target: { value: longText } });
    const button = screen.getByRole('button', { name: /Add Todo/i });
    expect(button).toBeDisabled();
  });

  it('데드라인이 오늘 날짜 미만이면 추가 버튼이 비활성화된다', () => {
    setup();
    const input = screen.getByLabelText(/New Todo/i);
    const deadlineInput = screen.getByLabelText(/Deadline/i);

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yyyy = yesterday.getFullYear();
    const mm = String(yesterday.getMonth() + 1).padStart(2, '0');
    const dd = String(yesterday.getDate()).padStart(2, '0');
    const yesterdayStr = `${yyyy}-${mm}-${dd}`;

    fireEvent.change(input, { target: { value: '테스트 할일' } });
    fireEvent.change(deadlineInput, { target: { value: yesterdayStr } });

    const button = screen.getByRole('button', { name: /Add Todo/i });
    expect(button).toBeDisabled();
  });
});
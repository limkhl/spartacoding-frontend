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
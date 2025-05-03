import { TextField, Button } from '@mui/material';
import { Dispatch } from 'react';
import { Todo } from '../types/todo';
import { useTodoForm } from '../hooks/use-todo-form';

export const TodoForm = ({
  todos,
  setTodos,
}: {
  todos: Todo[];
  setTodos: Dispatch<React.SetStateAction<Todo[]>>;
}) => {
  const { initForm, updateDeadline, updateTodo, todo, deadline } =
    useTodoForm();

  const getTodayString = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  const isTodoTooLong = todo.length >= 100;
  const isDeadlineInvalid = !!deadline && deadline < getTodayString();
  const isAddDisabled =
    !todo.trim() ||
    !deadline ||
    isTodoTooLong ||
    isDeadlineInvalid;

  const handleAddTodo = () => {
    if (isAddDisabled) return;

    setTodos([
      ...todos,
      {
        id: Date.now(),
        text: todo.trim(),
        completed: false,
        deadline,
      },
    ]);
    initForm();
  };

  return (
    <>
      <TextField
        label="New Todo"
        variant="outlined"
        fullWidth
        value={todo}
        onChange={(e) => {
          if (e.target.value.length <= 99) {
            updateTodo(e.target.value);
          }
        }}
        style={{ marginBottom: '1rem' }}
        slotProps={{ htmlInput: { maxLength: 100 } }}
      />
      <TextField
        label="Deadline"
        type="date"
        InputLabelProps={{ shrink: true }}
        fullWidth
        value={deadline}
        onChange={(e) => {
          const selectedDate = e.target.value;
          updateDeadline(selectedDate);
        }}
        style={{ marginBottom: '1rem' }}
        slotProps={{ htmlInput: { min: getTodayString() } }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddTodo}
        fullWidth
        disabled={isAddDisabled}
      >
        Add Todo
      </Button>
    </>
  );
};

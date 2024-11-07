import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  TextField,
  Button,
  List,
} from '@mui/material';
import { Add } from '@mui/icons-material';
import TodoItem from './TodoItem';

function App() {
  const [text, setText] = useState('');
  const [todos, setTodos] = useState([]);

  const addTodo = () => {
    if (text.trim()) {
      setTodos([...todos, { text: text, completed: false }]);
      setText('');
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
       
      addTodo();
    }
  };
//delete feature
  const deleteTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };
//toggle todo to done and pending
  const toggleTodo = (index) => {
    const newTodos = todos.map((todo, i) =>
      i === index ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(newTodos);
  };
//edit todo text
  const editTodo = (index, newText) => {
    const newTodos = todos.map((todo, i) =>
      i === index ? { ...todo, text: newText } : todo
    );
    setTodos(newTodos);
  };

  return (
    <>
    
      <AppBar position="static" sx={{ width: '100%' }}>
        <Toolbar>
          <Typography variant="h6">Simple To-Do List</Typography>
        </Toolbar>
      </AppBar>

      <Container>
        <TextField
          label="Add Task"
          variant="outlined"
          fullWidth
          margin="normal"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}  // Save on Enter
         
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          startIcon={<Add />}
          onClick={addTodo}
        >
          Add
        </Button>

        <List>
          {todos.map((todo, index) => (
            <TodoItem
              key={index}
              todo={todo}
              index={index}
              deleteTodo={deleteTodo}
              toggleTodo={toggleTodo}
              editTodo={editTodo}
            />
          ))}
        </List>
      </Container>
    </>
  );
}

export default App;

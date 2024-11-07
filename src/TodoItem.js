import React, { useState } from 'react';
import {
  ListItem,
  ListItemText,
  Checkbox,
  IconButton,
  TextField,
  Box,
  Typography,
  Tooltip,
} from '@mui/material';
import { Delete, Edit, Save } from '@mui/icons-material';

function TodoItem({ todo, index, deleteTodo, toggleTodo, editTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(todo.text);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    editTodo(index, newText);
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSave();  // Save on Enter without Shift
    }
  };

  return (
    <ListItem>


      <Box display="flex" alignItems="center" width="100%">
      <Tooltip title={todo.completed?"Mark as Pending":"Mark as Done"}>
      <Checkbox
        edge="start"
        checked={todo.completed}
        onChange={() => toggleTodo(index)}
      />
      </Tooltip>
     
        <Typography variant="body1" color="textSecondary" marginRight={2}>
          {index + 1}.
        </Typography>

        {isEditing ? (
          <TextField
            fullWidth
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            onKeyDown={handleKeyDown} //also save edited todo on enter 
            
          />
        ) : (
          <ListItemText
            primary={todo.text}
            style={{
              textDecoration: todo.completed ? 'line-through' : 'none',
              wordWrap: 'break-word',  // Ensure text wraps inside the container
            }}
          />
        )}
      </Box>

      <Box display="flex" alignItems="center" marginLeft="auto" gap={1}>
        <Tooltip title={todo.completed?'Mark as Pending':'Mark as Done'}>
  
      </Tooltip>
      {/* show save button on edit mode */}
        {isEditing ? (
            <Tooltip title="Save">
          <IconButton edge="end" onClick={handleSave}>
            <Save />
          </IconButton>
          </Tooltip>
        ) : (
            <Tooltip title="Edit ToDo">
          <IconButton edge="end" onClick={handleEdit}>
            <Edit />
          </IconButton>
          </Tooltip>
        )}
        <Tooltip title="Delete ToDo">
        <IconButton edge="end" onClick={() => deleteTodo(index)}>
          <Delete />
        </IconButton>
        </Tooltip>
      
      </Box>
    </ListItem>
  );
}

export default TodoItem;

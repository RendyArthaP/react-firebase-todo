import { Button, List, ListItem, ListItemText, Modal } from '@material-ui/core'
import React, { Fragment, useState } from 'react'
import './Todo.css';
import db from "../Database/firebase"
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor:theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}));

const Todo = (props) => {
  const classes = useStyles()
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState()

  const deleteButton = () => {
    db.collection('todos').doc(props.todo.id).delete()
  }
  const handleOpenModal = () => {
    setOpen(true)
  }
  const updateTodo = () => {
    db.collection('todos').doc(props.todo.id).set({
      todo: input
    },{ merge: true })
    setOpen(false);
  }
  return (
    <Fragment>
      <Modal
      open={open}
      onClose={e => setOpen(false)}
    >
      <div className={classes.paper}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder={props.todo.todo}
        />
        <Button
          variant="outlined"
          color="primary"
          onClick={updateTodo}
        >
          Update
        </Button>
      </div>
    </Modal>
    <List>
      <ListItem >
        <ListItemText
          primary={props.todo.todo}
          className="todo-list"
        />
      </ListItem>
      <Button
        variant="outlined"
        color="secondary"
        className="delete-button"
        onClick={deleteButton}
      >
        Delete
      </Button>
      <Button
        variant="outlined"
        color="primary"
        className="edit-button"
        onClick={handleOpenModal}
      >
        Edit
      </Button>
    </List>
    </Fragment>
  )
}
export default Todo

import React, { useState, useEffect } from "react";
import { Button, FormControl, Input, InputLabel} from '@material-ui/core';
import './App.css';
import Todo from "./Todo/Todo";
import db from "./Database/firebase"
import firebase from "firebase";

function App () {
  const [todos, setTodos] = useState([])
  const [input, setInput] = useState('')

  useEffect(() => {
    db.collection('todos').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      setTodos(snapshot.docs.map(doc => ({
        id: doc.id,
        todo: doc.data().todo
      }))) 
    })
  }, []);

  const addTodoButton = () => {
    // if (input !== "") {
    //   setTodos(
    //     [...todos, input]
    //   )
    //   setInput('')
    // }
    db.collection('todos').add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    setInput('')
  }
  return(
    <div className="App">
      <h1>Hello Everyone!</h1>
      <FormControl>
        <InputLabel>Write Your Todo</InputLabel>
        <Input
          value={input}
          onChange={e => setInput(e.target.value)}
          className="input-add"
        />
      </FormControl>
      <Button
        variant="contained"
        disabled={!input}
        color="primary"
        onClick={addTodoButton}
        className="add-button "
      >
        Add To Do
      </Button>
      <ul>
        {todos.map(todo => (
          <Todo todo={todo} /> 
        ))}
      </ul>
    </div>
  )
}

export default App;
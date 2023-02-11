import { useState } from "react";
import './App.css'

function App() {

  const [message, setMessage] = useState('')
  const [response, setResponse] = useState('')

  const onTextareaChangeHandler = (event) => {
    event.preventDefault()
    const value = event.target.value
    setMessage(value)
  }

  const onFormSubmitHandler = (event) => {
    event.preventDefault()
    fetch('http://localhost:8000/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message })
    })
      .then((response) => response.json())
      .then((data) => setResponse(data.message))
    
  }

  return (
    <div className="App">
      <h1>Steve Jobs ChatApp</h1>
      <form onSubmit={onFormSubmitHandler}>
        <textarea
        value={message}
        placeholder='Ask steve anything...'
        onChange={onTextareaChangeHandler}></textarea>
        <button type="submit">Submit</button>
      </form>
      <div className="response-area">{response}</div>
    </div>
  );
}

export default App;

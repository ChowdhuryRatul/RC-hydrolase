import { useState } from "react"

// test direct commit to main for rule testing

const App = () => {
  const[count, setCount] = useState(0)
  console.log(count)
  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={
      () => {
        setCount(count + 1)
      }  
      }>Increment</button>
    </div>
  )
}

export default App
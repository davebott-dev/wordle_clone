import { useState } from 'react'
import './App.css'

function App() {
  const [grid,setGrid] = useState(Array(30).fill(null));
  const [keyboard, setKeyboard] = useState(Array(28).fill(null));

  return (
    <>
      <nav>
        <div>
          left
        </div>

        <div>
          <div>1</div>
          <div>2</div>
          <div>3</div>
          <div>4</div>
          <div>5</div>
        </div>
      </nav>

      <main>
        <div className = "gridContainer">
          {grid.map((cell,index)=> {
            return (
              <div key = {index} className="cell">{cell}</div>
            )
          })}
        </div>

        <div className="keyboard">

        </div>
      </main>
    </>
  )
}

export default App

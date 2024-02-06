import { useState } from 'react'
import './App.css'

function App() {
  const [list, setList] = useState([])
  const [undid, setUndid] = useState([])

  const handleClick = (e) =>{

    const newCircle = {
      clientX: e.clientX,
      clientY: e.clientY
    }
    console.log(newCircle);
    setList((prev) => [...prev, newCircle])
    setUndid([])
  }
  const handleUndo = (e) =>{
    e.stopPropagation()

    if(list.length === 0){
      return
    }
    //pega o último item do array
    const lastItem = list[list.length - 1]
    setUndid((prev) => [...prev, lastItem])
    
    setList((prev) =>{
      const newArray = [...prev].slice(0,-1)
      return newArray
    })
  }
  const handleRemake = (e) =>{
    e.stopPropagation()

    if(undid.length === 0){
      return
    }
    const recoverCircle = undid[undid.length -1]
    setUndid((prev) =>{
      const newArray = [...prev].slice(0,-1)
      return newArray
    })
    setList((prev) => [...prev, recoverCircle])
  }
  //#
  return (
    <div id='page' onClick={handleClick}>
      <button onClick={handleUndo}>Desfazer</button>
      <button onClick={handleRemake}>Refazer</button>
      {
        list.map((item, index) =>(
          <span 
          className='circle'
          style={{left: item.clientX, top: item.clientY}}
          key={item.clientX}
          /> 
        ))
      }
    </div>
  )
}

export default App

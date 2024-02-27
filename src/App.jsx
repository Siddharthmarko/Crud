import React, { useRef, useState } from 'react'
// edit add, delete, list show, 
let dummy = [
  {
    id: 1,
    task: 'task 1',
  },
  {
    id: 2,
    task: 'task 2',
  },
  {
    id: 3,
    task: 'task 3',
  },
  {
    id: 4,
    task: 'task 4',
  }
]
function App() {
  const [Inp, setInp] = useState('');
  const [data, setData] = useState(dummy);
  const [show, setShow] =  useState(false);
  const [editable, setEditable] = useState(false)
  const [id, setId] = useState('');
  const inputRef = useRef('');

  // Adding/Edit new entry
  const addData = (e) => {
    e.preventDefault();
    if(Inp === '') {
      alert('require text');
      return
    }
    if(editable) {
      let newData = data.map((item) => {
          if (item.id === id){
            return {...item, task: Inp}
          }
          return item;
        });
        setData(newData);
    } else {
      let uniqueId = new Date().getMilliseconds();
      setData([...data, { id: uniqueId, task: Inp}])
    }
    setInp('');
    setEditable(false);
    inputRef.current.focus();
  }

  // Delete Entry
  const deleteData = (id) => {
    let filterData = data.filter((item) => item.id !== id);
    setData(filterData);
  }

  // Edit Entry
  const edit = (change) => {
    setId(change.id);
    setInp(change.task)
    setEditable(true);
    inputRef.current.focus();

  }

  return (
    <>
      <div className='main' >
        <div className='mainForm' >
            <div>
              <button onClick={() => setShow(!show)} >show List</button>
            </div>
          <form>
            <div>
               <input 
                    ref={inputRef}
                    type="text" 
                    onChange={(e) => setInp(e.target.value)}   
                    value={Inp} 
                 />
              </div>
           <button type='submit' onClick={addData} > Add</button>
          </form>
        </div>
        <div className='mainList' hidden={show} >
              {data.map((item) => {
                return <div key={item.id}  className={`${editable && (id === item.id) ? 'opc' : ''}`}   >
                  <p>{item.task}</p>
                  <div>
                    <button disabled={id === item.id} onClick={() => deleteData(item.id)} >Delete</button>
                      {
                        (id !== item.id) 
                        ? <button onClick={() => edit(item)} >Edit</button>
                        : <button onClick={() => { setId(''); setInp('');}} >Cancel</button>
                      }
                      
                      
                  </div>
                </div>
              })}
        </div>
      </div>
    </>
  )
}

export default App;
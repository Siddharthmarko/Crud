import React, { useState } from 'react'
// edit add, delete, list show, 
const todolist= []
function App() {
  const [todo, setTodo] = useState(todolist);
  const [text, setText] = useState();
  const [show, setshow] = useState(false)
  const [editable, seteditable] = useState(false)
  const [editTask, setEditTask] = useState({})

  function add (){
    if(text === '') return;
    let d = new Date().getMilliseconds();
    console.log(d)
    let newTask = {
      id: d,
      task: text,
    }
    setTodo([...todo,newTask ])
    setshow(true);
    setText('')
    
  }
  function deleteTask (id){
      let del = todo.filter((item) => item.id !== id)
      setTodo([...del])
  }
  
  function editthis(editid){
    seteditable(true);
    let txt = '';
      let deleted =  todo.filter((item) => {
         if(item.id === editid ){
           txt = item.task;
           return false;
         }
         return true
       })
       setTodo([...deleted])
        // console.log(d)
    setEditTask({id: editid, task: txt})
    // console.log(editTask)
  }
  function edit (){
    let d = {
      id: editTask.id,
      task: editTask.task,
    };
    // console.log(d)
    setTodo([...todo, d])
    // console.log(todo)
    // setEditTask('');
    seteditable(false)
  }
  return (
    <>
    <div className='body' >
      
    <div className='button'>
      <button onClick={() => setshow(!show)}>list show</button>
      {editable
        ? <button onClick={() => edit()}>edit</button>
         :<button onClick={() => add()}>add</button>
       }
      
    </div>
    <div className='input'>
      
      {editable 
      ? <input type='text' required value={editTask.task} onChange={(e) => setEditTask({...editTask, task: e.target.value})}/> 
      : <input type='text' required value={text} onChange={(e) => setText(e.target.value)}/>}
    </div>
    <div className='list'>
      { show ? todo.map((item) =>
      <div className='lists   '>
        <p>{item.task}</p> 
        <button onClick={() => deleteTask(item.id)}>delete</button>
        <button onClick={() => editthis(item.id)}>edit</button>
        </div>
      
      ): ''}
    </div>
    </div>
    </>
  );
}

export default App;
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import TableHome from './Components/Table/Table';
import Form from './Components/Form/Form';
import { useState } from 'react';
import {Button} from 'react-bootstrap'
import { IoIosAddCircleOutline } from "react-icons/io";
function App() {
  const [open, setOpen]=useState(false);
  return (
    <div className="App">
      <div className='create-btn'>
      <Button variant="info" onClick={()=>setOpen(true)}>Create  <IoIosAddCircleOutline /></Button>
      </div>
      <div className='components'>
      <TableHome />
      {open && <Form closeForm={(e)=>{setOpen(false)}}/>}
      </div>
      
    </div>
  );
}

export default App;

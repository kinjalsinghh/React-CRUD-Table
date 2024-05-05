import {Table} from 'react-bootstrap'
import './Table.css'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BsFillTrashFill,BsFillPencilFill } from 'react-icons/bs';
function TableHome(){
  const [data,setData]=useState([]);
  const [editId, setEditId]=useState(-1);
  const [uname,setUname]=useState("");
  const [uemail,setUemail]=useState("");
  const [umob,setUmob]=useState("")
  useEffect(()=>{
    axios.get('http://localhost:3000/users')
    .then(res=>setData(res.data))
    .catch(err=>console.log(err))
  },[])
  const handleEdit=(id)=>{
    setEditId(id);
    axios.get('http://localhost:3000/users/'+id)
    .then(res=>{
      setUname(res.data.name)
      setUemail(res.data.email)
      setUmob(res.data.contact)
    })
    .catch(err=>console.log(err))
  }
  const handleUpdate=()=>{
    axios.put('http://localhost:3000/users/'+editId,{id:editId,name:uname,email:uemail,contact:umob})
    .then(res=>{
      console.log(res)
      setEditId(-1)
      window.location.reload()
    }).catch(er=>console.log(er))
  }
  const handleDelete=(id)=>{
    axios.delete(`http://localhost:3000/users/${id}`)
    .then(res=>{
      window.location.reload();
    })
    .catch(err=>{
      console.log(err);
    })
  }
    return(
  <div className="container">
    <Table striped bordered hover className='table'>
      <thead>
        <tr>
          <th ></th>
          <th>ID</th>
          <th className='expand-1' >Name</th>
          <th className='expand-2'>Email</th>
          <th className='expand-3'>Mobile</th>
          <th className='expand-4'>Actions</th>
        </tr>
      </thead>
      <tbody>
        {
          data.map((user,i)=>(
            user.id===editId?
            <tr>
              <td><input type="checkbox"/></td>
              <td>{user.id}</td>
              <td><input type="text" value={uname} onChange={(e)=>setUname(e.target.value)}/></td>
              <td><input type="text" value={uemail} onChange={(e)=>setUemail(e.target.value)}/></td>
              <td><input type="text" value={umob} onChange={(e)=>setUmob(e.target.value)}/></td>
              <td><button className='update' onClick={handleUpdate}>Update</button></td>
            </tr>
            :
            <tr key={i}>
              <td><input type="checkbox"/></td>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.contact}</td>
              <td><BsFillPencilFill onClick={()=>handleEdit(user.id)}className='edit-btn'/> 
              <BsFillTrashFill onClick={()=>handleDelete(user.id)} className='trash-btn'/></td>
            </tr>
          ))
        }
      </tbody>
    </Table>
        </div>
    )
}
export default TableHome;
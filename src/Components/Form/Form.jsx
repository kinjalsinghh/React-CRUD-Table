import { useState } from 'react';
import './Form.css'
import { Button } from 'react-bootstrap';
import axios from 'axios';
function Form({closeForm}){
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [id, setId]=useState(0);
    const [numb,setNumb]=useState("")
    const handleSubmit=(e)=>{
        e.preventDefault();
        axios.post('http://localhost:3000/users',{
            id:id,
            name:name,
            email:email,
            contact:numb
        }).then(res=>{
            window.location.reload()}
        )
        .catch(err=>console.log(err))
    }
    return(
        <div className="form-container" onClick={(e)=>{
            if(e.target.className==="form-container"){
                closeForm();
            }
        }}>
           <div className="form">
              <form onSubmit={handleSubmit}>
                <input type="number" placeholder='Enter ID' onChange={(e)=>setId(e.target.value)}/>
                <input type="text" placeholder='Enter Name' onChange={(e)=>setName(e.target.value)}/>
                <input type="text" placeholder='Enter email'onChange={(e)=>setEmail(e.target.value)}/>
                <input type="text" placeholder='Enter contact' onChange={(e)=>setNumb(e.target.value)}/>
                <Button type="submit" onClick={handleSubmit}>Submit</Button>
                </form>
            </div> 
        </div>
    )
}
export default Form;
import { useEffect, useState } from "react";
import './AddEmployee.css';

import Card from "./Card";

function AddEmployee()
{
    const [list,setList] = useState([]);
    const [name,setName] = useState('');
    const [role,setRole] = useState('');
    const [department,setDepartment] = useState('');
    const [id,setId] = useState('');
    const [width,setWidth] = useState('0px');
    const [buttonName,setButtonName] = useState('Add Employee');

    useEffect(()=>{
        console.log(list);
    },[list]);

    function changeId(event)
    {
        let value = event.target.value;
        setId(value);
    }

    function changeName(event)
    {
        let value = event.target.value;
        setName(value);
    }

    function changeDeparment(event)
    {
        let value = event.target.value;
        setDepartment(value);
    }

    function changeRole(event)
    {
        let value = event.target.value;
        setRole(value);
    }

    function addEmployee()
    {
        setList(prev => [...prev,{id: id, name: name, role: role, department: department}]);

        // once employee is added all input fields shoule be empty
        setName('');
        setId('');
        setDepartment('');
        setRole('');
    }

    function showAddEmployee()
    {
        if(width === "350px") 
        {
            setWidth("0px");
            setButtonName("Add Employee");
        }
        else
        {
            setWidth("350px");
            setButtonName("Cancel");
        }

    }

    function deleteEmployee(id)
    {
        if(window.confirm("Are you sure you want to delete"))
        {
            setList(list.filter(emp=>{
                return emp.id !== id;
            }))
        }
    }


    return(
        <>
            <div className="head">
                <p>Employee Manager</p>
                <div>
                    <input type="text"/>
                    <button className="filter-button">Filter</button>
                    <button className="remove-filter-button">x</button>
                </div>
            </div>
            <div className="add-employee-dailog" style={{width:width}}>
                <label htmlFor="id">Employee Id</label>
                <input type="text" id="id" placeholder="ex 101" value={id} onChange={changeId}/>

                <label htmlFor="name">Name</label>
                <input type="text" id="name" placeholder="ex John Snow" value={name} onChange={changeName}/>

                <label htmlFor="role">Role</label>
                <input type="text" id="role" placeholder="ex Web designer" value={role} onChange={changeRole}/>

                <label htmlFor="department">Department</label>
                <input type="text" id="department" placeholder="ex Finanace" value={department} onChange={changeDeparment}/>

                <button onClick={addEmployee}>Add</button>
            </div>

            <div style ={{display: "flex", flexWrap: "wrap"}}>
                {list.map(emp => {
                    return <Card key={emp.id} id = {emp.id} name={emp.name} role={emp.role} department={emp.department} deleteFun={deleteEmployee}/>
                })}
            </div>
            <button id="add-button" onClick={showAddEmployee}>{buttonName}</button>
        </>
        
    );
}

export default AddEmployee;